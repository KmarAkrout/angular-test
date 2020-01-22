import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from './models/post';

@Injectable()
export class PostsService {
  private selectedPostSubject = new BehaviorSubject<Post>(null);
  constructor(private http: HttpClient) { }

  getPostsList(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>('https://jsonplaceholder.typicode.com/posts/' + post.id, post);
  }

  setSelectedPost(post: Post) {
    this.selectedPostSubject.next(post);
  }

  getSelectedPost(): BehaviorSubject<Post> {
    return this.selectedPostSubject;
  }
}
