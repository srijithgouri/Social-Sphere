import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    const params = new HttpParams()
   .set('postId', postId)
    return this.httpClient.get<CommentPayload[]>('/api/comments', {params});
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>('/api/comments/', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    const params = new HttpParams()
   .set('userName', name);
    return this.httpClient.get<CommentPayload[]>('/api/comments', {params});
  }
}