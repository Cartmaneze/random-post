import { Injectable } from '@nestjs/common';
import got from 'got';
import { ImageBufferByUrlApi } from '../../../../core/components/imageMerge/port/ImageBufferByUrlApi';

@Injectable()
export class ImageMergeRestAdapter implements ImageBufferByUrlApi {

    public async getBufferByUrl(url: string): Promise<Buffer> {
        const imageBuffer: Buffer = await got(url, { responseType: 'buffer', resolveBodyOnly: true });
        return imageBuffer;
    }

}
