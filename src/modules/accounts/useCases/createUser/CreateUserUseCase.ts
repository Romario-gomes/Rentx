import { inject, injectable } from "tsyringe";

import { hash } from "bcryptjs";
 
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRespository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRespository
    ) {}

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
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