import { Inject, Injectable } from '@nestjs/common';
import * as sizeOf from 'buffer-image-size';
import * as sharp from 'sharp';
import * as text2png from 'text2png';
import { Dimension } from '../../data/Dimension';
import { GetImageAndTextInput } from '../../data/input/GetImageAndTextInput';
import { ImageBufferByUrlApi, ImageBufferByUrlApiType } from '../../port/ImageBufferByUrlApi';

@Injectable()
export class ImageMergeService {
    constructor(
        @Inject(ImageBufferByUrlApiType)
        private readonly imageBufferReceiver: ImageBufferByUrlApi,
    ) { }

    public async merge(input: GetImageAndTextInput): Promise<string> {
        const { url, text, textSize, textColor, textPosition, watermarkPosition } = input;
        const imageBuffer: Buffer = await this.imageBufferReceiver.getBufferByUrl(url);
        const dimensions: Dimension = sizeOf(imageBuffer);
        const processedText = this.textWithCarriageReturn (text, textSize, dimensions.width);
        const textBuffer: Buffer = this.createTextPng(processedText, textSize, textColor);
        // TODO toBuffer
        await sharp(imageBuffer)
            .composite([ { input: 'watermark.png', gravity: watermarkPosition }, { input: textBuffer, gravity: textPosition } ])
            .toFile('test.jpeg');
        return '';
    }

    private createTextPng(text: string, textSize: number, textColor: string): Buffer {
        return text2png(text, {
            font: `${textSize}px sans-serif`,
            color: textColor,
            padding: 30,
            lineSpacing: 10,
            output: 'buffer',
        });
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
                    const chunks = this.chunkString(line + word, maxLetterCount);
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

    private chunkString(str, length) {
        return str.match(new RegExp(`.{1,${length}}`, 'g'));
    }
}
