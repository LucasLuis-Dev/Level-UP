import { Injectable } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { environment } from '../../../enviroments/enviroment';
import { UserService } from '../user/user.service';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private auth = getAuth();
  private googleProvider = new GoogleAuthProvider();

  constructor(private userService: UserService) { }

  signInWithGoogle(): Promise<void> {
    return signInWithPopup(this.auth, this.googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        const user = result.user;
        environment.USER = user
        if (user.photoURL && user.displayName && user.email && user.uid) {
          environment.USER_PHOTO_URL = user.photoURL
          environment.USER_NAME = user.displayName
          environment.USER_EMAIL = user.email
          environment.USER_UID = user.uid
        }  
        this.userService.createUser(user.uid).pipe(
          catchError(error => {
            console.error('Erro ao criar usuário:', error);
            return throwError(error);
          })
        ).subscribe();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  

  signOutUser(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        environment.USER = {}
      })
      .catch((error) => {
        
      });
  }
  
}