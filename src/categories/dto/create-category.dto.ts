import {IsBoolean, IsOptional, IsString, Matches} from 'class-validator';

export class CreateCategoryDto {
    @Matches(/^[a-zA-Z]+([a-zA-Z0-9]+)*$/)
    readonly slug: string;

    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsBoolean()
    readonly active: boolean;
}