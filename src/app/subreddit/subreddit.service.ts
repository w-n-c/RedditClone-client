import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import SubredditModel from './subreddit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  url = 'http://localhost:8080/api/subreddit'
  constructor(private http: HttpClient) { }
  
  getAllSubreddits(): Observable<SubredditModel[]> {
    return this.http.get<SubredditModel[]>(this.url);
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>(this.url, subredditModel);
  }
}
