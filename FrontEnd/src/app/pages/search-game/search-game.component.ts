import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games/games.service';
import { ActivatedRoute } from '@angular/router';
import { ListGamesComponent } from '../../components/list-games/list-games.component';
import { LoaderComponent } from '../../components/loader/loader.component';

interface Game {
  id: number;
  title: string;
  short_description: string;
  publisher: string;
}

@Component({
  selector: 'app-search-game',
  standalone: true,
  imports: [ListGamesComponent, LoaderComponent],
  templateUrl: './search-game.component.html',
  styleUrl: './search-game.component.scss'
})
export class SearchGameComponent implements OnInit{
  gamesList: any[] = [];
  inRequest: boolean = false;
  searchQuery: string = '';

  constructor(private route: ActivatedRoute,private gamesService: GamesService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchQuery = params['search-input'];
      this.inRequest = true;
      this.loadDefaultGames();
    });
  }

  loadDefaultGames(): void {
    this.gamesService.getAllGames().subscribe({
      next: (data: any) => {
        this.gamesList = this.applyFilterSearch(data)
        if (this.gamesList.length == 0) {
          this.inRequest = false
        }
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
