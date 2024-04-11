import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "The field referring to the user's 'User ID' will be used to record the user's presence in the database.",
        example: '12345'
    })
    userId: string;

    @ApiProperty({
        description: "Field referring to the user's list of favorite games, which will be initialized as empty because it is a new user."
    })
    games: string[];
}
