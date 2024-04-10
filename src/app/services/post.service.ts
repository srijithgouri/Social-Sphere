import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../shared/PostModel';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('/api/posts/' + id);
  }

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('/api/posts/');
  }

  createPost(postPayload: FormData): Observable<any> {
    return this.http.post('/api/posts/', postPayload);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    const params = new HttpParams()
    .set('username', name);
    return this.http.get<PostModel[]>('/api/posts/', {params});
  }

  getFeedByUser(userId: string): Observable<PostModel[]> {
    const params = new HttpParams()
    .set('userId', userId);
    return this.http.get<PostModel[]>('/api/posts/feed', {params});
  }

  getPostsBySubreddit(subId: string): Observable<PostModel[]> {
    const params = new HttpParams()
    .set('subredditId', subId);
    return this.http.get<PostModel[]>('/api/posts', {params});
  }
}
