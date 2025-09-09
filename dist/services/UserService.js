import { User } from '../model/User.js';
import { AppDataSource } from '../data-source.js';
export class UserService {
    async create(dto) {
        const user = new User();
        user.name = dto.name;
        user.email = dto.email;
        user.password = dto.password;
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.save(user);
    }
}
