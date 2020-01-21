import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  public posts: Observable<Post[]>;
  constructor(private postservice: PostsService, private router: Router) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.posts = this.postservice.getpostsList();
  }

  managePost(post) {
    this.router.navigateByUrl('/manage');
    this.postservice.setSelectedPost(post);
  }
}
