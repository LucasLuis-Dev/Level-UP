import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';


@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Get('category/:category')
  filterByCategory(@Param('category') category: string) {
    return this.gamesService.filterByCategory(category)
  }

  @Get('order/:order')
  filterByOrder(@Param('order') order: string) {
    return this.gamesService.filterByOrder(order)
  }
}
