import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface Attachement {
    filename: string;
    path: string;
}

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements: Attachement[]
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor() {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachements = [] } = options

        try {
            const sentInformation = await this.transporter.sendMail({
                to:to,
                subject:subject,
                html: htmlBody,
                attachments: attachements,
            });

            console.log(sentInformation);

            const log = new LogEntity({
               level: LogSeverityLevel.low,
               message: 'Email sent',
               origin: 'email.service.ts',
               createdAt: new Date()
            });
            //this.logRepository.saveLog(log)

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts',
                createdAt: new Date()
             });
             //this.logRepository.saveLog(log)
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody=`
        <h3>Logs de Sistema-Noc</h3>
        <p> Aviso de notificacion. </p>
        <p> Ver logs adjuntos.</p>`;


        const attachements: Attachement[] = [
            {filename: 'logs-low.log', path:'./logs/logs-low.log'},
            {filename: 'logs-medium.log', path:'./logs/logs-medium.log'},
            {filename: 'logs-high.log', path:'./logs/logs-high.log'},
        ]

        return this.sendEmail({
            to, subject, attachements, htmlBody
        });

    }
}