
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    // Possible to enrich:
    // do a database lookup in our validate() method to extract more information about the user, 
    // resulting in a more enriched user object being available in our Request
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}