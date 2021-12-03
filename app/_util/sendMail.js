const nodemailer = require('nodemailer');

const Mail = function (user) {
    this.mailTo = user.email;
    this.subject = user.subject;
    this.message = user.message;
};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'techspaceke@gmail.com',
        pass: 'c3l12i9f6f6'
    }
});

const mailOptions = {
    from: 'techspaceke@gmail.com',
    to: 'arnoldcliff98@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

Mail.sendMail = result => {
    new Mail();
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res)
        }


    });
    // Attendance.getAll((err, data) => {
    //     if (err)
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving attendance."
    //         });
    //     else res.send(data);
    // });
};

module.exports = Mail;
