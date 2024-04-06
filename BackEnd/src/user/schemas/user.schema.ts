import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'user'})
export class User {

  _id: string

  @Prop({ required: true, unique: true })
  userId: string;

  @Prop()
  games: string[];
}


export const UserSchema = SchemaFactory.createForClass(User);