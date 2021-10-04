import { Readable } from 'stream';

export class S3Params {
    Bucket: string;
    Key: string;
    Body: Readable;
    ACL: string;
}
