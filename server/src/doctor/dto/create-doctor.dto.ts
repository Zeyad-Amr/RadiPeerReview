import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateDoctorDto implements Prisma.DoctorCreateInput{
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    fname: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    lname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    specialization: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}
