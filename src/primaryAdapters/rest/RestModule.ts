import { Module } from '@nestjs/common';
import { ImageMergeModule } from '../../core/components/imageMerge/ImageMergeModule';
import { ImageSearchModule } from '../../core/components/imageSearch/ImageSearchModule';
// import { WelcomeModule } from '../../core/components/welcome/WelcomeModule';
import { HealthCheckController } from './health/HealthCheckController';
import { ImageController } from './image/ImageController';
// import { WelcomeController } from './welcome/WelcomeController';

@Module({
    imports: [
     //   WelcomeModule,
        ImageSearchModule, ImageMergeModule,
    ],
    controllers: [
        HealthCheckController,
      //  WelcomeController,
        ImageController,
    ],
})
export class RestModule { }
