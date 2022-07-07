"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
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
