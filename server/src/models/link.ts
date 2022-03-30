import mongoose, {
  Schema, model,
} from "mongoose";

const linkSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    max: 256
  },
  url: {
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
    default: 'Free'
  },
  medium: {
    type: String,
    default: 'Video'
  },
  clicks: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
})

// export link model
const LinkModel = model('Link', linkSchema);

export default LinkModel;