
import { IsNumber, IsString } from 'class-validator';

export class GetImageAndTextInput {
    @IsString()
    imageUrl: string;
    wtmkUrl: string | null;
    @IsString()
    text: string;
    @IsNumber()
    textSize: number;
    @IsString()
    textColor: string;
    @IsString()
    textPos: string;
    @IsString()
    wtmkPos: string;
}
