import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  baseUrl = "http://localhost:4000/";

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