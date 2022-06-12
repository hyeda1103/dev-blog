"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageFile = exports.clickCount = exports.deletePost = exports.readPost = exports.listPosts = exports.createPost = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var uuid_1 = require("uuid");
var post_1 = __importDefault(require("../models/post"));
var slugify_1 = __importDefault(require("../helpers/slugify"));
var createPost = function (req, res) {
    var _a = req.body, title = _a.title, webLink = _a.webLink, githubLink = _a.githubLink, description = _a.description, categories = _a.categories, type = _a.type, status = _a.status, startDate = _a.startDate, endDate = _a.endDate;
    var slug = (0, slugify_1.default)(title);
    var post = new post_1.default({
        title: title,
        slug: slug,
        webLink: webLink,
        githubLink: githubLink,
        description: description,
        categories: categories,
        type: type,
        status: status,
        startDate: startDate,
        endDate: endDate
    });
    post.postedBy = req.profile._id;
    post.save(function (err, data) {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: '이미 등록된 포스트입니다'
            });
        }
        res.json(data);
    });
};
exports.createPost = createPost;
var listPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var keyword, posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keyword = req.query.keyword
                    ? {
                        $or: [
                            {
                                title: {
                                    $regex: req.query.keyword,
                                    $options: 'i',
                                },
                            },
                            {
                                description: {
                                    $regex: req.query.keyword,
                                    $options: 'i',
                                },
                            },
                        ],
                    }
                    : {};
                return [4 /*yield*/, post_1.default.find(__assign({}, keyword))
                        .populate('categories', 'name slug')
                        .sort({ createdAt: -1 })];
            case 1:
                posts = _a.sent();
                if (posts.length) {
                    res.json(posts);
                }
                else {
                    res.status(400).json({
                        error: "".concat(req.query.keyword, "\uC5D0 \uB300\uD55C \uD3EC\uC2A4\uD2B8\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4")
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.listPosts = listPosts;
var readPost = function (req, res) {
    var slug = req.params.slug;
    post_1.default.findOne({ slug: slug })
        .populate('categories', 'name')
        .exec(function (err, data) {
        if (err) {
            console.error(err);
            return res.status(400).json({
                error: '해당 포스트는 존재하지 않습니다'
            });
        }
        res.json(data);
    });
};
exports.readPost = readPost;
var deletePost = function (req, res) {
};
exports.deletePost = deletePost;
var clickCount = function (req, res) {
    var postId = req.body.postId;
    post_1.default.findByIdAndUpdate(postId, {
        $inc: { clicks: 1 }
    }, {
        upsert: true, new: true
    }).exec(function (err, result) {
        if (err) {
            console.error(err);
            return res.status(400).json({
                error: '클릭수를 업데이트할 수 없습니다'
            });
        }
        res.json(result);
    });
};
exports.clickCount = clickCount;
var uploadImageFile = function (req, res) {
    var image = req.body.image;
    // image data
    var base64Data = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    var type = image.split(';')[0].split('/')[1];
    // s3
    var s3 = new aws_sdk_1.default.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });
    // Upload image to s3
    var params = {
        Bucket: 'dev-blog-for-ten',
        Key: "post/".concat((0, uuid_1.v4)(), ".").concat(type),
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: "image/".concat(type)
    };
    s3.upload(params, function (err, data) {
        if (err) {
            return res.status(400).json({
                error: 'S3 업로드에 실패하였습니다'
            });
        }
        console.log('AWS 업로드 RES DATA', data);
        return res.json(data.Location);
    });
};
exports.uploadImageFile = uploadImageFile;
