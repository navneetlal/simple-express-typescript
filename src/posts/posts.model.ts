/**
 * @description Defines the model and schema to used by mongoose.
 * @exports postModel
 */
import mongoose from 'mongoose';

import Post from './posts.interface';

const postSchema = new mongoose.Schema({
  author: String,
  content: String,
  title: String
})

const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);

export default postModel;