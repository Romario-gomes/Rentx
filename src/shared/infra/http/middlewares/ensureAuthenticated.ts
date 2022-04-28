import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { Request, Response ,NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    //Padrão JWT
    //Bearer 'token que está sendo passado'

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token missing", 401);
    }

    //desestruturar o token
    const [, token] = authHeader.split(" ");

    try{
        const { sub: user_id } = verify(token, "a95e14185b20a69b71794c47abcfec30") as IPayload;

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

        if(!user){
            throw new AppError("User does not exists", 401);
        }
        request.user = {
            id: user_id,
        }
        next();
    } catch{
        throw new AppError("Invalid token!", 401);
    }
}