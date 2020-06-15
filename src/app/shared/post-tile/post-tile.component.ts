import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';
import { faComments, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  faComments:IconDefinition = faComments;

  @Input() posts: PostModel[] = [];
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToPost(id:string) {
    this.router.navigateByUrl('/view-post/' + id)
  }

}
