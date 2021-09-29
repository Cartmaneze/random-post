
import { IsNumber, IsString } from 'class-validator';

export class GetImageAndTextInput {
    @IsString()
    url: string;
    @IsString()
    text: string;
    @IsNumber()
    textSize: number;
    @IsString()
    textColor: string;
    @IsString()
    textPosition: string;
    @IsString()
    watermarkPosition: string;
}
