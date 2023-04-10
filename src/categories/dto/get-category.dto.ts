import {IsInt, IsPositive, IsString, Matches, ValidateIf} from 'class-validator';
import {Type} from 'class-transformer';

export class GetCategoryDto {
    @ValidateIf(o => !o.slug)
    @IsInt()
    @Type(() => Number)
    @IsPositive()
    readonly id: number;

    @ValidateIf(o => !o.id)
    @IsString()
    @Matches(/^[a-zA-Z]+([a-zA-Z0-9]+)*$/)
    readonly slug: string;
}