import mongoose from "mongoose";
import { MongoDatabase } from "./init";


describe('init Mongo db', () => {

    afterAll(() =>{
        mongoose.connection.close();
    });

    test('should connect to MongoDb', async() => { 
        
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        });

        expect( connected).toBe(true);

     });
    
     test('should throw an error', async() => { 
        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: process.env.MONGO_URL!,
            });
    
            expect( connected).toBe(false);
            
        } catch (error) {
            
        }

     });
 });