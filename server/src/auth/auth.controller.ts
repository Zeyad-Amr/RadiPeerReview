import {
  Controller,
  Post,
  Body,
  Patch,
  HttpCode,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { handleError } from '@/shared/http-error';
import { LoginDTO } from './dto/login.dto';
import { Public } from '@/shared/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDTO) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch('changepassword')
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req) {
    try {
      return await this.authService.changePassword(req.user.sub, dto);
    } catch (error) {
      throw handleError(error);
    }
  }

}
