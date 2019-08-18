/**
 * @file Creates a Class PostController that will initialize all the routes.
 * @this PostController
 * @exports PostController
 * 
 * @author Navneet Lal Gupta
 */

import express from 'express';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Post from './posts.interface';
import postModel from './posts.model';
import HttpException from '../exceptions/HttpException';

class PostController {
  public path = '/posts';
  public router = express.Router();

  /**
   * @constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(this.path, this.createPost);
  }

  /**
   * 
   * @param request 
   * @param response 
   * @param next 
   */
  getAllPosts = (request: Request, response: Response, next: NextFunction) => {
    postModel
      .find()
      .then(post => {
        if (post) response.status(200).send(post)
        else next(new HttpException(404, 'No item found'))
      })
  }

  /**
   * 
   * @param request 
   * @param response 
   * @param next 
   */
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

  /**
   * 
   * @param request 
   * @param response 
   * @param next 
   */
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
