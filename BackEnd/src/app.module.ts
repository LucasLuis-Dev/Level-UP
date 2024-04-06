import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    GamesModule, 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI), 
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
