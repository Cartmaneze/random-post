import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from './application/services/auth-basic.strategy';

@Module({
    imports: [ PassportModule ],
    providers: [ BasicStrategy ],
})
export class AuthModule { }
