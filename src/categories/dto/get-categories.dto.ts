import {IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min} from 'class-validator';
import {Type} from 'class-transformer';
import {Category} from "../../models/category";

const fields = Object.keys(Category.getAttributes());

const sortVariants = [
    ...fields,
    ...fields.map(f => '-' + f)
];

export class GetCategoriesDto {
    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsBoolean()
    readonly active: string;

    @IsOptional()
    @IsString()
    readonly search: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Max(9)
    @Min(1)
    readonly pageSize: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    readonly page: number;

    @IsOptional()
    @IsString()
    @IsIn(sortVariants)
    readonly sort: string;
}