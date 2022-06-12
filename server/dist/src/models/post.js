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
var T = __importStar(require("../types"));
var postSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    categories: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }],
    type: {
        type: String,
        default: T.PostType.ARTICLE
    },
    clicks: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});
// export post model
var PostModel = (0, mongoose_1.model)('Post', postSchema);
exports.default = PostModel;