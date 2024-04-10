import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxCroppedEvent, NgxPhotoEditorService} from "ngx-photo-editor";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private applyBtn: string;
  private cancelBtn: string;
  output: NgxCroppedEvent;
  public noChanges: boolean = true;
  user: User = new User();

  constructor(private fileEditorService: NgxPhotoEditorService, private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient,
    private toastr: ToastrService) {
      this.user.userId = this.activatedRoute.snapshot.queryParams['userId'];
      this.user.username = this.activatedRoute.snapshot.queryParams['username'];
  }

  ngOnInit(): void {
  }

  public editProfile() {
    this.updateProfile().subscribe(data => {
      this.toastr.success('Profile updated successfully');
      this.router.navigateByUrl('');
    },
    error => {
      this.toastr.error('Profile updation failed');
    });
  }

  private updateProfile() {
    return this.http.post('/api/auth/updateUser/', this.user);
  }
  
}

class User {
  userId: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  photo: string = '';
}
