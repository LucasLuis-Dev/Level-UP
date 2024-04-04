import { Component, OnInit } from '@angular/core';
import { ListGamesComponent } from '../../components/list-games/list-games.component';

@Component({
  selector: 'app-favorite-games',
  standalone: true,
  imports: [ListGamesComponent],
  templateUrl: './favorite-games.component.html',
  styleUrl: './favorite-games.component.scss'
})
export class FavoriteGamesComponent implements OnInit {
  
  favoriteGames: any[] = [];

  ngOnInit(): void {
    this.getFavoriteGames();
  }

  getFavoriteGames() {
    const savedGames = localStorage.getItem('favoriteGames');
    console.log(savedGames);
    if (savedGames) {
      this.favoriteGames = JSON.parse(savedGames);
    }
  }
}
