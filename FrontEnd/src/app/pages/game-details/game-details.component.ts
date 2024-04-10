import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games/games.service';
import { CommonModule, formatDate } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss', './game-details-secondary-informations.component.scss']
})
export class GameDetailsComponent implements OnInit {
  
  gameID: string | null = '';
  gameDetails: {label: string; value: any; }[] = [];
  isFavoriteGameByUser: boolean = false;
  isLoggedUser: boolean = false;
  selectedGame: any;
  currentIndex = 0;

  constructor(private activatedRoute: ActivatedRoute, private gamesService: GamesService, private userService: UserService) {}

  ngOnInit(): void {
    this.gameID = this.activatedRoute.snapshot.paramMap.get("id");

    if (this.gameID) {
      if (environment.USER && Object.keys(environment.USER).length > 0) {
        this.isFavoriteGame(this.gameID);
        this.isLoggedUser = true
      } else {
        this.isLoggedUser = false
      }
      this.gamesService.getGameByID(this.gameID).subscribe({
        next: (data: any) => {
          this.selectedGame = data;
          console.log(this.selectedGame)
          this.gameDetails.push({ label: 'Genre', value: this.selectedGame.genre });
          this.gameDetails.push({ label: 'Developer', value: this.selectedGame.developer });
          this.gameDetails.push({ label: 'Publisher', value: this.selectedGame.publisher });
          this.gameDetails.push({ label: 'Release Date', value: this.formatDate(this.selectedGame.release_date) });
          this.gameDetails.push({ label: 'Platform', value: this.selectedGame.platform });
        },
        error: (error: any) => {
          console.error('Erro ao obter a lista de jogos:', error);
        }
      });
     
      
    }

    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.selectedGame.screenshots.length;
    }, 3000);
  }
  

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  formatDate(dateString: string): string {
    return formatDate(dateString, 'dd/MM/yyyy', 'en-US');
  }

  hasMinimumRequirements(): boolean {
    return this.getObjectKeys(this.selectedGame.minimum_system_requirements).some(key => this.selectedGame.minimum_system_requirements[key] !== null);
  }

  addFavoriteGame(): void {
    if (this.gameID) {
      this.userService.addFavoriteGame(environment.USER_UID, this.gameID).subscribe(
        (response) => {
          console.log('Jogo adicionado aos favoritos:', response);
          this.isFavoriteGameByUser = true
        },
        (error) => {
          console.error('Erro ao adicionar jogo aos favoritos:', error);
        }
      );
    }
  }

  removeFavoriteGame(): void {
    if (this.gameID) {
      this.userService.removeFavoriteGame(environment.USER_UID, this.gameID).subscribe(
        (response) => {
          console.log('Jogo removido dos favoritos:', response);
          this.isFavoriteGameByUser = false
        },
        (error) => {
          console.error('Erro ao remover jogo dos favoritos:', error);
        }
      );
    }
  }

  isFavoriteGame(gameId: string): void {
    this.userService.getAllFavoriteGames(environment.USER_UID).subscribe(
      (response: any) => {
        console.log(response)
        const favoriteGameIds = response;
        const isFavorite = favoriteGameIds.includes(gameId);
        this.isFavoriteGameByUser = isFavorite;
      },
      (error) => {
        console.error('Erro ao obter IDs de jogos favoritos:', error);
      }
    );
  }
  
}
