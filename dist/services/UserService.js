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
        console.log('🔍 Начинаем поиск пользователя с email:', email);
        try {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { email },
                select: ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'],
            });
            if (!user) {
                return null;
            }
            if (user.password === null || user.password === undefined) {
                return null;
            }
            if (user.password === password) {
                return user;
            }
            return null;
        }
        catch (error) {
            console.error('Ошибка при поиске пользователя:', error);
            return null;
        }
    }
}
