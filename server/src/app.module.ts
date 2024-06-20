import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RadiologistModule } from './radiologist/radiologist.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ReviewModule } from './review/review.module';
import { ReportModule } from './report/report.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ReviewRequestModule } from './review-request/review-request.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ConfigRepo } from './config/config.repo';
import { PrismaService } from './shared/prisma-client/prisma.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/files', // URL prefix to access files
    }),
    AuthModule,
    RadiologistModule,
    ReviewModule,
    ReportModule,
    ReviewRequestModule,
    NotificationsModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ConfigService,
    ConfigRepo,
    PrismaService,
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    this.initConfig();
  }

  private async initConfig() {
    await this.configService.setConfig();
  }
}
