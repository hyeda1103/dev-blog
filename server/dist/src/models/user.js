"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var crypto = __importStar(require("crypto"));
var userSchema = new mongoose_1.Schema({
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
    .set(function (password) {
    // create temp variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encrypt password 
    this.hashed_password = this.encryptPassword(password);
})
    .get(function () {
    return this._password;
});
// methods > authenticate, encryptPassword, makeSalt
userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password)
            return '';
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }
        catch (error) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random());
    }
};
// export user model
var UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
