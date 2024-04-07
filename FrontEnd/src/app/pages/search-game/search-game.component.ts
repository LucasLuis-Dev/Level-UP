import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games/games.service';
import { ActivatedRoute } from '@angular/router';
import { ListGamesComponent } from '../../components/list-games/list-games.component';

interface Game {
  id: number;
  title: string;
  short_description: string;
  publisher: string;
}

@Component({
  selector: 'app-search-game',
  standalone: true,
  imports: [ListGamesComponent],
  templateUrl: './search-game.component.html',
  styleUrl: './search-game.component.scss'
})
export class SearchGameComponent implements OnInit{
  gamesList: any[] = [];
  searchQuery: string = '';

  constructor(private route: ActivatedRoute,private gamesService: GamesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchQuery = params['search-input'];

      this.loadDefaultGames();
    });
  }

  loadDefaultGames(): void {
    this.gamesService.getAllGames().subscribe({
      next: (data: any) => {
        this.gamesList = this.applyFilterSearch(data)
      },
      error: (error: any) => {
        console.error('Erro ao obter a lista de jogos:', error);
      }
    });
  }
  applyFilterSearch(data: any): any[] {
    const searchQueryLower = this.searchQuery.toLowerCase();
  
    return data.filter((game: Game) => 
      game.title.toLowerCase().includes(searchQueryLower) ||
      game.short_description.toLowerCase().includes(searchQueryLower) ||
      game.publisher.toLowerCase().includes(searchQueryLower)
      );
    }
  
}
