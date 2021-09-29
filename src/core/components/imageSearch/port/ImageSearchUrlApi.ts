
export interface ImageSearchUrlApi {
    searchUrls(theme: string): Promise<string[]>;
}

const ImageSearchUrlApiType = Symbol.for('ImageSearchUrlApi');
export { ImageSearchUrlApiType };
