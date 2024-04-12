import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IsUser } from './interface/user.interface';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { FavoriteGameUserDto } from './dto/favorite-game-user.dto';
import { GetAllGameUserDto } from './dto/get-all-games-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<IsUser>
  ) {}

  async create(createUserDto: CreateUserDto)  {
    createUserDto.games = []

    const existingUser = await this.findByUserId(createUserDto.userId)

    if (existingUser) {
      return {
        statusCode: HttpStatus.OK,
        message: " The user already exists"
      }
    }

    const newUser = await new this.userModel(createUserDto)
    return newUser.save()
  }

  async addGame(favoriteGameUserDto: FavoriteGameUserDto) {
    const existingUser = await this.findByUserId(favoriteGameUserDto.userId);

    if (!existingUser) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "The user does not exist"
      }
    };

    existingUser.games.push(favoriteGameUserDto.gameId);

    return this.userModel.findByIdAndUpdate(existingUser._id, existingUser, { new: true })
  }

  async removeGame(favoriteGameUserDto: FavoriteGameUserDto) {
    const existingUser = await this.findByUserId(favoriteGameUserDto.userId);

    if (!existingUser) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "The user does not exist"
      }
    };

    existingUser.games = existingUser.games.filter(gameId => gameId !== favoriteGameUserDto.gameId);

    return this.userModel.findByIdAndUpdate(existingUser._id, existingUser, { new: true })
  }

  async getAllGamesUser(getAllGamesUserDto: GetAllGameUserDto) {
    const existingUser = await this.findByUserId(getAllGamesUserDto.userId);

    if (!existingUser) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: "The user does not exist"
      }
    };

    return existingUser.games
  }

  async findByUserId(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ userId }).exec();
    return user;
  }
}
