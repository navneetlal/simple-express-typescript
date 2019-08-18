/***
 * @author Navneet Lal  Gupta
 * @description This is entry point of the application.
 * 
 */

import 'dotenv/config';
import App from './app';
import PostsController from './posts/posts.controller';

const app = new App(
  [
    new PostsController(),
  ],
  5000,
);
 
app.listen();