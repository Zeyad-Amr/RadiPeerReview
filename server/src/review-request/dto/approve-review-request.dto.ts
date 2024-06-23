import { IsIn, IsInt, IsNotEmpty } from "class-validator";

export class ApproveReqDto{
    @IsNotEmpty()
    @IsInt()
    @IsIn([0, 1], { message: 'The value must be either 0 or 1.' })
    status:number
}