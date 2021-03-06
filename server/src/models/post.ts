import mongoose, {
  Schema, model,
} from "mongoose";
import * as T from '../types'

const postSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    max: 256
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  },
  startDate: {
    type: String,
    
  },
  endDate: {
    type: String,
  },
  status: {
    type: String,
  },
  webLink: {
    type: String,
    trim: true,
    max: 256,
  },
  githubLink: {
    type: String,
    trim: true,
    max: 256,
  },
  description: {
    type: String,
    required: true
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  type: {
    type: String,
  },
  clicks: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
})

// export post model
const PostModel = model('Post', postSchema);

export default PostModel; 
