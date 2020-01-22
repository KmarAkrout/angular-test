import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListComponent } from './posts-list.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsService } from '../posts.service';

describe('postsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let postServiceMock: any;
  beforeEach(async(() => {
    postServiceMock = jasmine.createSpyObj('PostsService', ['getPostsList']);
    postServiceMock.getPostsList.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ PostsListComponent ],
      imports: [RouterTestingModule],
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
