import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  baseUrl = "https://www.freetogame.com/api/";

  constructor(private http: HttpClient) { }

  getAllGames() {
    return this.http.get(this.baseUrl + "games");
  }

  getGameByID(gameID: string) {
    return this.http.get(this.baseUrl + "games/" + gameID)
  }

  getGamesByCategory(category: string) {
    return this.http.get(this.baseUrl + "games/category/" + category)
  }

  getGamesByOrder(order: string) {
    return this.http.get(this.baseUrl + "games/order/" + order)
  }


  saveGameToFavorites(game: any) {
    let favorites: any[] = JSON.parse(localStorage.getItem('favoriteGames') || '[]');
    favorites.push(game);
    localStorage.setItem('favoriteGames', JSON.stringify(favorites));
  }

  removeGameFromFavorites(game: any) {
    let favorites: any[] = JSON.parse(localStorage.getItem('favoriteGames') || '[]');
    favorites = favorites.filter(favGame => favGame.id !== game.id); 
    localStorage.setItem('favoriteGames', JSON.stringify(favorites));
  }

  isGameInFavorites(game: any): boolean {
    let favorites: any[] = JSON.parse(localStorage.getItem('favoriteGames') || '[]');
    return favorites.some(favGame => favGame.id === game.id); 
  }
  
}