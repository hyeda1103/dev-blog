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
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

// export user model
const CategoryModel = model('Category', categorySchema);

export default CategoryModel;