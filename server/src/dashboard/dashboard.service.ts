import { Injectable } from '@nestjs/common';
import { DashboardRepo } from './dashboard.repo';

@Injectable()
export class DashboardService {
  constructor(private dashboardRepo: DashboardRepo) {}

  async getTotalReports() {
    try {
      return await this.dashboardRepo.getTotalReports();
    } catch (error) {
      throw error;
    }
  }

  async getAcceptedReports() {
    try {
      return await this.dashboardRepo.getAcceptedReports();
    } catch (error) {
      throw error;
    }
  }

  async getRejectedReports() {
    try {
      return await this.dashboardRepo.getRejectedReports();
    } catch (error) {
      throw error;
    }
  }

  async getPendingReports() {
    try {
      return await this.dashboardRepo.getPendingReports();
    } catch (error) {
      throw error;
    }
  }

  async getAverageSuccessScore() {
    try {
      return await this.dashboardRepo.getAverageSuccessScore();
    } catch (error) {
      throw error;
    }
  }

  async getAverageFailureScore() {
    try {
      return await this.dashboardRepo.getAverageFailureScore();
    } catch (error) {
      throw error;
    }
  }
}
