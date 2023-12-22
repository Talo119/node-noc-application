import { CronJob } from "cron"
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)

export class Server {
    /**
     * start
     */
    public static  start() {
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log('success'),
                    ( error ) => console.log(error),
                ).execute('http://localhost:3000')
                //new CheckService().execute('http://localhost:3000')  https://google.com
            }
        );
    }
}