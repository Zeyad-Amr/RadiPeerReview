import { IsOptional, IsString } from "class-validator";

export class CreateReportDto {
    
    @IsOptional()
    @IsString()
    additionalComments: string
    
    @IsOptional()
    @IsString()
    reviewRequestId: string
}
