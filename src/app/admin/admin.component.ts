import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any[];
  faTrash = faTrash;

  constructor(private http: HttpClient) {
    this.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  ngOnInit(): void {
  }

  getUsers(): Observable<any> {
    return this.http.get('/api/auth/getAllUsers');
  }

  deleteUser(userId: number) {
    this.http.delete('/api/auth/user/delete/'+userId).subscribe(data => {

    });
  }
}
