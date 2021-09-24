import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WelcomeRepositrotyType } from '../../../core/components/welcome/port/WelcomeRepository';
import { WelcomeEntityConverter, WelcomeEntityConverterType } from './converters/WelcomeEntityConverter';
import { WelcomeEntity } from './data/WelcomeEntity';
import { WelcomeRepositoryAdapter } from './repository/WelcomeRepositoryAdapter';

@Module({
    imports: [ TypeOrmModule.forFeature([
        WelcomeEntity,
    ]) ],
    providers: [
        {
            provide: WelcomeRepositrotyType,
            useClass: WelcomeRepositoryAdapter,
        }, {
            provide: WelcomeEntityConverterType,
            useClass: WelcomeEntityConverter,
        },
    ],
    exports: [
        WelcomeRepositrotyType,
    ],
})
export class WelcomePostgresModule { }
