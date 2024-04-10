import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { SubredditService } from 'src/app/services/subreddit.service';
import { PostModel } from 'src/app/shared/PostModel';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {
  posts: PostModel[];
  subredditId: string;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute) {
    this.subredditId = this.activateRoute.snapshot.params['id'];
    this.postService.getPostsBySubreddit(this.subredditId).subscribe(data => {
      this.posts = data;
    })
  }
  ngOnInit(): void {
  }
}
