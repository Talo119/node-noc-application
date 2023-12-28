import { CronJob } from "cron"
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/checks/email/send-email-logs";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";


/* const logRepository = new LogRepositoryImpl(
    //new FileSystemDataSource()
    //new MongoLogDatasource()
    new PostgresLogDatasource()
) */
const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const postgreLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);
const emailService = new EmailService();

export class Server {
    /**
     * start
     */
    public static  start() {
        console.log('Server started...');

        /* new SendEmailLogs(
            emailService,
            logRepository
        ).execute([
            'carlos.motino911@gmail.com'
        ]); */

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckServiceMultiple(
                    [fsLogRepository,mongoLogRepository,postgreLogRepository],
                    () => console.log('success'),
                    ( error ) => console.log(error),
                ).execute('https://google.com')
                //new CheckService().execute('http://localhost:3000')  https://google.com
            }
        );
    }
}