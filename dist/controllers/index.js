"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = exports.ProductsController = void 0;
const products_controller_1 = __importDefault(require("./products.controller"));
exports.ProductsController = products_controller_1.default;
const categories_controller_1 = __importDefault(require("./categories.controller"));
exports.CategoriesController = categories_controller_1.default;
