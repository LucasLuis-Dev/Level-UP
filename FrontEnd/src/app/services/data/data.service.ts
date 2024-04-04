import { Injectable } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { environment } from '../../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})


export class DataService {
  
  
}