import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Readable } from 'stream';
import { FileStorage } from '../../../../core/components/imageMerge/port/FileStorage';
import { S3Client } from '../data/S3Client';
import { S3Params } from '../data/S3Params';

@Injectable()
export class SaveImageToS3Adapter implements FileStorage {
    private s3Client: S3Client;

    public async upload(path: string, buffer: Buffer): Promise<string> {
        const readableInstanceStream: Readable = this.createReadableStream(buffer);
        const uploadParams: S3Params = { Bucket: 'random-post-bucket', Key: `${path}${Date.now().toString()}`, Body: readableInstanceStream };
        return this.uploadToS3(uploadParams);
    }

    private createReadableStream(buffer: Buffer): Readable {
        return new Readable({
            read() {
                this.push(buffer);
                this.push(null);
            },
        });
    }

    private async uploadToS3(uploadParams): Promise<string> {
        const s3Client: S3Client = await this.getS3Client();
        return new Promise((resolve, reject) => {
            s3Client.upload(uploadParams, (err, data) => {
                if (err) {
                    reject(new InternalServerErrorException(err));
                } if (data) {
                    resolve(data.Location);
                }
            });
        });
    }

    private async getS3Client(): Promise<S3Client> {
        if (!this.s3Client) {
            return new AWS.S3({ apiVersion: '2006-03-01' });
        }
        return this.s3Client;
    }

}
