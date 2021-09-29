import { Module } from '@nestjs/common';
import { ImageSearchGoogleModule } from '../../../secondaryAdapters/imageSearchGoogle/imageSearch/ImageSearchGoogleModule';
import { ImageSearchService } from './application/services/imageSearchService';

@Module({
    imports: [
        ImageSearchGoogleModule,
    ],
    providers: [
        ImageSearchService,
    ],
    exports: [
        ImageSearchService,
    ],
})
export class ImageSearchModule { }
