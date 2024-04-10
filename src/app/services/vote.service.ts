import { Injectable } from '@angular/core';
import { VotePayload } from '../shared/vote-button/vote-payload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post('/api/votes/', votePayload);
  }
}
