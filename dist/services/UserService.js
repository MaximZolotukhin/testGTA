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
            console.log('📂 Получили репозиторий');
            const user = await userRepository.findOne({
                where: { email },
                select: ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt'],
            });
            console.log('✅ Пользователь найден:', user);
            if (!user) {
                console.log('❌ Пользователь не найден');
                return null;
            }
            if (user.password === null || user.password === undefined) {
                console.log('❌ Пароль пустой');
                return null;
            }
            if (user.password === password) {
                return user;
            }
            console.log('❌ Пароли не совпадают');
            return null;
        }
        catch (error) {
            console.error('💥 Ошибка при поиске пользователя:', error);
            return null;
        }
    }
}
