import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    const car = carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 350.0,
      license_plate: "DEF-1234",
      fine_amount: 150,
      brand: "Car_brand",
      category_id: "4bc4be06-2600-47ee-96e1-c8c4ea20a4bc",
    });

    const cars = await listCarsUseCase.execute();
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", () => {});
});
