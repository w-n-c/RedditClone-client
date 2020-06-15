import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../post.model';
import { faArrowUp, faArrowDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {
  faArrowUp:IconDefinition = faArrowUp;
  faArrowDown:IconDefinition = faArrowDown;

  @Input() post: PostModel;
  constructor() { }

  ngOnInit(): void {
  }

}
