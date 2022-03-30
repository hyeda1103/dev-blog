import mongoose, {
  Schema, model,
} from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    index: true
  },
  image: {
    url: String,
    key: String,
  },
  content: {
    type: {},
    min: 20,
    max: 2000000
  }, 
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

// export category model
const CategoryModel = model('Category', categorySchema);

export default CategoryModel;