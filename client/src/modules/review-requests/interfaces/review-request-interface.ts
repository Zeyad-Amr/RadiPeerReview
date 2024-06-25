import { RadiologistInterface } from "@/modules/radiologists/interfaces/radiologist-interface";

export interface ReviewRequestInterface {
  id?: string;
  reviewerId?: string;
  name: string;
  creator: RadiologistInterface;
  reviewer: RadiologistInterface | null;
  status: string | undefined;
  score?: number;
}
