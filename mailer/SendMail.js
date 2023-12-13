import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()
const sendMail = async (to, url, body) => {
	try {

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL,
				pass: process.env.PASSWORD
			}
		})
		const mailOptions = {
			from: `"Shrimp Talker 👨‍💻 <${process.env.MAIL}>`,
			to,
			subject: 'Do Not Reply - Email Verification ✔️',
			html: `<h1>Welcome to the MPEDA's Shrimp Talker</h1>
                    <p>Hi there,</p>
                    <p>${body}</p>
                    <button><a href="${url}">Click Here!</a></button>
                    <p><a href="${url}">${url}</a></p>
                    <p>Thank you,</p>
                    <p>MPEDA</p>`
		}
		const info = await transporter.sendMail(mailOptions)
		return info
	} catch (error) {
		console.log(error)
	}
}

export default sendMail