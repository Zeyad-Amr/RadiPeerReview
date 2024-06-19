import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepo } from './auth.repo';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@/shared/prisma-client/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepo, PrismaService],
  exports: [AuthService, AuthRepo],
})
export class AuthModule {}
