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

  async getLeaderBoard() {
    try {
      const highestApprovalRadiologists =
        await this.dashboardRepo.getLeaderBoard();

      // get the creators details
      const creatorsIDs = highestApprovalRadiologists.map(
        (creator) => creator.creatorId,
      );
      // get their data from the db
      const creatorsData =
        await this.dashboardRepo.getRadiologistsData(creatorsIDs);

      const result = [];
      for (let i = 0; i < highestApprovalRadiologists.length; i++) {
        const creator = creatorsData.find(
          (creator) => creator.id === highestApprovalRadiologists[i].creatorId,
        );
        result.push({
          ...highestApprovalRadiologists[i],
          creator: creator.radiologist,
        });
      }

      return result;
    } catch (error) {}
  }
}
