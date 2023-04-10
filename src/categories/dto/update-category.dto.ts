import {IsBoolean, IsOptional, IsString, Matches} from 'class-validator';

export class UpdateCategoryDto {
    @IsOptional()
    @Matches(/^[a-zA-Z]+([a-zA-Z0-9]+)*$/)
    readonly slug: string;

    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsBoolean()
    readonly active: boolean;
}