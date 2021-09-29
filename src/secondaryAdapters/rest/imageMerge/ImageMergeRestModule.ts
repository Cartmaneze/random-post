import { Module } from '@nestjs/common';
import { ImageBufferByUrlApiType } from '../../../core/components/imageMerge/port/ImageBufferByUrlApi';
import { ImageMergeRestAdapter } from './api/ImageMergeRestAdapter';

@Module({
    providers: [
        {
            provide: ImageBufferByUrlApiType,
            useClass: ImageMergeRestAdapter,
        },
    ],
    exports: [
        ImageBufferByUrlApiType,
    ],
})
export class ImageMergeRestModule { }
