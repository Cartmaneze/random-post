
import { IsString } from 'class-validator';

export class GetImageThemeInput {
    @IsString()
    theme: string;
}
