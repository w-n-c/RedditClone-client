import { Injectable } from '@angular/core';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url = 'http://localhost:8080/api/comments'
  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${this.url}/by-post/${postId}`);
  }

  postComment(commentPayload: CommentPayload) {
    return this.httpClient.post(this.url, commentPayload);
  }
}
