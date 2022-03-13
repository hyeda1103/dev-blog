import mongoose, {
  Schema, Document, model,
} from "mongoose";
import * as crypto from 'crypto';

import { User } from '../types'

interface UserDocument extends User, Document {
  makeSalt: () => number
  encryptPassword: (password: string) => string
  authenticate: (plainText: string) => boolean
}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    trim: true,
    required: true,
    max: 12,
    unique: true,
    index: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: String,
    default: 'subscriber',
  },
  resetPasswordLink: {
    data: String,
    default: '',
  }
}, {
  timestamps: true
});

// virtual fields
userSchema.virtual('password')
  .set(function (this: any, password: string) {
    // create temp variable called _password
    this._password = password
    // generate salt
    this.salt = this.makeSalt()
    // encrypt password 
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function (this: any) {
    return this._password
  })
// methods > authenticate, encryptPassword, makeSalt
userSchema.methods = {
  authenticate: function (plainText: string) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function (password: string) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (error) {
      return ''
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random())
  }
}

// export user model
const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
