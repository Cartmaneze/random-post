
export interface SaveImageToS3Api {
    saveToS3(buffer: Buffer): Promise<void>;
}

const SaveImageToS3ApiType = Symbol.for('SaveImageToS3Api');
export { SaveImageToS3ApiType };
