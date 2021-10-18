import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initializeTransactionalContext, patchTypeORMRepositoryWithBaseRepository } from 'typeorm-transactional-cls-hooked';

import { initDocs, setupApi, setupSentry } from './AppInitializer';
import { AppModule } from './AppModule';
import { BasicGuard } from './configuration/BasicGuard';
import config from './configuration/config/Config';
import { AllExceptionsFilter } from './configuration/HttpExceptionFilter';
import { startServerMonitoring } from './configuration/monitoring/appmetrics';

async function bootstrap() {
    startServerMonitoring();
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.set('trust proxy', true);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalGuards(new BasicGuard());
    app.enableShutdownHooks();
    setupSentry(app);
    setupApi(app);
    initDocs(app);
    await app.listen(8080, config.host);
}
// tslint:disable-next-line:no-floating-promises
bootstrap();
