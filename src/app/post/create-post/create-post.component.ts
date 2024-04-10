import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePostPayload } from './create-post.payload';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { SubredditService } from 'src/app/services/subreddit.service';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel>;
  files: File[] = [];

  constructor(private router: Router, private postService: PostService,
    private subredditService: SubredditService, private authService: AuthService,private toastr: ToastrService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: '',
      username: this.authService.getUserName()
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    let file: any = this.files[0];
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('postName', this.createPostForm.get('postName')?.value);
    formData.append('subredditName', this.createPostForm.get('subredditName')?.value);
    formData.append('url', this.createPostForm.get('url')?.value);
    formData.append('description', this.createPostForm.get('description')?.value);
    formData.append('username', this.postPayload.username);

    this.postService.createPost(formData).subscribe((data) => {
      this.router.navigateByUrl('/home');
      this.toastr.success("Post created Sucessfully!");
      }, error => {
        this.toastr.error("Post creation failed");
        throwError(error);
    })
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    if(this.files.length > 1){
      this.replaceFile();
    }
  }
  
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  replaceFile(){
    this.files.splice(0, 1);
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
