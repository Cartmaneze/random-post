import { Module } from '@nestjs/common';
import { ImageUrlApiType } from '../../../core/components/image/port/ImageUrlApi';
import { ImageSearchGoogleAdapter } from './api/ImageSearchGoogleAdapter';

@Module({
    providers: [
        {
            provide: ImageUrlApiType,
            useClass: ImageSearchGoogleAdapter,
        },
    ],
    exports: [
        ImageUrlApiType,
    ],
})
export class ImageSearchGoogleModule { }
