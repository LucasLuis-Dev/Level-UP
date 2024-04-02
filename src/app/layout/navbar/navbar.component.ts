import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


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
  constructor(private router: Router, private authService: AuthService) {}

  signInWithGoogle(): void {
    this.authService.signInWithGoogle()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error(error)
      });
  }

  searchGame() {
      this.router.navigate(['/search', this.searchInput]);
  }
}
