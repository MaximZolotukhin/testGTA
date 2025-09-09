import { User } from '../model/User.js';
import { AppDataSource } from '../data-source.js';
export class UserService {
    async create(dto) {
        const user = new User();
        user.name = dto.name;
        user.email = dto.email;
        user.password = dto.password;
        const userRepository = AppDataSource.getRepository(User);
        const savedUser = await userRepository.save(user);
        return savedUser;
    }
    async validate(email, password) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email } });
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
}
