"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordEmailParams = exports.registerEmailParams = void 0;
var registerEmailParams = function (email, token) {
    // Example code for SES:
    // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
    return {
        Source: "".concat(process.env.EMAIL_FROM),
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: ["".concat(process.env.EMAIL_TO)],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: "\n              <html>\n                <h1>\uD68C\uC6D0\uAC00\uC785\uC744 \uC704\uD55C \uC774\uBA54\uC77C \uC778\uC99D\uBA54\uC77C\uC785\uB2C8\uB2E4</h1>\n                <p>\uB2E4\uC74C \uB9C1\uD06C\uC5D0\uC11C \uD68C\uC6D0\uAC00\uC785\uC744 \uC644\uB8CC\uD558\uC5EC \uC8FC\uC2ED\uC2DC\uC624</p>\n                <p>".concat(process.env.CLIENT_URL, "/auth/activate/").concat(token, "</p>\n              </html>\n            ")
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Complete your registration'
            }
        }
    };
};
exports.registerEmailParams = registerEmailParams;
var forgotPasswordEmailParams = function (email, token) {
    // Example code for SES:
    // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-sending-email.html
    return {
        Source: "".concat(process.env.EMAIL_FROM),
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: ["".concat(process.env.EMAIL_TO)],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: "\n              <html>\n                <h1>\uBE44\uBC00\uBC88\uD638 \uC7AC\uC124\uC815 \uB9C1\uD06C</h1>\n                <p>\uB2E4\uC74C \uB9C1\uD06C\uC5D0\uC11C \uBE44\uBC00\uBC88\uD638 \uC7AC\uC124\uC815\uC744 \uC644\uB8CC\uD558\uC5EC \uC8FC\uC2ED\uC2DC\uC624</p>\n                <p>".concat(process.env.CLIENT_URL, "/auth/password/reset/").concat(token, "</p>\n              </html>\n            ")
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Complete your password reset'
            }
        }
    };
};
exports.forgotPasswordEmailParams = forgotPasswordEmailParams;
