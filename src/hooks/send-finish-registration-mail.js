const nodemailer = require('nodemailer');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const candidate = await context.app.service('students').find({
      query: {
        id: context.data.candidate_id,
        $eager: 'account'
      }
    })

    const { host, port, auth } = context.app.get('mail');

    let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        auth: {
            user: auth.user,
            pass: auth.pass
        }
    })

    let mailOptions = {
        from: {
          name: 'Pendaftaran DIROSA',
          address: 'no-reply@rqw.jakarta.com'
        },
        to: candidate.data[0].account.email,
        subject: 'Kiriman dari Nodemailer',
        text: 'Mencoba coba!'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log('Pesan gagal dikirim D:', error)
        else
          console.log('Pesan berhasil dikirimkan!')
    })

    return context;
  };
};
