import { Component } from '@angular/core';
import { ListGamesComponent } from '../../components/list-games/list-games.component';
import { HttpClientModule } from '@angular/common/http';
import { GamesService } from '../../services/games/games.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListGamesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  gamesList: any[] = [];
  selectedOrderGames: string = '';
  selectedFilterPlatform: string = '';
  selectedFilterCategory: string = '';
  selectedFilterDate: string = '';
  selectedFilterDeveloper: string = '';
  showModal: boolean = true;
  categories: string[] = [
    "mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world", "survival",
    "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-Person", "top-down", "tank",
    "space", "sailing", "side-scroller", "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps",
    "3d", "2d", "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts", "flight",
    "low-spec", "tower-defense", "horror", "mmorts"
  ];


  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.loadDefaultGames()
  }

  
  loadDefaultGames(): void {
    this.gamesService.getAllGames().subscribe({
      next: (data: any) => {
        this.gamesList = data;
        this.applyFilters();
      },
      error: (error: any) => {
        console.error('Erro ao obter a lista de jogos:', error);
      }
    });
  }
  

  updateOrder(): void {
    if (this.selectedOrderGames && this.selectedOrderGames !== 'default') {

      this.gamesService.getGamesByOrder(this.selectedOrderGames).subscribe({
        next: (data: any) => {
          this.gamesList = data;
          this.applyFilters();
        },
        error: (error: any) => {
          console.error('Erro ao obter os jogos ordenados:', error);
        }
      });
    }

    else {
      this.loadDefaultGames()
    }
  }

  updateFilter(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredGames = [...this.gamesList];

    if (this.selectedFilterPlatform) {
      console.log(this.selectedFilterPlatform)
      filteredGames = filteredGames.filter(game => game.platform.includes(this.selectedFilterPlatform));
    }

    if (this.selectedFilterCategory) {
      filteredGames = filteredGames.filter(game => game.genre.includes(this.selectedFilterCategory));
    }

    if (this.selectedFilterDate) {
      filteredGames = filteredGames.filter(game => game.releaseDate === this.selectedFilterDate);
    }

    if (this.selectedFilterDeveloper) {
      filteredGames = filteredGames.filter(game => game.developer.includes(this.selectedFilterDeveloper));
    }

    console.log(filteredGames);
    this.gamesList = filteredGames;
  }
}
