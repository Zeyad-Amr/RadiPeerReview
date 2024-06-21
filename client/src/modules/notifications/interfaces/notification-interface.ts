import {
  NotificationStatus,
  NotificationType,
} from "@/core/shared/constants/enums";
import { UserInterface } from "@/modules/auth/interfaces/user-interface";

export interface NotificationInterface {
  id: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
  entityId: string;
  receiver?: UserInterface;
}
