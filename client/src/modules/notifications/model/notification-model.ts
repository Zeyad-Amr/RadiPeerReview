import BaseModel from "@/core/base/base-model";

import { Yup } from "@/core/shared/utils/validation";
import { NotificationInterface } from "../interfaces/notification-interface";
import {
  NotificationStatus,
  NotificationType,
} from "@/core/shared/constants/enums";
import userModel from "@/modules/auth/models/user-model";

class NotificationModel extends BaseModel<NotificationInterface> {
  defaultValues: NotificationInterface = {
    id: "",
    message: "",
    type: NotificationType.GENERAL,
    status: NotificationStatus.UNREAD,
    createdAt: new Date(),
    updatedAt: new Date(),
    entityId: "",
  };
  validationSchema = Yup.object().shape({});
  fromJson(json: any): NotificationInterface {
    console.log("json", json);
    return {
      id: json.id,
      message: json.message,
      type: json.type,
      status: json.status,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      entityId: json.entityId,
      receiver:
        json.receiverId === null
          ? undefined
          : userModel.fromJson(json.receiver),
    };
  }
  toJson(model: NotificationInterface): any {
    return {
      id: model.id,
      message: model.message,
      type: model.type,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      entityId: model.entityId,
      receiver: userModel.toJson(model.receiver!),
    };
  }
}
const notificationModel = new NotificationModel();
export default notificationModel;
