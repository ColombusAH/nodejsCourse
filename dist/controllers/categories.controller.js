"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const utils_1 = require("../utils");
const http_status_codes_1 = require("http-status-codes");
const middlewares_1 = require("../middlewares");
const dtos_1 = require("../dtos");
class CategoriesController {
    constructor(service) {
        this.service = service;
        this.path = '/categories';
        this.router = express.Router();
        this.getAllCategories = (req, res) => {
            const categories = this.service.getAllCategories();
            res.json({ categories });
        };
        this.getCategoryById = (req, res) => {
            const { id } = req.params;
            const category = this.service.getCategoryById({ id });
            if (!category) {
                throw new utils_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, `category with id: ${id} not found`);
            }
            return res.status(http_status_codes_1.StatusCodes.OK).send(category);
        };
        this.addCategory = (req, res) => {
            const cat2Add = req.body;
            console.log(cat2Add);
            const category = this.service.createCategory(cat2Add);
            return res.status(http_status_codes_1.StatusCodes.CREATED).send(category);
        };
        this.updateCategory = (req, res) => {
            const category = req.body;
            const { id } = req.params;
            if (!this.service.categoryExists({ id })) {
                throw new utils_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, `category with id: ${id} not found`);
            }
            const updatedProduct = this.service.updateCategory(category, req.params.id);
            return res.status(http_status_codes_1.StatusCodes.OK).send(updatedProduct);
        };
        this.deleteCategory = (req, res) => {
            const { id } = req.params;
            const category = { id };
            if (!this.service.categoryExists(category)) {
                throw new utils_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, `category with id: ${id} not found`);
            }
            this.service.deleteCategory(category);
            return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
        };
        this.getCategoryProducts = (req, res) => {
            const category = { id: req.params.id };
            const products = this.service.getCategoryProducts(category);
            if (products.length === 0 && !this.service.categoryExists(category)) {
                throw new utils_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, `Category with id: ${category.id} not found`);
            }
            return res.status(http_status_codes_1.StatusCodes.OK).send(products);
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.path, this.getAllCategories);
        this.router.get(`${this.path}/:id/products`, middlewares_1.validationMiddleware(dtos_1.GetCategoryProductsDto, 'params'), this.getCategoryProducts);
        this.router.get(`${this.path}/:id`, middlewares_1.validationMiddleware(dtos_1.GetCategoryDto, 'params'), this.getCategoryById);
        this.router.post(`${this.path}`, middlewares_1.validationMiddleware(dtos_1.CreateCategoryDto, 'body'), this.addCategory);
        this.router.put(`${this.path}/:id`, middlewares_1.validationMiddleware(dtos_1.GetCategoryDto, 'params'), middlewares_1.validationMiddleware(dtos_1.UpdateCategoryDto, 'body'), this.updateCategory);
        this.router.delete(`${this.path}/:id`, middlewares_1.validationMiddleware(dtos_1.DeleteCategoryDto, 'params'), this.deleteCategory);
    }
}
exports.default = CategoriesController;
