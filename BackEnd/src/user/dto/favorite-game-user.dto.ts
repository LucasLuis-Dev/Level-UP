import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class FavoriteGameUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "The 'User ID' field serves as a reference to the user's identifier in the database, allowing the user to be located and facilitating changes to the list of games associated with them.",
        example: "10"
    })
    userId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "The 'Game ID' field serves as a reference to the game the user wants to save or remove from their list of favorite games",
        example: "520"
    })
    gameId: string
}
