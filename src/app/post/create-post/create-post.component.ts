import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import PostRequest from '../request.payload';
import SubredditModel from 'src/app/subreddit/subreddit.model';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  form: FormGroup;
  payload: PostRequest;
  subreddits: SubredditModel[];
  constructor(private router: Router, private postService: PostService, private subredditService: SubredditService) {
    this.payload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    })
  }

  createPost() {
    this.payload.postName = this.form.get('postName').value
    this.payload.subredditName = this.form.get('subredditName').value
    this.payload.url = this.form.get('url').value
    this.payload.description = this.form.get('description').value

    this.postService.createPost(this.payload).subscribe(() => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}
