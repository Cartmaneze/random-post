import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse
} from '@nestjs/swagger';
import { GetWelcomeMessageInput } from '../../../core/components/welcome/application/data/input/GetWelcomeMessageInput';
import { SetWelcomeMessageInput } from '../../../core/components/welcome/application/data/input/SetWelcomeMessageInput';
import { WelcomeResponse } from '../../../core/components/welcome/application/data/output/WelcomeResponse';
import { WelcomeService } from '../../../core/components/welcome/application/services/WelcomeService';

@Controller('welcome')
export class WelcomeController {
    constructor(
        @Inject(WelcomeService)
        private readonly welcomeService: WelcomeService,
    ) { }

    @Get()
    @ApiOkResponse({ type: WelcomeResponse })
    @ApiInternalServerErrorResponse({ description: 'Internal error' })
    @ApiNotFoundResponse({ description: 'Not found' })
    public async getWelcomeMessage(
        @Query() input: GetWelcomeMessageInput,
    ): Promise<WelcomeResponse> {
        return await this.welcomeService.getWelcomeMessage(input.id);
    }

    @Post()
    @ApiInternalServerErrorResponse({ description: 'Internal error' })
    public async setWelcomeMessage(
        @Body() input: SetWelcomeMessageInput,
    ): Promise<void> {
        return await this.welcomeService.saveMessage(input.message);
    }
}
