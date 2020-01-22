import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsEditComponent } from './posts-edit.component';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../posts.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('postsEditComponent', () => {
  let component: PostsEditComponent;
  let fixture: ComponentFixture<PostsEditComponent>;
  let postServiceMock: any;
  beforeEach(async(() => {
    postServiceMock = jasmine.createSpyObj('PostsService', ['getSelectedPost']);
    postServiceMock.getSelectedPost.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ PostsEditComponent ],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {provide: PostsService, useValue: postServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class PostServiceStub {}
