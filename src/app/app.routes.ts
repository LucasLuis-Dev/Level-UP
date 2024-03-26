import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'gameDetail/:id', component: GameDetailsComponent },
];
