import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLoggedIn: boolean;
  username: string;
  searchControl = new FormControl();
  searchResults: any[];
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService,
    private http: HttpClient) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.isAdmin.subscribe((data: boolean) => this.isAdmin = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.isAdmin = this.authService.getAdmin();

    this.searchControl.valueChanges.pipe(
      switchMap((query) => {
        if (query.trim() === '') {
          this.clearSearchResults();
          return [];
        }
        return this.searchUsers(query);
      })
    ).subscribe((results) => {
      this.searchResults = results;
    });
  }

  goToUserProfileFromSearch(event: MatAutocompleteSelectedEvent) {
    let user = event.option.value;
    this.router.navigate(['/user'], {queryParams: {userId: user.userId, username: user.username}});
    this.searchControl.setValue('');
  }

  goToUserProfile() {
    this.router.navigate(['/user'], {queryParams: {userId: this.authService.getUserId(), username: this.username}});
  }

  public search(event: any) {
    if ((event.key === 'Enter' || event.keyCode == 13) && this.searchControl.value && this.searchControl.value.length >= 3) {
      this.router.navigate(['/search', this.searchControl.value]);
    }
  }

  clearSearchResults() {
    this.searchResults = [];
  }

  searchUsers(query: string): Observable<any[]> {
    return this.http.get<any[]>(`api/user/search?query=${query}`);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigateByUrl('/login');
  }
}
