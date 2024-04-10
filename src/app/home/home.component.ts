import { Component } from '@angular/core';
import { PostModel } from '../shared/PostModel';
import { PostService } from '../services/post.service';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts: Array<PostModel> = [];

  constructor(private postService: PostService, private authService: AuthService) {
    if (authService.isLoggedIn()) {
      this.loadPosts('home');
    }
    else {
      this.loadPosts('all');
    }
  }

  loadPosts(tab: string): void {
    if (tab === 'home') {
      this.postService.getFeedByUser(this.authService.getUserId()).subscribe(post => {
        this.posts = post;
      });
    } else if (tab === 'all') {
      this.postService.getAllPosts().subscribe(posts => {
        this.posts = posts;
      });
    }
  }
}
