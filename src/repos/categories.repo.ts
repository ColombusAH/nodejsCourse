import { ICategory } from '../interfaces';
import { IProduct } from "interfaces";
import { GetCategoryDto, CreateCategoryDto, UpdateCategoryDto, DeleteProductDto, DeleteCategoryDto } from '../dtos';
import { v4 as uuidv4 } from 'uuid';


export class CategoriesRepo {

  constructor(private readonly categoryDb: any) {
  }

  getAllCategories = (): ICategory[] => {
    return this.categoryDb.value();
  };

  getCategoryById = ({ id }: GetCategoryDto): ICategory => {
    const categories = this.categoryDb.value() as ICategory[];
    return categories.find(c => c.id === id);
  };

  createCategory = (categoryDto: CreateCategoryDto) => {
    const id = uuidv4();
    this.categoryDb.push({ id, ...categoryDto }).write();
    return { id, ...categoryDto };
  };

  updateCategory(category: UpdateCategoryDto, cid: string) {
    this.categoryDb
      .find({ id: cid })
      .assign({ cid, ...category })
      .write();
    return { id: cid, ...category };
  }

  deleteCategory({ id }: DeleteCategoryDto) {
    this.categoryDb.remove({ id }).write();
    return null;
  }
}