import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 350.0,
      license_plate: "DEF-1234",
      fine_amount: 150,
      brand: "Car_brand",
      category_id: "4bc4be06-2600-47ee-96e1-c8c4ea20a4bc",
    });

    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 350.0,
      license_plate: "DEF-1234",
      fine_amount: 150,
      brand: "Car_brand_test",
      category_id: "4bc4be06-2600-47ee-96e1-c8c4ea20a4bc",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 350.0,
      license_plate: "DEF-1235",
      fine_amount: 150,
      brand: "Car_brand_test",
      category_id: "4bc4be06-2600-47ee-96e1-c8c4ea20a4bc",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 350.0,
      license_plate: "DEF-1235",
      fine_amount: 150,
      brand: "Car_brand_test",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
