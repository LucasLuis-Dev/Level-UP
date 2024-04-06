import { Document } from "mongoose";

export interface IsUser extends Document {
    readonly userId: string;
    readonly games: string[];
}
