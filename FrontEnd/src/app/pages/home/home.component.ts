import { Component } from '@angular/core';
import { ListGamesComponent } from '../../components/list-games/list-games.component';
import { HttpClientModule } from '@angular/common/http';
import { GamesService } from '../../services/games/games.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListGamesComponent, FormsModule, LoaderComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home-responsive.component.scss']
})

export class HomeComponent {
  gamesList: any[] = [];
  displayLoader: boolean = true;
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

        setInterval(() => {
          this.displayLoader = false
        }, 200)
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

  updatePlatform(): void {
    
    if (this.selectedFilterPlatform && this.selectedFilterPlatform != "default") {
      console.log(this.selectedFilterPlatform)
      this.gamesList = this.gamesList.filter(game => game.platform.toLowerCase().includes(this.selectedFilterPlatform));
      console.log(this.gamesList)
    } else if (this.selectedFilterPlatform == "default") {
      this.loadDefaultGames()
    }
  }

  updateCategory(): void {
    if (this.selectedFilterCategory && this.selectedFilterCategory != "default") {
      this.gamesService.getGamesByCategory(this.selectedFilterCategory).subscribe({
        next: (data: any) => {
          this.gamesList = data;
        },
        error: (error: any) => {
          console.error('Erro ao obter a lista de jogos:', error);
        }
      });
    } else if (this.selectedFilterCategory == 'default') {
      this.loadDefaultGames()
    }
  }

 
}
