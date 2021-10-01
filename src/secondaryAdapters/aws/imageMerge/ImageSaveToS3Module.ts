import { Module } from '@nestjs/common';
import { FileStorageType } from '../../../core/components/imageMerge/port/FileStorage';
import { SaveImageToS3Adapter } from './api/SaveImageToS3Adapter';

@Module({
    providers: [
        {
            provide: FileStorageType,
            useClass: SaveImageToS3Adapter,
        },
    ],
    exports: [
        FileStorageType,
    ],
})
export class ImageSaveToS3Module { }
