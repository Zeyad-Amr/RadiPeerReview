import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateReportDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, example: 'This is a test report' })
    additionalComments: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ type: String, example: '123456' })
    reviewRequestId?: string;

    @ApiProperty({ type: 'string', format: 'binary', description: 'Result file' })
    result?: any;

    @ApiProperty({ type: 'string', format: 'binary', description: 'Report file' })
    report?: any;
}
