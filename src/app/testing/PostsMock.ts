import { Post } from '../posts/models/post';
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
}
