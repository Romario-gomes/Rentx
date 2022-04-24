import { inject, injectable } from "tsyringe";
import { IUsersRespository } from "@modules/accounts/repositories/IUsersRepository";

import { sign } from "jsonwebtoken";

import { compare } from "bcryptjs";
import { AppError } from "@errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse{
    user: {
        name: string,
        email: string
    },
    token: string;
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRespository
    ){}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        // Usuario Existe
        if (!user) {
            throw new AppError("Email or password incorrect!");
        }
        
        const passwordMatch = await compare(password, user.password);

        // Senha está Correta
        if(!passwordMatch){
            throw new AppError("Email or password incorrect!");

        }

        // Gerar jsonwebtoken
        const token = sign({}, "a95e14185b20a69b71794c47abcfec30", {
            subject: user.id,
            expiresIn: "1d"
        });

        return {
            user,
            token
        }
    }
}

export { AuthenticateUserUseCase };