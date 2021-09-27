import { Module } from '@nestjs/common';
import { ImageSearchGoogleModule } from '../../../secondaryAdapters/imageSearchGoogle/image/ImageSearchGoogleModule';
import { ImageService } from './application/services/ImageService';

@Module({
    imports: [
        ImageSearchGoogleModule,
    ],
    providers: [
        ImageService,
    ],
    exports: [
        ImageService,
    ],
})
export class ImageModule { }
