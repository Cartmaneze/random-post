import { Module } from '@nestjs/common';
import { WelcomeModule } from '../../core/components/welcome/WelcomeModule';
import { HealthCheckController } from './health/HealthCheckController';
import { WelcomeController } from './welcome/WelcomeController';

@Module({
    imports: [
      WelcomeModule,
    ],
    controllers: [
        HealthCheckController,
        WelcomeController,
    ],
})
export class RestModule { }
