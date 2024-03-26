import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  baseUrl = environment.PROXY_URL;

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
  
}