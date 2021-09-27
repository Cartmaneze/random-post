
export interface ImageUrlApi {
    searchUrls(theme: string): Promise<string[]>;
}

const ImageUrlApiType = Symbol.for('ImageUrlApi');
export { ImageUrlApiType };
