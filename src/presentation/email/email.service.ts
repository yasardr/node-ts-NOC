import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

export interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        host: envs.MAILER_HOST,
        port: envs.MAILER_PORT,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        },
    });

    constructor() {}

    async sendEmail(options: SendMailOptions):Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            });
            
            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs de sitema - NOC</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam felis nibh, luctus id finibus eget, laoreet vel odio. Suspendisse iaculis nunc eget elit ullamcorper suscipit. Nullam dictum sem et auctor venenatis. Morbi tincidunt ante ac est ornare semper. Sed cursus ut odio ac dictum. Duis sit amet ornare quam, faucibus ultrices quam. Donec ut metus at risus fringilla fermentum quis vel justo. Donec volutpat justo massa, a volutpat urna cursus ut.</p>
            <p>Ver logs adjuntos</p>
        `
        const attachments:Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
        ]

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    }
    
}