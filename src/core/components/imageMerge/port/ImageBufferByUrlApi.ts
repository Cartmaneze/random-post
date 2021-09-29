
export interface ImageBufferByUrlApi {
    getBufferByUrl(url: string): Promise<Buffer>;
}

const ImageBufferByUrlApiType = Symbol.for('ImageBufferByUrlApi');
export { ImageBufferByUrlApiType };
