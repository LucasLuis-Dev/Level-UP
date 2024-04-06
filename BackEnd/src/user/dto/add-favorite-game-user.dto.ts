import { IsNotEmpty, IsString } from "class-validator";

export class AddFavortiteGameUserDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    gameId: string
}
