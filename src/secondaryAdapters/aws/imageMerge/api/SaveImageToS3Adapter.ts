import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { SaveImageToS3Api } from '../../../../core/components/imageMerge/port/SaveImageToS3Api';
import { Readable } from 'stream';

@Injectable()
export class SaveImageToS3Adapter implements SaveImageToS3Api {

    public async saveToS3(buffer: Buffer): Promise<void> {
        const readableInstanceStream = this.createReadableStream(buffer);
        const uploadParams = { Bucket: 'random-post-bucket', Key: Date.now().toString(), Body: readableInstanceStream };
        await this.upload(uploadParams);
    }

    private createReadableStream(buffer: Buffer) {
        return new Readable({
            read() {
                this.push(buffer);
                this.push(null);
            },
        });
    }

    private upload(uploadParams) {
        const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        return new Promise((resolve, reject) => {
            s3.upload(uploadParams, (err, data) => {
                if (err) {
                    reject(new InternalServerErrorException(err));
                } if (data) {
                    resolve(true);
                }
            });
        });
    }

}
