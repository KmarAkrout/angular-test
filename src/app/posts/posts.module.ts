import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsEditComponent } from './posts-edit/posts-edit.component';
import { PostsComponent } from './posts.component';
import { PostsService } from './posts.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [PostsListComponent, PostsEditComponent, PostsComponent],
  imports: [
    CommonModule, HttpClientModule, PostsRoutingModule, FormsModule
  ],
  providers: [PostsService]
})
export class PostsModule {
}
