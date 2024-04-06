import { IsNotEmpty, IsString } from "class-validator";

export class GetAllGameUserDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
}