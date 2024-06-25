import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthRepo } from './auth.repo';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from '@/shared/utlis/utils';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepo,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDTO) {
    try {
      const errInvalidCredentials = 'Invalid username or password';
      const auth = await this.authRepo.getByAuthname(loginDto.username);
      if (!auth) {
        throw new UnauthorizedException(errInvalidCredentials);
      }

      const validPass = await bcrypt.compare(loginDto.password, auth.password);
      if (!validPass) {
        throw new UnauthorizedException(errInvalidCredentials);
      }

      if (auth.isdeactivated) {
        throw new UnauthorizedException('Account is deactivated');
      }
      const token = await this.jwtService.signAsync({
        sub: auth.id,
        role: auth.role,
      });
      delete auth.password;
      return { token, auth };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(userID: string, dto: ChangePasswordDto) {
    try {
      const auth = await this.authRepo.getByID(userID);
      if (!auth) {
        throw new UnauthorizedException('Invalid user');
      }

      console.log('auth', auth);
      const validPass = await bcrypt.compare(dto.oldPassword, auth.password);
      if (!validPass) {
        throw new UnauthorizedException('Old password is incorrect');
      }

      auth.password = await hashPassword(dto.newPassword);
      await this.authRepo.changePassword(userID, auth.password);
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw error;
    }
  }
}
