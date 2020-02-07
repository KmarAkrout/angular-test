import { Post } from '../posts/models/post';
import { Comment } from '../posts/models/comment';

export class PostsMock {
  getPostsList(length: number): Post[] {
    const posts: Post[] = [];
    for (let i = 0; i < length; i++) {
      posts.push({
        id: i + 1,
        userId: i + 2,
        title: 'title test ' + i,
        body: 'post body ' + i
      });
    }
    return posts;
  }

  getOnePostWithId(idToGet: number): Post {
    return {
      id: idToGet,
      userId: 2,
      title: 'title test ',
      body: 'post body '
    };
  }

  getCommentsOfPostId(id: number): Comment[] {
    return [
      {
        postId: id,
        id: 1,
        name: 'comment',
        email: 'mail@mail.fr ',
        body: 'laudantium enim quasi est quidem magnam voluptate ips'
      }, {
        postId: id,
        id: 2,
        name: 'comment2',
        email: 'mail@ma2il.fr ',
        body: '222m enim quasi est quidem magnam voluptate ips'
      }
    ];
  }
}
