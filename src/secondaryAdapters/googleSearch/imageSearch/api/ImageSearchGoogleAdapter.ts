import { Injectable } from '@nestjs/common';
import * as ImageSearch from 'image-search-google';
import config from '../../../../configuration/config/Config';
import { ImageSearchUrlApi } from '../../../../core/components/imageSearch/port/ImageSearchUrlApi';
import { GoogleImageObject } from '../data/GoogleImageObject';

@Injectable()
export class ImageSearchGoogleAdapter implements ImageSearchUrlApi {
    private imageSearch;

    public async searchUrls(theme: string): Promise<string[]> {
        const client: ImageSearch = this.getImageSearchClient();
        const randomPage: number = Math.floor(Math.random() * 10) + 1;
        const options = { page: randomPage, size: 'large' };
        const images: GoogleImageObject[] = await client.search(theme, options);
        return images.map(image => image.url);
    }

    private getImageSearchClient(): ImageSearch {
        if (!this.imageSearch) {
            this.imageSearch = new ImageSearch(config.googleSearch.cseId, config.googleSearch.apiKey);
        }
        return this.imageSearch;
    }

}
