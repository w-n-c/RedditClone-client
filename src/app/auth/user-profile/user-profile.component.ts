import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/shared/post.model';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { CommentService } from 'src/app/comment/comment.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {
    this.username = this.activatedRoute.snapshot.params.username;
    this.postService.getPostsByUsername(this.username).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    }, error => {
      throwError(error);
    });
    this.commentService.getCommentsByUsername(this.username).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    }, error => {
      throwError(error);
    });
  }

  ngOnInit(): void {
  }

}
