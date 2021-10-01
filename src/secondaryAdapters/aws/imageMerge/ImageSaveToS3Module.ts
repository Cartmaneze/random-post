import { Module } from '@nestjs/common';
import { SaveImageToS3Api, SaveImageToS3ApiType } from '../../../core/components/imageMerge/port/SaveImageToS3Api';
import { SaveImageToS3Adapter } from './api/SaveImageToS3Adapter';

@Module({
    providers: [
        {
            provide: SaveImageToS3ApiType,
            useClass: SaveImageToS3Adapter,
        },
    ],
    exports: [
        SaveImageToS3ApiType,
    ],
})
export class ImageSaveToS3Module { }
