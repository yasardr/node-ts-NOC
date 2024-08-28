import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDatasource } from './log.datasource';

describe('log.datasource.ts LogDatasource', () => { 
    const newLog = new LogEntity({
        origin: 'log.datasource.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low
    });

    class MockLogDatasource implements LogDatasource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
    
    }

    test('should test the abstract class', async () => { 
        const mockLogDatasoure = new MockLogDatasource();

        expect(mockLogDatasoure).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDatasoure.saveLog).toBe('function');
        expect(typeof mockLogDatasoure.getLogs).toBe('function');

        await mockLogDatasoure.saveLog(newLog);
        const logs = await mockLogDatasoure.getLogs(LogSeverityLevel.high);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });
});