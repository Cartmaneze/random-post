import { Module } from '@nestjs/common';
import { ImageSaveToS3Module } from '../../../secondaryAdapters/aws/imageMerge/ImageSaveToS3Module';
import { ImageMergeRestModule } from '../../../secondaryAdapters/rest/imageMerge/ImageMergeRestModule';
import { ImageMergeService } from './application/services/imageMergeService';

@Module({
    imports: [
        ImageMergeRestModule,
        ImageSaveToS3Module,
    ],
    providers: [
        ImageMergeService,
    ],
    exports: [
        ImageMergeService,
    ],
})
export class ImageMergeModule { }
