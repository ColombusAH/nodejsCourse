import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'interfaces/IControllerBase.interface'
import { HttpException } from '../utils';
import { StatusCodes } from 'http-status-codes';
import { validationMiddleware } from '../middlewares';
import { GetCategoryProductsDto, CreateCategoryDto, GetCategoryDto, UpdateCategoryDto, DeleteCategoryDto } from '../dtos';
import { CategoriesService } from '../services';

class CategoriesController implements IControllerBase {
  public path = '/categories';
  public router = express.Router();

  constructor(private readonly service: CategoriesService) {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.getAllCategories);
    this.router.get(`${this.path}/:id/products`, validationMiddleware(GetCategoryProductsDto, 'params'), this.getCategoryProducts);
    this.router.get(`${this.path}/:id`, validationMiddleware(GetCategoryDto, 'params'), this.getCategoryById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCategoryDto, 'body'), this.addCategory)
    this.router.put(`${this.path}/:id`, validationMiddleware(GetCategoryDto, 'params'), validationMiddleware(UpdateCategoryDto, 'body'), this.updateCategory);
    this.router.delete(`${this.path}/:id`, validationMiddleware(DeleteCategoryDto, 'params'), this.deleteCategory);

  }

  private getAllCategories = (req: Request, res: Response) => {
    const categories = this.service.getAllCategories();
    res.json({ categories });
  };

  private getCategoryById = (req: Request, res: Response) => {
    const { id } = req.params;
    const category = this.service.getCategoryById({ id });
    if (!category) {
      throw new HttpException(StatusCodes.NOT_FOUND, `category with id: ${id} not found`);
    }
    return res.status(StatusCodes.OK).send(category);
  };

  private addCategory = (req: Request, res: Response) => {
    const cat2Add: CreateCategoryDto = req.body;
    console.log(cat2Add);

    const category = this.service.createCategory(cat2Add);
    return res.status(StatusCodes.CREATED).send(category);
  };

  private updateCategory = (req: Request, res: Response) => {
    const category: UpdateCategoryDto = req.body;
    const { id } = req.params;
    if (!this.service.categoryExists({ id })) {
      throw new HttpException(StatusCodes.NOT_FOUND, `category with id: ${id} not found`);
    }
    const updatedProduct = this.service.updateCategory(category, req.params.id);
    return res.status(StatusCodes.OK).send(updatedProduct);
  };

  private deleteCategory = (req: Request, res: Response) => {
    const { id } = req.params;
    const category: DeleteCategoryDto = { id };
    if (!this.service.categoryExists(category)) {
      throw new HttpException(StatusCodes.NOT_FOUND, `category with id: ${id} not found`);
    }
    this.service.deleteCategory(category);
    return res.status(StatusCodes.NO_CONTENT).send();
  };

  private getCategoryProducts = (req: Request, res: Response) => {
    const category: GetCategoryDto = { id: req.params.id };
    const products = this.service.getCategoryProducts(category);
    if (products.length === 0 && !this.service.categoryExists(category)) {
      throw new HttpException(StatusCodes.NOT_FOUND, `Category with id: ${category.id} not found`)
    }
    return res.status(StatusCodes.OK).send(products);
  }
}

export default CategoriesController;