// import { PatientDto } from "@/patient/dto/create-patient.dto";
import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { CreateAuthDto } from "./create-auth.dto";
import { CreateDoctorDto } from "@/doctor/dto/create-doctor.dto";
import { ApiProperty } from "@nestjs/swagger";


export class SignupDto {
    @ApiProperty({ type: CreateDoctorDto, required: true })
    @IsObject()
    @ValidateNested()
    @Type(() => CreateDoctorDto)
    doctor: CreateDoctorDto;
    
    @ApiProperty({ type: CreateAuthDto, required: true })
    @IsObject()
    @ValidateNested()
    @Type(() => CreateAuthDto)
    auth: CreateAuthDto
}