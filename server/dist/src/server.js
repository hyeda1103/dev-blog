"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
// routes
var auth_1 = __importDefault(require("./routes/auth"));
var user_1 = __importDefault(require("./routes/user"));
var category_1 = __importDefault(require("./routes/category"));
var post_1 = __importDefault(require("./routes/post"));
// config
var config_1 = require("../config");
dotenv_1.default.config();
var app = (0, express_1.default)();
(0, config_1.connectDB)();
// app middlewares
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json({
    limit: '5mb',
    type: 'application/json'
}));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL
}));
// middlewares
app.use('/api', auth_1.default);
app.use('/api', user_1.default);
app.use('/api', category_1.default);
app.use('/api', post_1.default);
var port = process.env.PORT || 8000;
app.listen(port, function () { return console.log("API is running on port ".concat(port)); });
