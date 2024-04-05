import { IsNotEmpty } from "class-validator"

export class SaveGameUser {
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    userGame: any[]
}