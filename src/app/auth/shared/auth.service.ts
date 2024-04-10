import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() isAdmin: EventEmitter<boolean> = new EventEmitter();
  user: SocialUser | null;

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private authService: SocialAuthService,
    private router: Router) { 
      this.user = null;
      this.authService.authState.subscribe((user: SocialUser) => {
        console.log(user);
        this.user = user;
        this.localStorage.store("username", this.user?.email);
        this.username.emit(user?.email);
        if (user) {
          this.router.navigateByUrl('');
          this.loggedIn.emit(true);
        }
      });
    }

    public signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    public signOut(): void {
      this.authService.signOut();
    }

    signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
      return this.httpClient.post('/api/auth/signup', signupRequestPayload, { responseType: 'text' });
    }

    login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
      return this.httpClient.post<LoginResponse>('/api/auth/login',
        loginRequestPayload).pipe(map(data => {
          this.localStorage.store('userid', data.userId);
          this.localStorage.store('username', data.username);
          this.localStorage.store('email', data.email);
          this.localStorage.store('admin', data.admin);
          
          this.isAdmin.emit(data.admin);
          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        }));
    }

    getJwtToken() {
      return this.localStorage.retrieve('authenticationToken');
    }

    getAdmin() {
      return this.localStorage.retrieve('admin');
    }

    logout() {
      // this.httpClient.post('http://localhost:8080/api/auth/logout', Payload,
      //   { responseType: 'text' })
      //   .subscribe(data => {
      //     console.log(data);
      //   }, error => {
      //     throwError(error);
      //   })
      this.localStorage.clear('admin');
      this.localStorage.clear('username');
      this.localStorage.clear('email');
      this.localStorage.clear('userid');
    }

    getUserId() {
      return this.localStorage.retrieve('userid');
    }

    getUserName() {
      return this.localStorage.retrieve('username');
    }
    getRefreshToken() {
      return this.localStorage.retrieve('refreshToken');
    }

    isLoggedIn(): boolean {
      return this.getUserName() != null;
    }
    
}
