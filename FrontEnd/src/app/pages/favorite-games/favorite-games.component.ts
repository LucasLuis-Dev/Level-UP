import { Component, OnInit } from '@angular/core';
import { ListGamesComponent } from '../../components/list-games/list-games.component';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../enviroments/enviroment';
import { GamesService } from '../../services/games/games.service';

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

@Component({
  selector: 'app-favorite-games',
  standalone: true,
  imports: [ListGamesComponent],
  templateUrl: './favorite-games.component.html',
  styleUrl: './favorite-games.component.scss'
})
export class FavoriteGamesComponent implements OnInit {

  constructor(private userService: UserService, private gamesService: GamesService) {}
  
  favoriteGamesIds: string[] = [];
  favoriteGames: any[] = [];

  ngOnInit(): void {
    this.getFavoriteGamesIds();
  }

  getFavoriteGamesIds(): void {
    this.userService.getAllFavoriteGames(environment.USER_UID).subscribe( {
      next: (response: any) => {
        this.favoriteGamesIds = response;
        this.loadDefaultGames()
      },
      error: (error) => {
        console.error('Erro ao obter IDs de jogos favoritos:', error);
      }
    }
      
    );
  }

  loadDefaultGames(): void {
    this.gamesService.getAllGames().subscribe({
      next: (data: any) => {
        const gamesList = data;
        console.log(gamesList)
        console.log(this.favoriteGamesIds)
        this.favoriteGames = gamesList.filter((game: any) => this.favoriteGamesIds.includes(String(game.id)));
        console.log(this.favoriteGames)
      },
      error: (error: any) => {
        console.error('Erro ao obter a lista de jogos:', error);
      }
    });
  }
}
