import { SendEmailLogs } from './send-email-logs';
import { LogRepository } from '../../repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';

describe('SendEmailLogs UseCase', () => { 
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }
    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    
    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any, 
        mockLogRepository,
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call sendEmail and saveLog', async () => { 
        const result = await sendEmailLogs.execute('droidhp.ya@gmail.com');

        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));  
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
           "createdAt": expect.any(Date),
           "level": LogSeverityLevel.low,
           "message": "Log email sent",
           "origin": "send-enail-logs.ts",
        });      
    });

    test('should log in case of error', async () => { 
        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);
        
        const result = await sendEmailLogs.execute('droidhp.ya@gmail.com');

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));  
        expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
           "createdAt": expect.any(Date),
           "level": LogSeverityLevel.high,
           "message": "Error: Email log not sent",
           "origin": "send-enail-logs.ts",
        });      
    });
});