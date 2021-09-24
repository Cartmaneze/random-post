import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as ExpressPinoLogger from 'express-pino-logger';

import config from './configuration/config/Config';
import logger from './configuration/Logger';
import { ResultInterceptor } from './configuration/ResultInterceptor';
import Sentry, { isInitSentry } from './configuration/Sentry';

export function setupApi(app: INestApplication) {
    app.setGlobalPrefix('api');
    app.use(ExpressPinoLogger({ logger }));
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new ResultInterceptor());
}

export function initDocs(app: INestApplication) {
    if (config.docs.hasDocs) {
        const docsPath = 'docs';
        const options = new DocumentBuilder()
            .setTitle('Nest js project')
            .setDescription('The API for Nest js project')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, options);
        app.use(`/${docsPath}`, basicAuth({
            users: { [config.docs.user]: config.docs.password },
            challenge: true,
        }));
        SwaggerModule.setup(docsPath, app, document);
    }
}

export function setupSentry(app: NestExpressApplication) {
    if (isInitSentry()) {
        app.use(Sentry.Handlers.requestHandler());
        app.use(Sentry.Handlers.errorHandler());
    }
}
