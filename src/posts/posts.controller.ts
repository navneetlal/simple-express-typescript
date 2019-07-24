import express from 'express';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Post from './posts.interface';
import postModel from './posts.model';
import HttpException from '../exceptions/HttpException';

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

  getAllPosts = (request: Request, response: Response, next: NextFunction) => {
    postModel
      .find()
      .then(post => {
        if (post) response.status(200).send(post)
        else next(new HttpException(404, 'No item found'))
      })
  }

  getPostById = (request: Request, response: Response, next: NextFunction) => {
    const id = new mongoose.Types.ObjectId(request.params.id);
    postModel
      .findById(id)
      .then(post => {
        console.log("------->",post)
        if (post) response.status(200).send(post)
        else next(new HttpException(404, 'Post not found'))
      })
  }

  createPost = (request: Request, response: Response, next: NextFunction) => {
    const post: Post = request.body;
    postModel
      .create(post)
      .then(res => {
        if (res) response.status(200).send(res)
        else next(new HttpException(500, 'Internal server error'))
      })
  }
}

export default PostController;