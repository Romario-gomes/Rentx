import { inject, injectable } from "tsyringe";
import { IUsersRespository } from "../../repositories/IUsersRepository";

import { deleteFile } from "../../../../utils/file";

interface IRequest {
    user_id: string;
    avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRespository
    ) {}
    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);
    
        if(user.avatar){
            console.log("user avatar: ", user.avatar);
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };