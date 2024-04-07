import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FavoriteGameUserDto } from './dto/favorite-game-user.dto';
import { GetAllGameUserDto } from './dto/get-all-games-user.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('add-game')
  addGameFavoriteUser(@Body() favoriteGamerUserDto: FavoriteGameUserDto) {
    return this.userService.addGame(favoriteGamerUserDto)
  }

  @Patch('remove-game')
  removeGameFavoriteUser(@Body() favoriteGamerUserDto: FavoriteGameUserDto) {
    return this.userService.removeGame(favoriteGamerUserDto);
  }

  @Get('games')
  getAllGamesUser(@Query() getAllGamesUserDto: GetAllGameUserDto) { 
    return this.userService.getAllGamesUser(getAllGamesUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
