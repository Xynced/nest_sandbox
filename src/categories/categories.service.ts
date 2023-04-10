import {Injectable} from '@nestjs/common';
import {Category} from "../models/category";
import {CategoryInterface} from './category.interface';

@Injectable()
export class CategoriesService {
    async create(data: CategoryInterface) {
        return Category.create({ ...data });
    }

    async update(id: number, data: CategoryInterface): Promise<Category> {
        const category = await Category.findByPk(id);
        if (!category) throw new Error('Category not found');
        await category.update(data);
        return category;
    }

    async delete(id: number) {
        const category = await Category.findByPk(id);
        if (!category) throw new Error('Category not found');
        await category.destroy();
    }

    async findById(id: number): Promise<Category> {
        return Category.findByPk(id);
    }

    async findBySlug(slug: string): Promise<Category> {
        return Category.findOne({
            where: { slug }
        });
    }

    async findAll(filter: any): Promise<Category[]> {
        return [];
    }

}