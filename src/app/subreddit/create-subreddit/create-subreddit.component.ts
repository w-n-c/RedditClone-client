import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import SubredditModel from '../subreddit.model';
import { Router } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  form: FormGroup;
  model: SubredditModel;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');

  constructor(private router: Router, private subredditService: SubredditService) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
    this.model = {
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
  }

  discard(): void {
    this.router.navigateByUrl('/')
  }

  createSubreddit(): void {
    this.model.name = this.form.get('title').value
    this.model.description = this.form.get('description').value
    this.subredditService.createSubreddit(this.model).subscribe(() => {
      this.router.navigateByUrl('/list-subreddits')
    }, error => {
      throwError(error)
    })
  }
}
