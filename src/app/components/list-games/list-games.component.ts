import { Component, Input } from '@angular/core';
import { GamesService } from '../../services/games/games.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-games',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list-games.component.html',
  styleUrl: './list-games.component.scss'
})
export class ListGamesComponent {
  @Input() gamesList: any[] = [];
  @Input() useFavoriteButton: boolean = true;

  constructor() {}
  /*
  saveGameToFavorites(game: any) {
    if (this.isGameFavorite(game)) {
      this.gamesService.removeGameFromFavorites(game);
    } else {
      this.gamesService.saveGameToFavorites(game);
    }
  }


  isGameFavorite(game: any): boolean {
    return this.gamesService.isGameInFavorites(game);
  }
  */
}
