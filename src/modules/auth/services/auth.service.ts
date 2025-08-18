import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from '../dtos/signUp.dto';
import { hashSync, compareSync } from 'bcrypt';
import { OtpService } from './otp.service';
import { AuthMessages } from 'src/common/enums/messages.enum';
import { MailerService } from './mailer.service';
import { SignInDto } from '../dtos/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly otpService: OtpService,
    private readonly mailerService: MailerService,
  ) {}

  async signUp(dto: SignUpDto) {
    const { username, password, email } = dto;

    // بررسی وجود ایمیل
    const emailExist = await this.userRepository.exists({
      where: { email },
    });

    if (emailExist) {
      throw new UnauthorizedException('Email already in use');
    }

    // بررسی وجود یوزرنیم
    const usernameExist = await this.userRepository.exists({
      where: { username },
    });

    if (usernameExist)
      throw new UnauthorizedException('Username already taken');
    // create user
    const newUser = this.userRepository.create({
      username,
      hashedPassword: hashSync(password, 15),
      email,
      isEmailVerifyed: false,
    });
    await this.userRepository.save(newUser);
    // create otp
    const otpCode = await this.otpService.saveOtp(email);
    // send otp
    await this.mailerService.sendOtpForEmail(email, otpCode);
    return {
      message: AuthMessages.SentOtpCode,
    };
  }
  async signIn(dto: SignInDto) {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !compareSync(password, user.hashedPassword))
      throw new UnauthorizedException(AuthMessages.InvalidCredentials);
    // create and send otp
    const otpCode = await this.otpService.saveOtp(email);
    await this.mailerService.sendOtpForEmail(email, otpCode);
    return {
      message: AuthMessages.SentOtpCode,
    };
  }
}
