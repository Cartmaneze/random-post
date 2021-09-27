
import { IsString } from 'class-validator';

export class GetImageAndTextInput {
    @IsString()
    image: string;
    text: string;
}
