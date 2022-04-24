import { inject, injectable } from "tsyringe";

import { hash } from "bcryptjs";
 
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRespository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";



@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRespository
    ) {}

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already Exists");
        }
        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name, 
            email, 
            password: passwordHash, 
            driver_license
        });
    }
}

export { CreateUserUseCase }