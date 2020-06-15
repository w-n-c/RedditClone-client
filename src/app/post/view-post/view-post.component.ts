import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: string;
  post: PostModel;

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {
    this.postId = this.activatedRoute.snapshot.params.id
    this.post = {
      id: Number(this.postId),
      postName: '',
      url: '',
      description: '',
      voteCount: 0,
      username: '',
      subredditName: '',
      commentCount: '',
      duration: ''
    }
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data
    }, error => {
      throwError(error)
    })
  }

  ngOnInit(): void {
  }

}
