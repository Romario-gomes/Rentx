import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () =>{
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    })
    it("Should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });
    });
});
