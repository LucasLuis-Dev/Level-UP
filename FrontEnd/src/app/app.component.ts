import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

import { environment } from '../enviroments/enviroment';
import { initializeApp } from 'firebase/app';
import { ArrowToTopComponent } from './components/arrow-to-top/arrow-to-top.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ArrowToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'level-up';

  constructor() {
    const firebaseConfig = {
      apiKey: environment.API_KEY,
      authDomain: environment.AUTH_DOMAIN,
      projectId: environment.PROJECT_ID,
      storageBucket: environment.STORAGE_BUCKET,
      messagingSenderId: environment.MESSAGING_SENDER_ID,
      appId: environment.APP_ID
    }
    const app = initializeApp(firebaseConfig);  
  }
 



}
