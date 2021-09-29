import { Inject, Injectable } from '@nestjs/common';
import { ImageSearchUrlApi, ImageSearchUrlApiType } from '../../port/ImageSearchUrlApi';

@Injectable()
export class ImageSearchService {
    constructor(
        @Inject(ImageSearchUrlApiType)
        private readonly imageSearcher: ImageSearchUrlApi,
    ) { }

    public async searchUrls(theme: string): Promise<string[]> {
        return this.imageSearcher.searchUrls(theme);
    }
}
