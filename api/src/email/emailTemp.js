import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { logger } from '../utilis/logger.js';

dotenv.config();

let company = { name: 'Luwi' };

const companyName = process.env.SYSTEM_COMPANY_NAME;

if (companyName) {
    company = { name: companyName };
};

const time = new Date()

export const registrationTemplate = (name) => {
    const template = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Successful</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                }
                .container {
                width: 97%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                h1 {
                color: #333333;
                }
                p {
                color: #555555;
                }
                .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #999999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to Our Service!</h1>
                <p>Dear ${name},</p>
                <p>Thank you for registering with us. Your account has been successfully created at ${time}.</p>
                <p>You can now log in and start using our services.</p>
                <p>If you have any questions, feel free to reply to this email.</p>
                <p>Best regards,</p>
                <p>The ${company.name} Team</p>
                <div class="footer">
                    <p>&copy; 2024 ${company.name}. All rights reserved.</p>
                </div>
            </div>
        </body>
    </html>
    `
    return template;
};

export const loginTemplate = (name) => {
    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login Notification</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            }
            .container {
            width: 97%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
            color: #333333;
            }
            p {
            color: #555555;
            }
            .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999999;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Login Notification</h1>
            <p>Dear ${name},</p>
            <p>We noticed a new login to your account from a different device or location at ${time}.</p>
            <p>If this was you, you can safely disregard this email. If you suspect any unusual activity, please change your password immediately.</p>
            <p>Best regards,</p>
            <p>The ${company.name} Team</p>
            <div class="footer">
                <p>&copy; 2024 ${company.name}. All rights reserved.</p>
            </div>
        </div>
        </body>
        </html>
    `
    return template;
};

export const updateTemplate = (name) => {
    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Details Updated</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            }
            .container {
            width: 97%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
            color: #333333;
            }
            p {
            color: #555555;
            }
            .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999999;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Details Updated Successfully</h1>
            <p>Dear ${name},</p>
            <p>Your account details have been successfully updated at ${time}.</p>
            <p>If you did not make this change, please contact our support team immediately.</p>
            <p>Best regards,</p>
            <p>The ${company.name} Team</p>
            <div class="footer">
            <p>&copy; 2024 ${company.name}. All rights reserved.</p>
            </div>
        </div>
        </body>
        </html>
    `
    return template;
};

export const deleteTemplate = (name) => {
    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Deletion</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            }
            .container {
            width: 97%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
            color: #333333;
            }
            p {
            color: #555555;
            }
            .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999999;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Account Deletion Confirmation</h1>
            <p>Dear ${name},</p>
            <p>We are sorry to see you go. Your account has been successfully deleted at ${time}.</p>
            <p>If you change your mind, you can always create a new account with us.</p>
            <p>Best regards,</p>
            <p>The ${company.name} Team</p>
            <div class="footer">
            <p>&copy; 2024 ${company.name}. All rights reserved.</p>
            </div>
        </div>
        </body>
        </html>
    `
    return template;
};

export const otpTemplate = (params) => {

    const template = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 97%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header h1 {
                margin: 0;
                color: #333333;
            }
            .content {
                text-align: center;
                font-size: 18px;
                color: #555555;
            }
            .otp {
                display: inline-block;
                font-size: 24px;
                font-weight: bold;
                margin: 20px 0;
                padding: 10px 20px;
                border-radius: 4px;
                background-color: #f7f7f7;
                border: 1px solid #cccccc;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                font-size: 14px;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Your OTP Code</h1>
            </div>
            <div class="content">
                <p>Thank you for choosing our services. To complete your reset password, please use the OTP code provided below:</p>
                <div class="otp">${params.otpCode}</div>
                <p>This OTP is valid for the next [duration] minutes. Please do not share this code with anyone, as it is intended to keep your account secure.</p>
            </div>
            <div class="footer">
                <p>If you did not request this OTP or have any concerns, please contact our support team.</p>
                <p>Thank you for your attention.</p>
                <p>Best regards.</p>
            </div>
        </div>
    </body>
    </html>

    `
    return template;
};

export const sendMail = async (params) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email,
            pass: process.env.Password,
        },
    });

    const temp = () => {
        switch (params.option) {
            case 'register':
                return registrationTemplate(params.data);
            case 'login':
                return loginTemplate(params.data);
            case 'update':
                return updateTemplate(params.data);
            case 'delete':
                return deleteTemplate(params.data);
            case 'otp':
                return otpTemplate(params);
            default:
                return;
        };
    };

    const subject = () => {
        switch (params.option) {
            case 'register':
                return 'Account registration';
            case 'login':
                return 'Login success';
            case 'update':
                return 'Update successful';
            case 'delete':
                return 'Delete successful';
            case 'otp':
                return 'OTP code request successful';
            default:
                return 'Email System Notification';
        };
    };

    const mailOptions = {
        from: process.env.Email,
        to: params.Email_address,
        subject: subject(),
        html: temp(),
    };
    
    try {
        logger.info("Sending email...");
        let info = await transporter.sendMail(mailOptions);
        return { info };
    } catch (error) {
        
        return { error };
    };
};