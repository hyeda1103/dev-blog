"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.readCategory = exports.listCategory = exports.createCategory = void 0;
var category_1 = __importDefault(require("../models/category"));
var post_1 = __importDefault(require("../models/post"));
var slugify_1 = __importDefault(require("../helpers/slugify"));
var createCategory = function (req, res) {
    var name = req.body.name;
    var slug = (0, slugify_1.default)(name);
    var category = new category_1.default({ name: name, slug: slug });
    category.postedBy = req.profile._id;
    // Save to DB
    category.save(function (err, success) {
        if (err) {
            return res.status(400).json({
                error: '데이터베이스에 카테고리를 저장하지 못하였습니다'
            });
        }
        return res.json(success);
    });
};
exports.createCategory = createCategory;
var listCategory = function (req, res) {
    category_1.default.find({}).exec(function (err, data) {
        if (err) {
            return res.status(400).json({
                error: '카테고리를 로드할 수 없습니다'
            });
        }
        res.json(data);
    });
};
exports.listCategory = listCategory;
var readCategory = function (req, res) {
    var slug = req.params.slug;
    var _a = req.body, limit = _a.limit, skip = _a.skip;
    console.log(slug);
    var limits = limit ? parseInt(limit) : 10;
    var skips = skip ? parseInt(skip) : 0;
    category_1.default.findOne({ slug: slug })
        .populate('postedBy', '_id name username')
        .exec(function (err, category) {
        if (err) {
            return res.status(400).json({
                error: '카테고리를 로드할 수 없습니다'
            });
        }
        post_1.default.find({ categories: category })
            .populate('postedBy', '_id name username')
            .populate('categories', 'name slug')
            .sort({ createdAt: -1 })
            .limit(limits)
            .skip(skips)
            .exec(function (err, posts) {
            if (err) {
                return res.status(400).json({
                    error: '카테고리에 해당하는 링크를 로드할 수 없습니다'
                });
            }
            res.json({ category: category, posts: posts });
        });
    });
};
exports.readCategory = readCategory;
var deleteCategory = function (req, res) {
};
exports.deleteCategory = deleteCategory;
