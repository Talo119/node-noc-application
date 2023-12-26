import { CronJob } from "cron"
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/checks/email/send-email-logs";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)
const emailService = new EmailService();

export class Server {
    /**
     * start
     */
    public static  start() {
        console.log('Server started...');

        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute([
            'carlos.motino911@gmail.com'
        ]);

        //CronService.createJob(
        //    '*/5 * * * * *',
        //    () => {
        //        new CheckService(
        //            fileSystemLogRepository,
        //            () => console.log('success'),
        //            ( error ) => console.log(error),
        //        ).execute('http://localhost:3000')
        //        //new CheckService().execute('http://localhost:3000')  https://google.com
        //    }
        //);
    }
}