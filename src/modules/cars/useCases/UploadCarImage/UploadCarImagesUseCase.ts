import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, images_names }: IRequest): Promise<void> {
    images_names.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
