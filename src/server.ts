import App from './app';
import 'dotenv/config';

import * as bodyParser from 'body-parser';
import { loggerMiddleware } from './middlewares';

import { CategoriesController, ProductsController } from './controllers';
import { ProductService, CategoriesService } from './services';
import { CategoriesRepo, ProductsRepo } from './repos';
import FileSync from 'lowdb/adapters/FileSync';
import lowdb from 'lowdb';


const adapter = new FileSync('db.json');
const db = lowdb(adapter);
const productsRepo = new ProductsRepo(db.get('products'));
const categoriesRepo = new CategoriesRepo(db.get('categories'));

const app = new App({
  port: +process.env || 5000,
  controllers: [
    new ProductsController(new ProductService(productsRepo)),
    new CategoriesController(new CategoriesService(categoriesRepo, productsRepo))
  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware
  ]
});

app.listen();