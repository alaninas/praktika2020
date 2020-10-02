
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
// import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

// On expires in env.string --> convert to integer
// https://github.com/nodejs/help/issues/2217
@Module({
  imports: [
    forwardRef(() => UsersModule),
    // UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // Not working with env vars
      // signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES }
    }),
    // JwtService
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
