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

            const payload = {
                full_name: candidate.full_name,
                phone_number: candidate.phone_number,
                email: candidate.account.email,
                referral_code: candidate.account.referral_code,
                selected_schedule: schedule.schedules,
                total_candidate: schedule.total_candidate
            }

            res.json(payload)
        } catch (error) {
            res.json(error)
        }
    })
}