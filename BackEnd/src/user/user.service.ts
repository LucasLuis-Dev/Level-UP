import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IsUser } from './interface/user.interface';
import { Model } from 'mongoose';
import { AddFavortiteGameUserDto } from './dto/add-favorite-game-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel("User")
    private userModel: Model<IsUser>
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    createUserDto.games = []
    const newUser = await new this.userModel(createUserDto)
    console.log(newUser)
    return newUser.save()
  }

  async addGame(addFavoriteGameUserDto: AddFavortiteGameUserDto) {
    const existingUser = await this.findByUserId(addFavoriteGameUserDto.userId);

    if (!existingUser) {
      return -1;
    };
    if (!existingUser.games) {
      existingUser.games = [];
    }

    existingUser.games.push(addFavoriteGameUserDto.gameId);

    return this.userModel.findByIdAndUpdate(existingUser._id, existingUser, { new: true })
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
