import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../post.model';
import { faArrowUp, faArrowDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { VoteService } from '../vote.service';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {
  faArrowUp:IconDefinition = faArrowUp;
  faArrowDown:IconDefinition = faArrowDown;
  
  @Input() post: PostModel;
  payload: VotePayload;

  constructor(
    private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastr: ToastrService
  ) {
    this.payload = {
      voteType: undefined,
      postId: undefined
    }
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  downvotePost() {
    this.payload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  upvotePost() {
    this.payload.voteType = VoteType.UPVOTE;
  }
  private vote() {
    this.payload.postId = this.post.id;
    this.voteService.vote(this.payload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    })
  }

  private updateVoteDetails() {
    this.postService.getPost(String(this.post.id)).subscribe(post => {
      this.post = post;
    })
  }

}
