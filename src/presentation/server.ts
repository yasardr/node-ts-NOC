import { CronService } from './cron/cron-service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { EmailService } from './email/email.service';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {

    public static async start() {
        console.log('Server started...');

        //todo: Mandar email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(
        //     ['yaltamiranoa@outlook.com', 'droidhp.ya@gmail.com']
        // );

        // const logs = await logRepository.getLogs(LogSeverityLevel.medium);
        // console.log(logs);        

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com'; // http://localhost:3000/posts
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository, postgresLogRepository],
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)               
        //         ).execute(url);
        //     }
        // );
    }

}