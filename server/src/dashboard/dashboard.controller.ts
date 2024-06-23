import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { handleError } from '@/shared/http-error';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '@/shared/decorators/public.decorator';

// @Roles(Role.Admin)
// @UseGuards(RolesGuard)
@ApiTags('Dashboard')
@ApiBearerAuth()
@Public()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('total-reports')
  async getTotalReports() {
    try {
      return await this.dashboardService.getTotalReports();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get('accepted-reports')
  async getAcceptedReports() {
    try {
      return await this.dashboardService.getAcceptedReports();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get('rejected-reports')
  async getRejectedReports() {
    try {
      return await this.dashboardService.getRejectedReports();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get('pending-reports')
  async getPendingReports() {
    try {
      return await this.dashboardService.getPendingReports();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get('average-success-score')
  async getAverageSuccessScore() {
    try {
      return await this.dashboardService.getAverageSuccessScore();
    } catch (error) {
      throw handleError(error);
    }
  }

  @Get('average-failure-score')
  async getAverageFailureScore() {
    try {
      return await this.dashboardService.getAverageFailureScore();
    } catch (error) {
      throw handleError(error);
    }
  }
}
