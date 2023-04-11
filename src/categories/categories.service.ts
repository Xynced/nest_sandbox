import {Injectable} from '@nestjs/common';
import {Category} from "../models/category";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";
import {GetCategoriesDto} from "./dto/get-categories.dto";
import {CategoriesFilterBuilder} from "./categories.filter.builder";

@Injectable()
export class CategoriesService {
    async create(data: CreateCategoryDto) {
        return Category.create({ ...data });
    }

    async update(id: number, data: UpdateCategoryDto): Promise<Category> {
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

    async findAll(filter: GetCategoriesDto): Promise<Category[]> {
        const options = CategoriesFilterBuilder
            .init()
            .name(filter.name)
            .description(filter.description)
            .search(filter.search)
            .active(filter.active)
            .sort(filter.sort)
            .page(filter.page)
            .pageSize(filter.pageSize)
            .build();

        console.log(options);
        return Category.findAll(options);
    }
}