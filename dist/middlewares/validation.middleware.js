"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const exceptions_1 = require("../utils/exceptions");
const http_status_codes_1 = require("http-status-codes");
function validationMiddleware(dto, from) {
    return (req, res, next) => {
        console.log(class_transformer_1.plainToClass(dto, req.params));
        class_validator_1.validate(class_transformer_1.plainToClass(dto, req[from]))
            .then((errors) => {
            if (errors.length > 0) {
                const message = errors.map((error) => Object.values(error.constraints)).join(', ');
                next(new exceptions_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, message));
            }
            else {
                next();
            }
        });
    };
}
exports.default = validationMiddleware;
