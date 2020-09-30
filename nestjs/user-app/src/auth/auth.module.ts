import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    // PassportModule,
    // JwtModule.register({
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    // }),
  ],
  // providers: [AuthService, LocalStrategy, JwtStrategy],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
