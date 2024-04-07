import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private baseUrl: string = environment.PROXY_URL;

  constructor(private http: HttpClient) {}

  getAllGames() {
    return this.http.get(this.baseUrl + "api/games");
  }

  getGameByID(gameID: string) {
    return this.http.get(this.baseUrl + "api/games/" + gameID)
  }

  getGamesByCategory(category: string) {
    return this.http.get(this.baseUrl + "api/games/category/" + category)
  }

  getGamesByOrder(order: string) {
    return this.http.get(this.baseUrl + "api/games/order/" + order)
  }
  
}