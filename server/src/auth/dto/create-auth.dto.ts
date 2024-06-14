import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateAuthDto implements Prisma.AuthCreateInput {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    doctor?: Prisma.DoctorCreateNestedOneWithoutAuthInput;

}
