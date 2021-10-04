import { Module } from '@nestjs/common';
// import { PostgresConnectionModule } from './secondaryAdapters/postgres/common/PostgresConnectionModule';
import { AuthModule } from './core/components/auth/AuthModule';
import { RestModule } from './primaryAdapters/rest/RestModule';

@Module({
    imports: [
      //  PostgresConnectionModule,
        RestModule,
        AuthModule,
    ],
})
export class AppModule { }
