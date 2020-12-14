import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'interfaces/IControllerBase.interface'
import { ProductService } from 'services/products.service';
import { HttpException } from '../utils';
import { StatusCodes } from 'http-status-codes';
import { validationMiddleware } from '../middlewares';
import { GetProductDto, CreateProductDto, UpdateProductDto, DeleteProductDto } from '../dtos';

class ProductsController implements IControllerBase {
  public path = '/products';
  public router = express.Router();

  constructor(private readonly service: ProductService) {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.getAllProducts);
    this.router.get(`${this.path}/:id`, validationMiddleware(GetProductDto, 'params'), this.getProductById);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateProductDto, 'body'), this.updateProduct);
    this.router.delete(`${this.path}/:id`, validationMiddleware(DeleteProductDto, 'params'), this.deleteProduct);
    this.router.post(`${this.path}`, validationMiddleware(CreateProductDto, 'body'), this.addProduct)
  }

  private getAllProducts = (req: Request, res: Response) => {
    const products = this.service.getAllProducts();
    res.json({ products });
  };

  private getProductById = (req: Request, res: Response) => {
    const { id } = req.params;
    const product = this.service.getProductById({ id });
    if (!product) {
      throw new HttpException(StatusCodes.NOT_FOUND, `product with id: ${id} not found`)
    }
    return res.status(StatusCodes.OK).send(product);
  };

  private addProduct = (req: Request, res: Response) => {
    const prod2add: CreateProductDto = req.body;
    const product = this.service.createProduct(prod2add);
    return res.status(StatusCodes.CREATED).send(product);
  };

  private updateProduct = (req: Request, res: Response) => {
    const product: UpdateProductDto = req.body;
    const updatedProduct = this.service.updateProduct(product, req.params.id);
    return res.status(StatusCodes.OK).send(updatedProduct);
  };

  private deleteProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    const product: DeleteProductDto = { id };
    this.service.deleteProduct(product);
    return res.status(StatusCodes.NO_CONTENT);
  };
}

export default ProductsController;