import { RadiologistInterface } from "@/modules/admin/interfaces/radiologist-interface";

export interface ReviewRequestInterface {
  id?: string;
  reviewerId?: string;
  name: string;
  creator: RadiologistInterface;
  reviewer: RadiologistInterface | null;
  status: string | undefined;
  approved: boolean | null;
}
