import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { PostsMock } from '../testing/PostsMock';
import { Post } from './models/post';

describe('PostsService', () => {
  let service: PostsService;
  let httpTestingController: HttpTestingController;
  let postsMock: PostsMock;
  let postsMocked: Post[];
  const mainUrl = 'https://jsonplaceholder.typicode.com/posts';
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PostsService]
  }));

  beforeEach(() => {
    service = TestBed.get(PostsService);
    postsMock = new PostsMock();
  });

  describe('Init Status', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Posts Get All', () => {
    beforeEach(() => {
      postsMocked = postsMock.getPostsList(100);
      httpTestingController = TestBed.get(HttpTestingController);
      service.getPostsList();
    });

    afterEach(() => {
      httpTestingController.verify(); /* checks if requests are failed or cancelled */
    });

    it ('should call Get Method', () => {
      service.getPostsList().subscribe(() => {
        expect(req.request.method).toEqual('GET');
      });
      const req = httpTestingController.expectOne(mainUrl);
      req.flush(postsMocked);
    });

    it ('should return posts list as expected', () => {
      service.getPostsList().subscribe(posts => {
        expect(posts.length).toEqual(100);
      });
      const req = httpTestingController.expectOne(mainUrl);
      req.flush(postsMocked);
    });

    it ('should call Get Method with response type JSON', () => {
      service.getPostsList().subscribe(() => {
        expect(req.request.responseType).toEqual('json');
      });
      const req = httpTestingController.expectOne(mainUrl);
      req.flush(postsMocked);
    });

  });

  describe('Posts Update Post', () => {
    let onePost: Post;
    beforeEach(() => {
      onePost = postsMock.getOnePostWithId(1);
      httpTestingController = TestBed.get(HttpTestingController);
      service.updatePost(onePost);
    });

    afterEach(() => {
      httpTestingController.verify(); /* checks if requests are failed or cancelled */
    });

    it ('should call Put Method', () => {
      service.updatePost(onePost).subscribe(() => {
        expect(req.request.method).toEqual('PUT');
      });
      const req = httpTestingController.expectOne(mainUrl + '/' + onePost.id);
      req.flush(onePost);
    });

    it ('should return one post modified as expected', () => {
      service.getPostsList().subscribe(post => {
        expect(JSON.stringify(post)).toEqual(JSON.stringify(onePost));
      });
      const req = httpTestingController.expectOne(mainUrl);
      req.flush(onePost);
    });

    it ('should call Get Method with response type JSON', () => {
      service.getPostsList().subscribe(() => {
        expect(req.request.responseType).toEqual('json');
      });
      const req = httpTestingController.expectOne(mainUrl);
      req.flush(onePost);
    });

  });

  describe('Select Post setter and getter', () => {
    let onePost: Post;
    beforeEach(() => {
      onePost = postsMock.getOnePostWithId(1);
    });

    it ('should next selectedPostSubject when seSelectedPost is called', () => {
      const nextSpyForSelectedPost = spyOn(service['selectedPostSubject'], 'next');
      service.setSelectedPost(onePost);
      expect(service['selectedPostSubject'].next).toHaveBeenCalledWith(onePost);
    });

    it ('should return selectedPostSubject getSelectedPost is called', () => {
      service.setSelectedPost(onePost);
      service.getSelectedPost().subscribe(selectedPost => {
        expect(selectedPost).toEqual(onePost);
      });
    });

  });
});
