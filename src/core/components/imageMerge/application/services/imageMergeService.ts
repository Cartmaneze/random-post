import { Inject, Injectable } from '@nestjs/common';
import * as sizeOf from 'buffer-image-size';
import * as sharp from 'sharp';
import * as text2png from 'text2png';
import { CompositeOpt } from '../../data/CompositeOpt';
import { Dimension } from '../../data/Dimension';
import { GetImageAndTextInput } from '../../data/input/GetImageAndTextInput';
import { FileStorage, FileStorageType } from '../../port/FileStorage';
import { ImageBufferByUrlApi, ImageBufferByUrlApiType } from '../../port/ImageBufferByUrlApi';

@Injectable()
export class ImageMergeService {
    constructor(
        @Inject(ImageBufferByUrlApiType)
        private readonly imageBufferReceiver: ImageBufferByUrlApi,
        @Inject(FileStorageType)
        private readonly fileStorage: FileStorage,
    ) { }

    private static chunkString(str, length) {
        return str.match(new RegExp(`.{1,${length}}`, 'g'));
    }

    private static createTextPng(text: string, textSize: number, textColor: string): Buffer {
        return text2png(text, {
            font: `${textSize}px font-bakoma`,
            color: textColor,
            padding: 30,
            lineSpacing: 10,
            output: 'buffer',
        });
    }

    public async merge(input: GetImageAndTextInput): Promise<string> {
        const { imageUrl, wtmkUrl, text, textSize, textColor, textPos, wtmkPos } = input;
        const imageBuffer: Buffer = await this.getBuffer(imageUrl);
        const dimensions: Dimension = sizeOf(imageBuffer);
        const processedText = this.textWithCarriageReturn (text, textSize, dimensions.width);
        const compositeOptions: CompositeOpt[] = await this.getCompositeOptions(wtmkUrl, wtmkPos, processedText, textSize, textPos, textColor);
        const mergedImageBuffer = await sharp(imageBuffer)
            .composite(compositeOptions)
            .toBuffer();
        return this.fileStorage.upload('', mergedImageBuffer);
    }

    private async getCompositeOptions(wtmkUrl, wtmkPosition, text, textSize, textPos, textColor): Promise<CompositeOpt[]> {
        const options: CompositeOpt[] = [];
        const textBuffer: Buffer = ImageMergeService.createTextPng(text, textSize, textColor);
        options.push({ input: textBuffer, gravity: textPos });
        if (wtmkUrl) {
            const watermarkBuffer: Buffer = await this.getBuffer(wtmkUrl);
            options.push({ input: watermarkBuffer, gravity: wtmkPosition });
        }
        return options;
    }

    private async getBuffer(url: string): Promise<Buffer> {
        return this.imageBufferReceiver.getBufferByUrl(url);
    }

    private textWithCarriageReturn(text: string, textSize: number, imageWidth: number): string {
        const maxWidth = imageWidth * 0.999;
        const maxLetterCount = Math.floor(maxWidth / textSize);
        const textArray = text.toUpperCase().split(' ');
        let lines: string[] = [];
        let line = '';
        textArray.forEach(word => {
            if (line.length + word.length >= maxLetterCount) {
                if (word.length >= maxLetterCount) {
                    const chunks = ImageMergeService.chunkString(line + word, maxLetterCount);
                    for (let i = 0; i < chunks.length - 1; i++) {
                        lines.push(chunks[i]);
                    }
                    line = `${chunks[chunks.length - 1]} `;
                } else {
                    lines.push(line);
                    line = `${word} `;
                }
            } else {
                line += `${word} `;
            }
        });
        lines.push(line);
        lines = lines.filter(line => line !== '');
        line = lines.join('\n');
        return line;
    }
}
