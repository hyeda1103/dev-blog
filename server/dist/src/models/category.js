"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
// export user model
var CategoryModel = (0, mongoose_1.model)('Category', categorySchema);
exports.default = CategoryModel;
