import { Injectable } from '@nestjs/common';
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
    @InjectModel("User")
    private userModel: Model<IsUser>
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.games = []
    const newUser = await new this.userModel(createUserDto)
    return newUser.save()
  }

  async addGame(favoriteGameUserDto: FavoriteGameUserDto) {
    const existingUser = await this.findByUserId(favoriteGameUserDto.userId);

    if (!existingUser) {
      return -1;
    };

    existingUser.games.push(favoriteGameUserDto.gameId);

    return this.userModel.findByIdAndUpdate(existingUser._id, existingUser, { new: true })
  }

  async removeGame(favoriteGameUserDto: FavoriteGameUserDto) {
    const existingUser = await this.findByUserId(favoriteGameUserDto.userId);

    if (!existingUser) {
      return -1;
    };

    existingUser.games = existingUser.games.filter(gameId => gameId !== favoriteGameUserDto.gameId);

    return this.userModel.findByIdAndUpdate(existingUser._id, existingUser, { new: true })
  }

  async getAllGamesUser(getAllGamesUserDto: GetAllGameUserDto) {
    const existingUser = await this.findByUserId(getAllGamesUserDto.userId);

    if (!existingUser) {
      return -1;
    };

    return existingUser.games
  }

  async findByUserId(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ userId }).exec();
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
