import express from 'express';
import Post from './posts.interface';
import postModel from './posts.model';

class PostController {
  public path = '/posts';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(this.path, this.createPost);
  }

  getAllPosts = (request: express.Request, response: express.Response) => {
    postModel
      .find()
      .then(post => response.status(200).send(post))
      .catch(err => {
        console.log('Error getting document: ', err);
        response.status(404).json({ message: 'No document found' });
      })
  }

  getPostById = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    postModel
      .findById(id)
      .then(post => response.status(200).send(post))
      .catch(err => {
        console.log('Error getting document: ', err);
        response.status(404).json({ message: 'No document found' });
      })
  }

  createPost = (request: express.Request, response: express.Response) => {
    const post: Post = request.body;
    postModel
      .create(post)
      .then(res => response.status(200).send(res))
      .catch(err => {
        console.log('Error creating document: ', err);
        response.status(500).json({ message: 'Internal Error' })
      })
  }
}

export default PostController;