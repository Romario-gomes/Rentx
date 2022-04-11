import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("create Category", () => {
    let createCategoryUseCase: CreateCategoryUseCase;
    let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

    beforeEach( () => {
        let categoriesRepositoryInMemory = new CategoriesRepositoryInMemory;
        let createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);

    });

    it("Should be able create a new category", async () => {
        const category = {
            name: "Category test",
            description: "Category description Test",
        }


        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    })
})