import {Module, NestModule} from '@nestjs/common';
import {CategoriesController} from './categories.controller';
import {CategoriesService} from './categories.service';

@Module({
    controllers: [ CategoriesController ],
    providers: [ CategoriesService ]
})
export class CategoriesModule implements NestModule {
    public configure() {}
}