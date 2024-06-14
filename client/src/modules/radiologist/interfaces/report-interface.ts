export interface ReportInterface {
  id?: string | number;
  pdfFile: File | null;
  dicomFile: File | null;
  additionalComments: string;
}
