import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ImageMergeService } from '../../../core/components/imageMerge/application/services/imageMergeService';
import { GetImageAndTextInput } from '../../../core/components/imageMerge/data/input/GetImageAndTextInput';
import { ImageSearchService } from '../../../core/components/imageSearch/application/services/imageSearchService';
import { GetImageThemeInput } from '../../../core/components/imageSearch/data/input/GetImageThemeInput';

@Controller('image')
export class ImageController {
    constructor(
        @Inject(ImageSearchService)
        private readonly imageSearchService: ImageSearchService,
        @Inject(ImageMergeService)
        private readonly imageMergeService: ImageMergeService,
    ) { }

    @Post('urls')
    @ApiInternalServerErrorResponse({ description: 'Internal error' })
    @ApiNotFoundResponse({ description: 'Not found' })
    public async searchUrls(
        @Body() { theme }: GetImageThemeInput,
    ): Promise<string[]> {
        return await this.imageSearchService.searchUrls(theme);
    }

    @Post('merge')
    @ApiInternalServerErrorResponse({ description: 'Internal error' })
    @ApiNotFoundResponse({ description: 'Not found' })
    public async merge(
        @Body() input: GetImageAndTextInput,
    ): Promise<void> {
        return await this.imageMergeService.merge(input);
    }
}
