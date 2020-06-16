import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: string;
  post: PostModel;
  form: FormGroup;
  payload: CommentPayload;
  comments: CommentPayload[];

  constructor(private commentService: CommentService, private postService: PostService, private activatedRoute: ActivatedRoute) {
    this.postId = this.activatedRoute.snapshot.params.id
    this.form = new FormGroup({
      text: new FormControl('', Validators.required)
    })
    this.payload = {
      text: '',
      postId: this.postId
    }
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }
  private getPostById() {
      this.postService.getPost(this.postId).subscribe(data => {
      this.post = data
    }, error => {
      throwError(error)
    })
  }
  postComment() {
    this.payload.text = this.form.get('text').value;
    this.commentService.postComment(this.payload).subscribe(() => {
      this.form.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error)
    })
  }
  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error)
    })
  }

}
