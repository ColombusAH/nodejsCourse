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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const bodyParser = __importStar(require("body-parser"));
const middlewares_1 = require("./middlewares");
const controllers_1 = require("./controllers");
const services_1 = require("./services");
const repos_1 = require("./repos");
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const lowdb_1 = __importDefault(require("lowdb"));
const adapter = new FileSync_1.default('db.json');
const db = lowdb_1.default(adapter);
const productsRepo = new repos_1.ProductsRepo(db.get('products'));
const categoriesRepo = new repos_1.CategoriesRepo(db.get('categories'));
const app = new app_1.default({
    port: +process.env || 5000,
    controllers: [
        new controllers_1.ProductsController(new services_1.ProductService(productsRepo)),
        new controllers_1.CategoriesController(new services_1.CategoriesService(categoriesRepo, productsRepo))
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        middlewares_1.loggerMiddleware
    ]
});
app.listen();
