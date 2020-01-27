import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListComponent } from './posts-list.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsService } from '../posts.service';
import { PostsMock } from 'src/app/testing/PostsMock';
import { IntructionsHelper } from 'src/app/testing/InstructionsHelper';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let postServiceMock: any;
  let postsMock: PostsMock;
  let location: Location;
  let htmlUtil: IntructionsHelper<PostsListComponent>;
  beforeEach(async(() => {
    postServiceMock = jasmine.createSpyObj('PostsService', ['getPostsList', 'setSelectedPost']);
    TestBed.configureTestingModule({
      declarations: [ PostsListComponent, MockComponent ],
      imports: [RouterTestingModule.withRoutes([
        {path: 'manage', component: MockComponent}
      ])],
      providers: [
        {provide: PostsService, useValue: postServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Init status', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be in path /', () => {
      location = TestBed.get(Location);
      expect(location.path()).toBe('');
    });

  });

  describe('HTML DOM', () => {
    beforeEach(() => {
      postsMock = new PostsMock();
      htmlUtil = new IntructionsHelper(fixture);
      postServiceMock.getPostsList.and.returnValue(of(postsMock.getPostsList(100)));
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should show posts title', () => {
      expect(htmlUtil.singleText('h3.posts-title')).toBe('Posts list');
    });

    it('should show table header', () => {
      const headerTest = 'id' + 'User' + 'Title' + 'Post';
      expect(htmlUtil.singleText('thead tr')).toBe(headerTest);
    });

    it('should show table list according to posts', () => {
      expect(htmlUtil.count('tbody tr.post-row')).toBe(100);
    });

    it('should execute managePost when clicking on post line ', () => {
      spyOn(component, 'managePost');
      htmlUtil.clickEvent('tbody tr.post-row:first-child');
      fixture.detectChanges();
      const selecteElem = postsMock.getPostsList(100)[0];
      expect(component.managePost).toHaveBeenCalledWith(selecteElem);
    });

  });

  describe('Manage posts', () => {
    let router: Router;
    beforeEach(() => {
      postsMock = new PostsMock();
      router = TestBed.get(Router);
    });
    it('should call getpostslist from service when getPosts is called', () => {
      component.getPosts();
      expect(postServiceMock.getPostsList).toHaveBeenCalled();
    });

    it('should get posts from Service', () => {
      postServiceMock.getPostsList.and.returnValue(of(postsMock.getPostsList(100)));
      component.getPosts();
      component.posts.subscribe(posts => {
        expect(posts).toEqual(postsMock.getPostsList(100));
      });
    });

    it('should navigate to manage page when managePost is called', () => {
      spyOn(router, 'navigateByUrl');
      const onePost = postsMock.getOnePostWithId(1);
      component.managePost(onePost);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/manage');
    });

    it('should set selected post in the service when managePost is called', () => {
      const onePost = postsMock.getOnePostWithId(1);
      component.managePost(onePost);
      expect(postServiceMock.setSelectedPost).toHaveBeenCalledWith(onePost);
    });

  });
});

@Component({
  template: '<span></span>'
})
class MockComponent {}
