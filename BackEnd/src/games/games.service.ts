import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class GamesService {

  constructor(private readonly httpService: HttpService) {}

  create() {
    return 'This action adds a new game';
  }

  async findAll(): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.get('https://www.freetogame.com/api/games'));
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição HTTP:', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.get(`https://www.freetogame.com/api/game?id=${id}`));
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição HTTP:', error);
      throw error;
    }
  }

  async filterByCategory(category: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.get(`https://www.freetogame.com/api/games?category=${category}`));
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição HTTP:', error);
      throw error;
    }
  }

  async filterByOrder(order: string): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpService.get(`https://www.freetogame.com/api/games?sort-by=${order}`));
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição HTTP:', error);
      throw error;
    }
  }

  update(id: number) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
