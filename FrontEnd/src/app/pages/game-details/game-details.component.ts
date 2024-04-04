import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games/games.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent implements OnInit {
  
  gameID: string | null = '';
  gameDetails: {label: string; value: any; }[] = [];
  selectedGame: any;
  currentIndex = 0;

  constructor(private activatedRoute: ActivatedRoute, private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gameID = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.gameID)
  
    if (this.gameID) {
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
}
