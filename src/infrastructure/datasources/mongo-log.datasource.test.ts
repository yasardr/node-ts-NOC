import mongoose from 'mongoose';
import { LogModel, MongoDatabase } from '../../data/mongo';
import { envs } from '../../config/plugins/envs.plugin';
import { MongoLogDatasource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('Pruebas en MongoLogDatasource', () => { 
    const logDatasSource = new MongoLogDatasource();
    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'test message',
        origin: 'mongo-log.datasource.test.ts'
    });

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });

    afterEach(async() => {
        await LogModel.deleteMany();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test('should create a log', async() => { 
        const logSpy = jest.spyOn(console, 'log');

        await logDatasSource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String));
    });

    test('should get logs', async () => { 
        await logDatasSource.saveLog(log);
        await logDatasSource.saveLog(log);
        const logs = await logDatasSource.getLogs(LogSeverityLevel.medium);

        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    });
});