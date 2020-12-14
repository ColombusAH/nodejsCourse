"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
class App {
    constructor(appInit) {
        this.app = express_1.default();
        this.port = appInit.port;
        this.applyMiddlewares(appInit.middleWares);
        this.registerRoutes(appInit.controllers);
        this.initializeErrorHandling();
    }
    applyMiddlewares(middleWares) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }
    registerRoutes(controllers) {
        controllers.forEach(controller => {
            this.app.use('/api/', controller.router);
        });
    }
    initializeErrorHandling() {
        this.app.use(middlewares_1.errorMiddleware);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
