import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { SignUpDto } from './dtos/signUp.dto';
import { ContentTypeEnum } from 'src/common/enums/form.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary:"signUp"})
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes(ContentTypeEnum.Form,ContentTypeEnum.Json)
  signUp(@Body() dto:SignUpDto){
    return  this.authService.signUp(dto);
  }
}
