import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/typeorm/entities/Category";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")  
    private categoriesRepository: ICategoriesRepository) {}
  async execute(): Promise<Category[]> {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
