import express from 'express';
import Post from './posts.interface';

class PostController {
  public path = '/posts';
  public router = express.Router();

  private posts: Post[] = [
    {
      author: 'Navneet',
      content: 'Hello World',
      title: 'Program'
    }
  ]

  constructor(){
    this.initializeRoutes();
  }

  public initializeRoutes(){
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createPost);
  }

  getAllPosts = (request: express.Request, response: express.Response) => {
    response.send(this.posts)
  }

  createPost = (request: express.Request, response: express.Response) => {
    const post: Post = request.body;
    this.posts.push(post);
    response.send(post);
  }
}

export default PostController;