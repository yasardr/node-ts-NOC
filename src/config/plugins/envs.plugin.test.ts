import { envs } from './envs.plugin';

describe('envs.plugin.ts', () => { 
    test('should return env options', () => { 
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_HOST: 'sandbox.smtp.mailtrap.io',
            MAILER_PORT: 25,
            MAILER_EMAIL: '08e4436858743e',
            MAILER_SECRET_KEY: '2d2a2d860e36dc',
            PROD: false,
            MONGO_URL: 'mongodb://yasar:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'yasar',
            MONGO_PASS: '123456789',
            POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5432/NOC',
            POSTGRES_USER: 'postgres',
            POSTGRES_DB: 'NOC-TEST',
            POSTGRES_PASSWORD: '123456789'
        });
    });

    test('should return error if not found env', async () => { 
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });
});