

import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import * as env from 'env-var';


( () =>{
    main();
} )();

async function main() {
    
    await MongoDatabase.connect({
        mongoUrl:envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME
    });
    
    /* const newLog = await LogModel.create({
        message: 'Test message form MongoDB',
        origin: 'App.ts',
        level: 'low'
    }); */

    const prisma = new PrismaClient();

    const logs = await prisma.logModel.findMany({
        where:{
            level: 'HIGH'
        }
    });
    console.log({logs});

    /* const newLog = await prisma.logModel.create({
        data: {
            level:'HIGH',
            message:'Test message',
            origin:'app.ts'
        }
    });

    console.log({newLog}); */

    Server.start();
    
    //await newLog.save();

    //const logs = await LogModel.find();

    //console.log(logs);
    /* console.log(envs.PORT);
    console.log(envs.MAILER_EMAIL);
    console.log(envs.MAILER_SECRET_KEY);
    console.log(envs.PROD); */
}