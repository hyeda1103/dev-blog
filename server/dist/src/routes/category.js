"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// controllers
var category_1 = require("../controllers/category");
var auth_1 = require("../middlewares/auth");
var router = express_1.default.Router();
router.post('/category', auth_1.adminMiddleware, category_1.createCategory);
router.get('/categories', category_1.listCategory);
router.post('/category/:slug', category_1.readCategory);
router.put('/category/:slug', auth_1.adminMiddleware, category_1.createCategory);
router.delete('/category/:slug', auth_1.adminMiddleware, category_1.deleteCategory);
exports.default = router;
