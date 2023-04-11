import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {UpdateCategoryDto} from './dto/update-category.dto';
import {GetCategoriesDto} from './dto/get-categories.dto';
import {GetCategoryDto} from './dto/get-category.dto';
import {CategoriesService} from './categories.service';
import {Category} from "../models/category";

@Controller()
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Post('category')
    async create(
        @Body() createCategoryDto: CreateCategoryDto
    ): Promise<Category> {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get('category/:id')
    async findByPk(
        @Param('id') id: number
    ){
        await this.categoriesService.findById(id);
    }

    @Put('category/:id')
    async update(
        @Param('id') id: number,
        @Body() updateCategoryDto: UpdateCategoryDto
    ): Promise<Category> {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete('category/:id')
    async delete(
        @Param('id') id: number
    ){
        await this.categoriesService.delete(id);
    }

    @Get('category')
    async findOne(
        @Query() getCategoryDto: GetCategoryDto
    ): Promise<Category> {
        return getCategoryDto.id
            ? this.categoriesService.findById(getCategoryDto.id)
            : this.categoriesService.findBySlug(getCategoryDto.slug);
    }

    @Get('categories')
    async findFiltered(
        @Query() getCategoriesDto: GetCategoriesDto
    ): Promise<Category[]> {
        return this.categoriesService.findAll(getCategoriesDto);
    }
}
