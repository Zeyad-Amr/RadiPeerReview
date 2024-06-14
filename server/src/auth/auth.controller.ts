import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { handleError } from '@/shared/http-error';
import { LoginDTO } from './dto/login.dto';
import { Public } from '@/shared/decorators/public.decorator';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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

  @Public()
  @Post('signup')
  async create(@Body() signupDto: SignupDto) {
    try {
      const {  auth,doctor } = signupDto
      const newAuth = await this.authService.create({
        ...auth,doctor:{
          create:{
            ...doctor
          }
        }
      })
      return newAuth;
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.authService.findAll();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.authService.findOne(id);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    try {
      return await this.authService.update(id, updateAuthDto);
    } catch (error) {
      throw handleError(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.authService.remove(id);
    } catch (error) {
      throw handleError(error);
    }
  }
}
