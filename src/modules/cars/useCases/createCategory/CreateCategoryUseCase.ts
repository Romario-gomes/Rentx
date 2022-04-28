import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";




interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")  
    private categoriesRepository: ICategoriesRepository
    ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryExists = await this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new AppError("Category already exists");
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
