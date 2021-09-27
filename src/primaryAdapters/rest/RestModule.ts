import { Module } from '@nestjs/common';
import { ImageModule } from '../../core/components/image/ImageModule';
import { WelcomeModule } from '../../core/components/welcome/WelcomeModule';
import { HealthCheckController } from './health/HealthCheckController';
import { ImageController } from './image/ImageController';
import { WelcomeController } from './welcome/WelcomeController';

@Module({
    imports: [
      WelcomeModule, ImageModule,
    ],
    controllers: [
        HealthCheckController,
        WelcomeController,
        ImageController,
    ],
})
export class RestModule { }
