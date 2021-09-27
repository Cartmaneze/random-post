import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ImageUrlApi, ImageUrlApiType } from '../../port/ImageUrlApi';

@Injectable()
export class ImageService {
    constructor(
        @Inject(ImageUrlApiType)
        private readonly imageSearcher: ImageUrlApi,
    ) { }

    public async searchUrls(theme): Promise<string[]> {
        return this.imageSearcher.searchUrls(theme);
    }

    public async merge(obj): Promise<void> {
        // TODO
    }
}
