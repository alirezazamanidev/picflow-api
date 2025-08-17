import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { OtpService } from './services/otp.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService,OtpService],
})
export class AuthModule {}
