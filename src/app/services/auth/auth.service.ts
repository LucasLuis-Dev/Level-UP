import { Injectable } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { environment } from '../../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private auth = getAuth();
  private googleProvider = new GoogleAuthProvider();

  constructor() { }

  signInWithGoogle(): Promise<void> {
    return signInWithPopup(this.auth, this.googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        const user = result.user;
        console.log(user)
        environment.USER = user
        if (user.photoURL && user.displayName && user.email && user.uid) {
          environment.USER_PHOTO_URL = user.photoURL
          environment.USER_NAME = user.displayName
          environment.USER_EMAIL = user.email
        }
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