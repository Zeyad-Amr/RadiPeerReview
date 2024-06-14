import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, } from "class-validator";

export class LoginDTO {
    @ApiProperty({
        type: String,
        example: 'Admin123',
      })
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @ApiProperty({
        type: String,
        example: 'Admin1234',
      })
    @IsNotEmpty()
    password: string;

}
