// import { PatientDto } from "@/patient/dto/create-patient.dto";
import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { CreateAuthDto } from "./create-auth.dto";
import { CreateDoctorDto } from "@/doctor/dto/create-doctor.dto";


export class SignupDto {
    @IsObject()
    @ValidateNested()
    @Type(() => CreateDoctorDto)
    doctor: CreateDoctorDto;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateAuthDto)
    auth: CreateAuthDto
}