import { Module } from '@nestjs/common';
import { ImageMergeRestModule } from '../../../secondaryAdapters/rest/imageMerge/ImageMergeRestModule';
import { ImageMergeService } from './application/services/imageMergeService';

@Module({
    imports: [
        ImageMergeRestModule,
    ],
    providers: [
        ImageMergeService,
    ],
    exports: [
        ImageMergeService,
    ],
})
export class ImageMergeModule { }
