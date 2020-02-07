import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from './models/post';

@Injectable()
export class PostsService {
  private selectedPostSubject = new BehaviorSubject<Post>(null);
  private mainUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) {
  }

  getPostsList(): Observable<Post[]> {
    return this.http.get<Post[]>(this.mainUrl + 'posts');
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.mainUrl + 'posts/' + post.id, post);
  }

  // getCommentsOfPostId(id: number): Observable<Comment[]> {
  //   return this.http.get<Comment[]>(this.mainUrl + 'comments?postId=' + id);
  // }

  setSelectedPost(post: Post) {
    this.selectedPostSubject.next(post);
  }

  getSelectedPost(): BehaviorSubject<Post> {
    return this.selectedPostSubject;
  }
}
