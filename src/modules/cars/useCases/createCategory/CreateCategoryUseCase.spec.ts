import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("create Category", () => {
    let createCategoryUseCase: CreateCategoryUseCase;
    let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

    beforeEach( () => {
        let categoriesRepositoryInMemory = new CategoriesRepositoryInMemory;
        let createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);

    });

    it("Should be able create a new category", () => {
        const soma = 2 + 2;

        expect(soma).toBe(4);
    })
})