import { envs } from "./envs.plugin";

describe('./envs.plugin', () => { 
    test('should return env options', () => { 
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'cmotino.dev@gmail.com',
            MAILER_SECRET_KEY: 'qbeyetqhvifvpwcz',
            PROD: true,
            MONGO_URL: 'mongodb://cmotino:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'cmotino',
            MONGO_PASS: '123456789',
            POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5432/NOC-TEST',
            POSTGRES_DB: 'NOC-TEST',
            POSTGRES_USER: 'postgres',
            POSTGRES_PASS: '123456789'
          });
     });

     test('should return error if not found env', async() => { 
        jest.resetModules();
        process.env.PORT = 'ABC';
        try {
            await import('./envs.plugin');
            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
            console.log(error)
        }

      });
 });