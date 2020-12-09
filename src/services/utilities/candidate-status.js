const axios = require('axios');
const moment = require('moment');

moment.locale('id');

module.exports = function(app) {
    app.use('/cad/:id', async (req, res) => {
        try {
            const cadResponse = await app.service('students').find({
                query: {
                    id: req.params.id,
                    $eager: '[account, stillWaiting]',
                    $select: ['full_name', 'phone_number']
                }
            })

            const candidate = cadResponse.data[0]
            const schedule_id = parseInt(candidate.stillWaiting.schedule_id)

            const schedule = await app.service('available-time').get(schedule_id)
            const referral = await axios.get(`https://is.gd/create.php?format=json&url=${req.get('Origin')}/cad-sg?rc=${candidate.account.referral_code}`)

            let class_type
            switch (schedule.class_type) {
                case 2:
                    class_type = 'Individu (private)'
                    break;
                case 3:
                    class_type = 'Keluarga (private)'
                    break;
                case 4:
                    class_type = 'Anak - anak (private)'
                    break;
                default:
                    class_type = 'Klasikal'
                    break;
            }

            let implementation = Object.is(schedule.implementation, 1) ? 'Offline' : 'Online'

            let reg_status_desc, reg_status
            if (schedule.total_candidate < 0 && Object.is(schedule.class_type, 1)) {
                reg_status_desc = `Minimal ${5 - schedule.total_candidate} orang lagi<br>Kelas akan dimulai`
                reg_status = "WL"
            } else if (
                (schedule.total_candidate >= 1 && Object.is(schedule.class_type, 1)) ||
                (Object.is(schedule.class_type, 2) || Object.is(schedule.class_type, 3))
            ) {
                reg_status_desc = `Kami akan segera menghubungi Anda.<br>Paling lambat selama 3 hari setelah<br>${moment(schedule.updatedAt).format('LL')}`
                reg_status = "SOON"
            }

            let registration = {
                class_type: class_type,
                implementation: implementation,
                status_desc: reg_status_desc,
                status: reg_status
            }

            const payload = {
                full_name: candidate.full_name,
                phone_number: candidate.phone_number,
                email: candidate.account.email,
                referral_url: referral.data.shorturl,
                selected_schedule: schedule.schedules,
                registration: registration
            }

            res.json(payload)
        } catch (error) {
            res.json(error)
        }
    })
}