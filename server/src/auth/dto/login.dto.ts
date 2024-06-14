import { IsEmail, IsNotEmpty, IsString, } from "class-validator";

export class LoginDTO {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    password: string;

}
