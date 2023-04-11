import {CategoriesController} from "./categories.controller";
import {CategoriesService} from "./categories.service";
import {Test} from "@nestjs/testing";

describe('Categories controller', () => {
    let categoriesController: CategoriesController;
    let categoriesService: CategoriesService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CategoriesController],
            providers: [CategoriesService],
        }).compile();

        categoriesService = moduleRef.get<CategoriesService>(CategoriesService);
        categoriesController = moduleRef.get<CategoriesController>(CategoriesController);
    });

    describe('create', () => {
        let i = 0;
        const dataGenerator = () => {
            i++;
            return {
                slug: 'slug' + i,
                name: 'Имя' + i,
                description: 'Описание катеогрии/category description' + i,
                active: Boolean(i % 2)
            }
        }
        it('create valid category', async () => {
            const data = dataGenerator()
            const result = await categoriesController.create(data);
            expect(result).toContainEqual(data);
            expect(result.createdDate).toBeDefined();
        })
    })
})