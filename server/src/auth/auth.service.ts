import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChangePasswordDto, CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepo } from './auth.repo';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

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

  async create(createAuthDto: CreateAuthDto) {
    try {
      createAuthDto.password = await this.hashPassword(createAuthDto.password);
      const newAuth = await this.authRepo.create(createAuthDto);
      delete newAuth.password;
      return newAuth;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const auths = await this.authRepo.getAll();
      auths.map((auth) => delete auth.password);
      return auths;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const auth = await this.authRepo.getByID(id);
      delete auth.password;
      return auth;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    try {
      const auth = await this.authRepo.update(id, updateAuthDto);
      delete auth.password;
      return auth;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.authRepo.delete(id);
      return { message: 'Deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  private hashPassword = async (password: string) => {
    //hash password using bcrypt package
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  };

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

      auth.password = await this.hashPassword(dto.newPassword);
      await this.authRepo.changePassword(userID, auth.password);
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw error;
    }
  }
}
