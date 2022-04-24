import { container } from "tsyringe";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRespository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";


/* Passar Interface ICategoriesRepository */
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
),
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository,
),

container.registerSingleton<IUsersRespository>(
    "UsersRepository",
    UsersRepository
)