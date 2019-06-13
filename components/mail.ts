import nodemailer  from 'nodemailer'
import smtpTransport = require('nodemailer/lib/smtp-transport');

export default class Mail {
    private user: any
    private pass: any
    private _from: any

    public constructor(username:any = '', password:any = '', from:any = ''){
        this.user = username
        this.pass = password
        this._from = from
    }

    public username(v : any) {
        this.user = v;
        return this;
    }

    public password(v : any) {
        this.pass = v;
        return this;
    }

    public from (v : any) {
        this._from = v;
        return this;
    }
    
    public send(to:string, subject: string, text:string) {
        return new Promise((resolve, reject) => {
            nodemailer.createTestAccount((err:any, account:any) => {
                // let transporter = nodemailer.createTransport({
                //     host: 'smtp.gmail.com',
                //     port:465,
                //     secure: true, 
                //     auth: {
                //         user: this._username, 
                //         pass: this._password 
                //     }
                // });
                var transporter = nodemailer.createTransport(new smtpTransport({
                        host: 'localhost',
                        port: 25,
                        // auth: {
                        //     user: this.user,
                        //     pass: this.pass
                        // },
                        tls: {
                            rejectUnauthorized: false
                        }
                    }));
    
                let mailOptions = {
                    to,
                    from: this._from,
                    subject,
                    html: text,
                };
    
                transporter.sendMail(mailOptions, (error:any, info:any) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(info)
                });
    
            })
        })
    }
}