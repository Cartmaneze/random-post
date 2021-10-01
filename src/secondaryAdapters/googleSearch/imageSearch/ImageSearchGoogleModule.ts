import { Module } from '@nestjs/common';
import { ImageSearchUrlApiType } from '../../../core/components/imageSearch/port/ImageSearchUrlApi';
import { ImageSearchGoogleAdapter } from './api/ImageSearchGoogleAdapter';

@Module({
    providers: [
        {
            provide: ImageSearchUrlApiType,
            useClass: ImageSearchGoogleAdapter,
        },
    ],
    exports: [
        ImageSearchUrlApiType,
    ],
})
export class ImageSearchGoogleModule { }
