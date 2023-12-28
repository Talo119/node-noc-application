import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('log.entity.ts', () => { 
    test('should create a LogEntity instance', () => { 

        const dataObj = {
            origin:'log.datasource.test.ts',
            message:'test-message',
            level: LogSeverityLevel.high,
            createdAt: new Date(),
        };

        const lgoEntity = new LogEntity(dataObj);

        expect(lgoEntity).toBeInstanceOf( LogEntity );
        expect(lgoEntity.message).toBe( dataObj.message );
        expect(lgoEntity.level).toBe( dataObj.level );
        expect(lgoEntity.origin).toBe( dataObj.origin );
        expect(lgoEntity.createdAt).toBe( dataObj.createdAt );
     });
 });