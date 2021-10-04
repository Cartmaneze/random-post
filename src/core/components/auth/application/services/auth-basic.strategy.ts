import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import config from '../../../../../configuration/config/Config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            passReqToCallback: true,
        });
    }

    public validate = async (req, username, password): Promise<boolean> => {
        if (config.credentials.user === username && config.credentials.password === password) {
            return true;
        }
        throw new UnauthorizedException();
    }
}
