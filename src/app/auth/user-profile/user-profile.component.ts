import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentPayload } from 'src/app/services/comment.payload';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from 'src/app/shared/PostModel';
import { AuthService } from '../shared/auth.service';
import { faMinus, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;
  followership: any;
  canFollow: boolean;
  userId: number;
  faPencil = faPencil;
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService, private authService: AuthService,
    private http: HttpClient) {

      this.activatedRoute.queryParams.subscribe(() => {
        this.name = this.activatedRoute.snapshot.queryParams['username'];
        this.userId = this.activatedRoute.snapshot.queryParams['userId'];
      
        this.updateUserData();
      });
  }

  ngOnInit(): void {
  }

  updateUserData() {
    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
  
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  
    let isCurrentUser: boolean = this.userId == this.authService.getUserId();
    this.canFollow = this.authService.isLoggedIn() && !isCurrentUser;
    this.getFollowership();
  }

  getFollowership() {
    if (this.canFollow) {
      const params = new HttpParams()
      .set('fromUserId', this.authService.getUserId())
      .set('toUserId', this.userId);
      this.http.get("/api/follow", {params}).subscribe(data => {
        this.followership = data;
      });
    }
    else {
      this.followership = null;
    }
  }

  followUser() {
    const params = new HttpParams()
   .set('fromUserId', this.authService.getUserId())
   .set('toUserId', this.userId);
   this.http.post("/api/follow", null, {params}).subscribe(data => {
      this.followership = data;
   });
  }

  unFollowUser() {
    const params = new HttpParams()
   .set('followershipId', this.followership.followershipId);
    this.http.delete("/api/follow", {params}).subscribe(data => {
      this.followership = null;
    })
  }

  public moveToPosts(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

}
