"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepo = void 0;
const uuid_1 = require("uuid");
class CategoriesRepo {
    constructor(categoryDb) {
        this.categoryDb = categoryDb;
        this.getAllCategories = () => {
            return this.categoryDb.value();
        };
        this.getCategoryById = ({ id }) => {
            const categories = this.categoryDb.value();
            return categories.find(c => c.id === id);
        };
        this.createCategory = (categoryDto) => {
            const id = uuid_1.v4();
            this.categoryDb.push(Object.assign({ id }, categoryDto)).write();
            return Object.assign({ id }, categoryDto);
        };
    }
    updateCategory(category, cid) {
        this.categoryDb
            .find({ id: cid })
            .assign(Object.assign({ cid }, category))
            .write();
        return Object.assign({ id: cid }, category);
    }
    deleteCategory({ id }) {
        this.categoryDb.remove({ id }).write();
        return null;
    }
}
exports.CategoriesRepo = CategoriesRepo;
