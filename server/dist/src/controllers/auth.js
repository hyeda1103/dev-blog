"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.registerActivate = exports.register = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var shortid_1 = __importDefault(require("shortid"));
var lodash_1 = __importDefault(require("lodash"));
var user_1 = __importDefault(require("../models/user"));
var sendEmail_1 = require("../../helpers/sendEmail");
var register = function (req, res) {
    aws_sdk_1.default.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    // Check if the user exists in DB
    user_1.default.findOne({ email: email }).exec(function (error, user) {
        if (user) {
            return res.status(400).json({
                error: '이미 가입한 이메일 주소입니다'
            });
        }
        // Generate token with user name, email, and password
        var token = jsonwebtoken_1.default.sign({ name: name, email: email, password: password }, "".concat(process.env.JWT_ACCOUNT_ACTIVATION), {
            expiresIn: '10m'
        });
        // Send email
        var params = (0, sendEmail_1.registerEmailParams)(email, token);
        var sendEmailonRegister = new aws_sdk_1.default.SES({
            apiVersion: '2010-12-01'
        }).sendEmail(params).promise();
        sendEmailonRegister.then(function (data) {
            console.log('Email submitted to SES', data);
            res.json({
                message: "\uC774\uBA54\uC77C \uC778\uC99D\uBA54\uC77C\uC774 ".concat(email, "\uB85C \uBC1C\uC1A1\uB418\uC5C8\uC2B5\uB2C8\uB2E4. 10\uBD84 \uC774\uB0B4\uB85C \uC774\uBA54\uC77C\uC744 \uD655\uC778\uD558\uACE0 \uD68C\uC6D0\uAC00\uC785 \uC808\uCC28\uB97C \uC644\uB8CC\uD558\uC5EC \uC8FC\uC2ED\uC2DC\uC624")
            });
        }).catch(function (error) {
            console.log('SES email on register', error);
            res.json({
                error: '이메일 인증을 진행할 수 없습니다. 다시 시도하여 주십시오.'
            });
        });
    });
};
exports.register = register;
var registerActivate = function (req, res) {
    var token = req.body.token;
    jsonwebtoken_1.default.verify(token, "".concat(process.env.JWT_ACCOUNT_ACTIVATION), function (err) {
        if (err) {
            return res.status(401).json({
                error: '만료된 링크입니다. 회원가입을 다시 진행해주세요.'
            });
        }
        var _a = jsonwebtoken_1.default.decode(token), name = _a.name, email = _a.email, password = _a.password;
        var username = shortid_1.default.generate();
        user_1.default.findOne({ email: email }).exec(function (err, user) {
            if (user) {
                return res.status(401).json({
                    error: '이미 가입된 이메일 주소입니다'
                });
            }
            var newUser = new user_1.default({ username: username, name: name, email: email, password: password });
            newUser.save(function (err, result) {
                if (err) {
                    return res.status(401).json({
                        error: '데이터베이스에 정보를 저장하는 데에 실패했습니다. 다시 시도해주세요.'
                    });
                }
                return res.json({
                    message: '성공적으로 회원가입하였습니다. 로그인하세요.'
                });
            });
        });
    });
};
exports.registerActivate = registerActivate;
var login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    user_1.default.findOne({ email: email }).exec(function (err, user) {
        if (err || !user) {
            return res.status(401).json({
                error: '가입된 이메일 주소가 아닙니다. 회원가입을 진행해주세요.'
            });
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: '이메일과 비밀번호가 일치하지 않습니다'
            });
        }
        var _id = user._id, name = user.name, email = user.email, role = user.role;
        var token = jsonwebtoken_1.default.sign({ _id: _id }, "".concat(process.env.JWT_SECRET), {
            expiresIn: '7d'
        });
        return res.json({
            token: token,
            user: {
                _id: _id,
                name: name,
                email: email,
                role: role,
            }
        });
    });
};
exports.login = login;
var forgotPassword = function (req, res) {
    aws_sdk_1.default.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    });
    var email = req.body.email;
    user_1.default.findOne({ email: email }).exec(function (err, user) {
        if (err || !user) {
            return res.status(400).json({
                error: '가입하지 않은 이메일 주소입니다'
            });
        }
        var token = jsonwebtoken_1.default.sign({ name: user.name }, "".concat(process.env.JWT_RESET_PASSWORD), { expiresIn: '10m' });
        var params = (0, sendEmail_1.forgotPasswordEmailParams)(email, token);
        return user.updateOne({ resetPasswordLink: token }, function (err, success) {
            if (err) {
                return res.status(400).json({
                    error: '비밀번호 재설정에 실패하였습니다. 다시 시도하여 주십시오.'
                });
            }
            var sendEmailonForgotPassword = new aws_sdk_1.default.SES({
                apiVersion: '2010-12-01'
            }).sendEmail(params).promise();
            sendEmailonForgotPassword.then(function (data) {
                console.log('Email submitted to SES', data);
                res.json({
                    message: "\uBE44\uBC00\uBC88\uD638 \uC7AC\uC124\uC815 \uB9C1\uD06C\uAC00 ".concat(email, "\uB85C \uBC1C\uC1A1\uB418\uC5C8\uC2B5\uB2C8\uB2E4. 10\uBD84 \uC774\uB0B4\uB85C \uC774\uBA54\uC77C\uC744 \uD655\uC778\uD558\uACE0 \uBE44\uBC00\uBC88\uD638 \uC7AC\uC124\uC815\uC744 \uC704\uD55C \uC808\uCC28\uB97C \uC644\uB8CC\uD558\uC5EC \uC8FC\uC2ED\uC2DC\uC624")
                });
            }).catch(function (error) {
                console.log('SES email on register', error);
                res.json({
                    error: '이메일을 인증할 수 없습니다. 다시 시도하여 주십시오.'
                });
            });
        });
    });
};
exports.forgotPassword = forgotPassword;
var resetPassword = function (req, res) {
    var _a = req.body, resetPasswordLink = _a.resetPasswordLink, newPassword = _a.newPassword;
    if (resetPasswordLink) {
        jsonwebtoken_1.default.verify(resetPasswordLink, "".concat(process.env.JWT_RESET_PASSWORD), function (err, success) {
            if (err) {
                return res.status(400).json({
                    error: '유효하지 않은 토큰입니다. 다시 시도해 주세요.'
                });
            }
            user_1.default.findOne({ resetPasswordLink: resetPasswordLink }).exec(function (err, user) {
                if (err || !user) {
                    return res.status(400).json({
                        error: '유효하지 않은 토큰입니다. 다시 시도해 주세요.'
                    });
                }
                var updatedFields = {
                    password: newPassword,
                    resetPasswordLink: '',
                };
                user = lodash_1.default.extend(user, updatedFields);
                user.save(function (err, result) {
                    if (err) {
                        return res.status(400).json({
                            error: '비밀번호 재설정에 실패하였습니다. 다시 시도해주세요.'
                        });
                    }
                    res.json({
                        message: '비밀번호를 성공적으로 재설정하였습니다'
                    });
                });
            });
        });
    }
};
exports.resetPassword = resetPassword;
