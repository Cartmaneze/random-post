import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { setupApi } from '../../../src/AppInitializer';

export async function initApp(moduleFixture: TestingModule): Promise<INestApplication> {
    const app = moduleFixture.createNestApplication();
    setupApi(app);
    await app.init();
    return app;
}
