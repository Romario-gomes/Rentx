import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<void> {
    /* O aluguel deve ter duração mínima de 24 horas.
    Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro. */

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }
  }
}

export { CreateRentalUseCase };
