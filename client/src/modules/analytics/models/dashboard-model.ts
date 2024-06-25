import BaseModel from "@/core/base/base-model";
import { dashboardInterface } from "../interfaces/dashboard-interface";

class DashboardModel extends BaseModel<dashboardInterface> {
  fromJson(json: any): dashboardInterface {
    return {
      response: json,
    };
  }
  toJson(model: dashboardInterface): any {}
}
const dashboardModel = new DashboardModel();
export default dashboardModel;
