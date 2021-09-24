import { Module } from '@nestjs/common';
import { WelcomePostgresModule } from '../../../secondaryAdapters/postgres/welcome/WelcomePostgresModule';
import { WelcomeResponseMapper, WelcomeResponseMapperType } from './application/services/mappers/WelcomeResponseMapper';
import { WelcomeService } from './application/services/WelcomeService';

@Module({
    imports: [
        WelcomePostgresModule,
    ],
    providers: [
        WelcomeService,
        {
            provide: WelcomeResponseMapperType,
            useClass: WelcomeResponseMapper,
        },
    ],
    exports: [
        WelcomeService,
    ],
})
export class WelcomeModule { }
