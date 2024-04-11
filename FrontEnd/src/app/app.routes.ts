import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { SearchGameComponent } from './pages/search-game/search-game.component';
import { FavoriteGamesComponent } from './pages/favorite-games/favorite-games.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'gameDetail/:id', component: GameDetailsComponent },
    { path: 'search/:search-input', component: SearchGameComponent },
    { path: 'favorite-games', component: FavoriteGamesComponent, pathMatch: 'full' , canActivate: [AuthGuard]}
];
