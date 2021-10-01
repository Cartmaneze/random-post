
export interface FileStorage {
    upload(path: string, buffer: Buffer): Promise<string>;
}

const FileStorageType = Symbol.for('FileStorage');
export { FileStorageType };
