"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// controllers
var post_1 = require("../controllers/post");
var auth_1 = require("../middlewares/auth");
var router = express_1.default.Router();
router.post('/post/upload-image', post_1.uploadImageFile);
router.post('/post', auth_1.authMiddleware, post_1.createPost);
router.get('/posts', post_1.listPosts);
router.put('/click-count', post_1.clickCount);
router.get('/post/:slug', post_1.readPost);
router.put('/post/:slug', auth_1.authMiddleware, post_1.createPost);
router.delete('/post/:slug', auth_1.authMiddleware, post_1.deletePost);
exports.default = router;
