
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConstants.secret,
        });
    }

    // Possible to enrich:
    // do a database lookup in our validate() method to extract more information about the user, 
    // resulting in a more enriched user object being available in our Request
    async validate(payload: any) {
        // console.log('----> inside validate')
        // console.log(payload)
        return { password: payload.sub, email: payload.email, userId: payload._id };
    }
}