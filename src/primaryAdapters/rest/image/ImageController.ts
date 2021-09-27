import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ImageService } from '../../../core/components/image/application/services/ImageService';
import { GetImageAndTextInput } from '../../../core/components/image/data/input/GetImageAndTextInput';
import { GetImageThemeInput } from '../../../core/components/image/data/input/GetImageThemeInput';

@Controller('image')
export class ImageController {
    constructor(
        @Inject(ImageService)
        private readonly imageService: ImageService,
    ) { }

    @Post('urls')
    @ApiInternalServerErrorResponse({ description: 'Internal error' })
    @ApiNotFoundResponse({ description: 'Not found' })
    public async searchUrls(
        @Body() { theme }: GetImageThemeInput,
    ): Promise<string[]> {
        return await this.imageService.searchUrls(theme);
    }

    @Post('merge')
    @ApiInternalServerErrorResponse({ description: 'Internal error' })
    @ApiNotFoundResponse({ description: 'Not found' })
    public async merge(
        @Body() input: GetImageAndTextInput,
    ): Promise<void> {
        return await this.imageService.merge(input);
    }
}
