import { Module } from '@nestjs/common';
import { RestModule } from './primaryAdapters/rest/RestModule';
import { PostgresConnectionModule } from './secondaryAdapters/postgres/common/PostgresConnectionModule';

@Module({
    imports: [
        PostgresConnectionModule,
        RestModule,
    ],
})
export class AppModule { }
