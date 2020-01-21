import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';

describe('PostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [PostsService]
  }));

  it('should be created', () => {
    const service: PostsService = TestBed.get(PostsService);
    expect(service).toBeTruthy();
  });
});
