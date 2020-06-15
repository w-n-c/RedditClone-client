import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';
import { faComments, IconDefinition } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  faComments:IconDefinition = faComments;

  posts: PostModel[] = [];
  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnInit(): void {
  }

}
