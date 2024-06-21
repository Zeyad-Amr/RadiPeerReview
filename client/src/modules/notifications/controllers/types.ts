import { NotificationInterface } from "../interfaces/notification-interface";

export interface NotificationState {
  notifications: NotificationInterface[];
  loading: boolean;
  error: string;
}
