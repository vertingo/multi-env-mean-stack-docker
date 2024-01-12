import { environment } from 'src/environments/environment';
import { User } from './../models/userResponse';
import { Token, payloadToken } from './../models/token';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMessageComponent } from 'src/app/components/shared/alert-message/alert-message.component'
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //url api
  private apiUrl = environment.apiUrl


  private tokenSubject: BehaviorSubject<Token>;
  public token: Observable<Token>;

  private user_infoSubject: BehaviorSubject<User>;
  public user_info: Observable<User>;

  constructor(private http: HttpClient, public router: Router, public snackBar: MatSnackBar) {

    this.tokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('token')));
    this.token = this.tokenSubject.asObservable();

    this.user_infoSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user_info = this.user_infoSubject.asObservable();
  }

  //get token
  public get tokenValue(): Token {
    return this.tokenSubject.value;
  }

  //get user Info
  public get userValue(): User {
    return this.user_infoSubject.value;
  }

  // login get token on login 
  signIn(credentials): Observable<Token> {

    return this.http.post<Token>(`${this.apiUrl}/api/auth/login`, credentials)
      .pipe(map(token => {
        // store jwt token in local storage 
        localStorage.setItem('token', JSON.stringify(token));
        this.tokenSubject.next(token);
        return token;
      }));
  }


  // inscription get token on login 
  signUP(data): Observable<Token> {

    return this.http.post<Token>(`${this.apiUrl}/api/auth/signup`, data)
      .pipe(map(token => {
        // store jwt token in local storage 
        localStorage.setItem('token', JSON.stringify(token));
        this.tokenSubject.next(token);
        return token;
      }));
  }


// mot de passe oublie 
lostPassword(email): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/api/auth/forgot-password`, email)
}


// réinitialiser mot de passe  
resetPassword(data): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/api/auth/reset-password`, data)
}


  // isLoggedIn
  public isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  //logout
  public logout() {
    // remove token from local storage 
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    // remove user from local storage 
    localStorage.removeItem('user');
    this.user_infoSubject.next(null);
    this.router.navigate(['/login']);
  }
   

  // get info user 
  getUserInfo(): Observable<User> {
    
    let decodedToken : payloadToken = jwt_decode(this.tokenSubject.value.token); 
    return this.http.get<User>(`${this.apiUrl}/api/users/${decodedToken.userId}`)
      .pipe(map(user => {
        // store user info in local storage 
        localStorage.setItem('user', JSON.stringify(user));
        this.user_infoSubject.next(user);
        return user; 
      }));
  }


  openSnackBar(message: string) {
    this.snackBar.openFromComponent(AlertMessageComponent, {
      data: message,
      panelClass: ['blue-snackbar'],
      duration: 10000
    });
  }

}
