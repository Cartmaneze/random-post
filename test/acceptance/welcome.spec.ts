import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { anything, when } from 'ts-mockito';
import { Welcome } from '../../src/core/components/welcome/domain/data/Welcome';
import { initTestModule, mocks, resetMocks } from './AppModuleTest';
import { initApp } from './common/setup';

describe('Welcome message acceptance tests', () => {
    let app: INestApplication;

    const welcomeRepository = mocks.welcome.welcomeRepository;

    const testData = {
        id: 1,
        message: 'Welcome test message!',
    };

    beforeAll(async () => {
        const testModule = await initTestModule();
        app = await initApp(testModule);
    });

    it('should return message', async () => {
        const welcomeCortege = Welcome.fromObject({
            id: testData.id,
            message: testData.message,
        });

        when(welcomeRepository.findById(anything()))
            .thenResolve(welcomeCortege);

        await request(app.getHttpServer())
            .get('/api/welcome')
            .set('Content-Type', 'application/json')
            .query({ id: 1 })
            .expect('Content-Type', /json/)
            .expect(200, {
                message: welcomeCortege.message,
            });
    });

    it('should return not found error 404', async () => {
        when(welcomeRepository.findById(anything()))
            .thenResolve(null);

        await request(app.getHttpServer())
            .get('/api/welcome')
            .set('Content-Type', 'application/json')
            .query({ id: 1 })
            .expect('Content-Type', /json/)
            .expect(404);

    });

    afterEach(() => {
        resetMocks();
    });

    afterAll(async () => {
        await app.close();
    });

});
