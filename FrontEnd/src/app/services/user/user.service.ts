import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.PROXY_URL;
 

  constructor(private http: HttpClient) { }

  createUser(userId: string): Observable<any> {
    const url = `${this.baseUrl}api/user/create`;
    const body = { "userId": userId };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addFavoriteGame(userId: string, gameId: string): Observable<any> {
    const url = `${this.baseUrl}api/user/add-game`;
    const body = { 
      "userId": userId,
      "gameId": gameId
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.patch(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  removeFavoriteGame(userId: string, gameId: string): Observable<any> {
    const url = `${this.baseUrl}api/user/remove-game`;
    const body = { 
      "userId": userId,
      "gameId": gameId
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.patch(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAllFavoriteGames(userId: string): Observable<any> {
    const url = `${this.baseUrl}api/user/games`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const timestamp = new Date().getTime();
    const params = new HttpParams().set('userId', userId).set('timestamp', timestamp.toString());

    return this.http.get(url, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }



  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
