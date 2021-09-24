import { ApiResponseProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { Welcome } from '../../../domain/data/Welcome';

export class WelcomeResponse {
    @IsString()
    @ApiResponseProperty()
    message: string;

    public static fromObject(builder: Welcome): WelcomeResponse {
        const response = new WelcomeResponse();
        response.message = builder.message;
        return response;
    }
}
