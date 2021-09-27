import { Injectable } from '@nestjs/common';
import * as ImageSearch from 'image-search-google';
import { ImageUrlApi } from '../../../../core/components/image/port/ImageUrlApi';
import { GoogleImageObject } from '../data/GoogleImageObject';

@Injectable()
export class ImageSearchGoogleAdapter implements ImageUrlApi {

    public async searchUrls(theme: string): Promise<string[]> {
        const client: ImageSearch = new ImageSearch('4469721c15cc4687f', 'AIzaSyAKwjXsgN1LUw_PvDDMvWn7clwhE6Drpys');
        const randomPage: number = Math.floor(Math.random() * 10) + 1;
        const options = { page: randomPage, size: 'large' };
        const images: GoogleImageObject[] = await client.search(theme, options);
        const urls = images.map(image => image.url);
        return urls;
    }

}
