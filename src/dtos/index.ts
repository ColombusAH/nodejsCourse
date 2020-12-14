import { UpdateProductDto } from './products/updateProduct.dto';
import { GetProductDto } from './products/getProduct.dto';
import { CreateProductDto } from './products/createProduct.dto';
import { DeleteProductDto } from './products/delete-product.dto';
import { GetCategoryDto } from './categories/getCategory.dto';
import { GetCategoryProductsDto } from './categories/getCategoryProducts.dto';
import { CreateCategoryDto } from './categories/createCategory.dto'
import { UpdateCategoryDto } from './categories/updateCategory.dto';
import { DeleteCategoryDto } from './categories/deleteCategory.dto';
export {
  GetProductDto, CreateProductDto, UpdateProductDto, DeleteProductDto,
  GetCategoryDto, GetCategoryProductsDto, CreateCategoryDto, UpdateCategoryDto, DeleteCategoryDto
};


export type Dto = GetProductDto | CreateProductDto | UpdateProductDto;