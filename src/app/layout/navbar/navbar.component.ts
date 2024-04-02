import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../enviroments/enviroment';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchInput: string = '';
  userLogged: boolean = false;
  userPhoto: string = ''
  constructor(private router: Router, private authService: AuthService) {}

  signInWithGoogle(): void {
    this.authService.signInWithGoogle()
      .then(() => {
        this.router.navigate(['/']);
        if (environment.USER && Object.keys(environment.USER).length > 0) {
          this.userPhoto = environment.USER_PHOTO_URL
          this.userLogged = true
        }
       
      })
      .catch((error) => {
        console.error(error)
      });
  }

  searchGame() {
      this.router.navigate(['/search', this.searchInput]);
  }
}
