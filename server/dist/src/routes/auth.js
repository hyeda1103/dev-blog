"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// controllers
var auth_1 = require("../controllers/auth");
var router = express_1.default.Router();
router.post('/register', auth_1.register);
router.post('/register/activate', auth_1.registerActivate);
router.post('/login', auth_1.login);
router.put('/forgot-password', auth_1.forgotPassword);
router.put('/reset-password', auth_1.resetPassword);
exports.default = router;
