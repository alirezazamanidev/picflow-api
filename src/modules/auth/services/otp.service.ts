import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomInt } from 'crypto';
import Redis from 'ioredis';
import { AuthMessages } from 'src/common/enums/messages.enum';
import { REDIS_CLIENT } from 'src/configs/redis.config';

@Injectable()
export class OtpService {
  private readonly Otp_expiration_minutes =
    process.env.OTP_EXPIRATION_MINUTES || 5;
  constructor(@Inject(REDIS_CLIENT) private redisClient: Redis) {}

  generateOtp(): string {
    return randomInt(100000, 999999).toString();
  }
  async create(key: string): Promise<string> {
    const otpCached = await this.redisClient.get(`otp:${key}`);
    if (otpCached) throw new UnauthorizedException(AuthMessages.OtpNotExpired);
    const otpCode = this.generateOtp();
    await this.redisClient.setex(
      `otp:${key}`,
      this.Otp_expiration_minutes * 60,
      otpCode,
    );
    return otpCode;
  }
  async verify(key: string, code: string) {
    const otpCached = await this.redisClient.get(`otp:${key}`);
    if (!otpCached)
      throw new UnauthorizedException(AuthMessages.OtpCodeExpired);
    if (otpCached !== code) throw new UnauthorizedException(AuthMessages);
    return true;
  }
}
