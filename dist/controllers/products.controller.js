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
class ProductsController {
    constructor(service) {
        this.service = service;
        this.path = '/products';
        this.router = express.Router();
        this.getAllProducts = (req, res) => {
            const products = this.service.getAllProducts();
            res.json({ products });
        };
        this.getProductById = (req, res) => {
            const { id } = req.params;
            const product = this.service.getProductById({ id });
            if (!product) {
                throw new utils_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, `product with id: ${id} not found`);
            }
            return res.status(http_status_codes_1.StatusCodes.OK).send(product);
        };
        this.addProduct = (req, res) => {
            const prod2add = req.body;
            const product = this.service.createProduct(prod2add);
            return res.status(http_status_codes_1.StatusCodes.CREATED).send(product);
        };
        this.updateProduct = (req, res) => {
            const product = req.body;
            const updatedProduct = this.service.updateProduct(product, req.params.id);
            return res.status(http_status_codes_1.StatusCodes.OK).send(updatedProduct);
        };
        this.deleteProduct = (req, res) => {
            const { id } = req.params;
            const product = { id };
            this.service.deleteProduct(product);
            return res.status(http_status_codes_1.StatusCodes.NO_CONTENT);
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.path, this.getAllProducts);
        this.router.get(`${this.path}/:id`, middlewares_1.validationMiddleware(dtos_1.GetProductDto, 'params'), this.getProductById);
        this.router.put(`${this.path}/:id`, middlewares_1.validationMiddleware(dtos_1.UpdateProductDto, 'body'), this.updateProduct);
        this.router.delete(`${this.path}/:id`, middlewares_1.validationMiddleware(dtos_1.DeleteProductDto, 'params'), this.deleteProduct);
        this.router.post(`${this.path}`, middlewares_1.validationMiddleware(dtos_1.CreateProductDto, 'body'), this.addProduct);
    }
}
exports.default = ProductsController;
