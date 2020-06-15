import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post.model';
import { Observable } from 'rxjs';
import PostRequest from '../post/request.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'http://localhost:8080/api/posts'
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.url);
  }

  createPost(request: PostRequest) {
    return this.http.post<PostRequest>(this.url, request);
  }

  getPost(id: string): Observable<PostModel> {
    return this.http.get<PostModel>(this.url+`/${id}`);
  }
}
