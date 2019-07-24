import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorhandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log( `server started at http://localhost:${this.port}`);
    })
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeErrorhandling(){
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private connectToTheDatabase(){
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
      MONGODB_DATABASE
    } = process.env;
    mongoose.connect(`mongodb://${MONGO_PATH}/${MONGODB_DATABASE}`, {
      useNewUrlParser: true,
      auth: {
        user: MONGO_USER || '',
        password: MONGO_PASSWORD || ''
      }
    }).catch(err => console.log('Error connecting: ', err))
  }
}

export default App;