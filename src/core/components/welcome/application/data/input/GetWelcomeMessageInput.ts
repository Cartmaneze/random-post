import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class GetWelcomeMessageInput {
    @IsNumber()
    @Min(1)
    @Type(type => Number)
    @ApiProperty({ minimum: 1 })
    id: number;
}
