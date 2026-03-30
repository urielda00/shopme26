import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Modernized mail sender using async/await
 * @param {string} email - Recipient address
 * @param {string} subject - Mail subject
 * @param {string} text - Mail content
 */
export const sendMail = async (email, subject, text) => {
    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS, // Important: Use an App Password if using Gmail
        },
    });

    // Define options
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text,
    };

    try {
        // Send mail and wait for result
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully: ${info.response}`);
        return { success: true, info };
    } catch (error) {
        console.error('Failed to send email:', error.message);
        // We throw the error so the controller can catch it and return 500
        throw new Error('Email delivery failed');
    }
};