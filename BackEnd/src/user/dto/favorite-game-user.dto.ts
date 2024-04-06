import { IsNotEmpty, IsString } from "class-validator";

export class FavoriteGameUserDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    gameId: string
}
