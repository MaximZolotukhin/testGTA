import { User } from '../model/User.js';
import { AppDataSource } from '../data-source.js';
export class UserService {
    async create(dto) {
        const user = new User();
        user.name = dto.name;
        user.email = dto.email;
        user.password = dto.password;
        console.log('Попытка сохранить пользователя:', user);
        const userRepository = AppDataSource.getRepository(User);
        const savedUser = await userRepository.save(user);
        console.log('Пользователь сохранён:', savedUser);
        return savedUser;
    }
}
