import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../enviroments/enviroment';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './navbar-user-profile.component.scss', './navbar-responsive.component.scss']
})
export class NavbarComponent {
  searchForm: FormGroup;
  userLogged: boolean = false;
  displayUserProfile: boolean = false;
  initialized: boolean = false;
  userPhoto: string = '';
  userEmail: string = '';
  userName: string = '';

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchInput: ['']
    });
  }
 

  signInWithGoogle(): void {
    this.authService.signInWithGoogle()
      .then(() => {
        this.router.navigate(['/']);
        if (environment.USER && Object.keys(environment.USER).length > 0) {
          this.userPhoto = environment.USER_PHOTO_URL
          this.userEmail = environment.USER_EMAIL
          this.userName = environment.USER_NAME
          this.userLogged = true

        }
       
      })
      .catch((error) => {
        console.error(error)
      });
  }

  searchGame() {
    const searchValue = this.searchForm.get('searchInput')?.value;
    this.router.navigate(['/search', searchValue]);
  }

  logoutUser():void {
    this.authService.signOutUser()
    this.userLogged = false
    this.router.navigate(['/'])
  }

  toogleUserProfile(): void {
    this.initialized = true;
    this.displayUserProfile = !this.displayUserProfile;
  }
}
