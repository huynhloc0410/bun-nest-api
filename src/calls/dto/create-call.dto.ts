import { IsString } from "class-validator";

export class CreateCallDto{

    @IsString()
    message: string;

    @IsString()
    callType: string;
}