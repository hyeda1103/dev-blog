"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
var profile = function (req, res) {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};
exports.profile = profile;
