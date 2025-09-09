import { User } from '../model/User.js'
import { AppDataSource } from '../data-source.js'

export class UserService {
  async create(dto: { name: string; email: string; password: string }): Promise<User> {
    const user = new User()
    user.name = dto.name
    user.email = dto.email
    user.password = dto.password // TODO нужно релазовать хеширование

    const userRepository = AppDataSource.getRepository(User)
    return await userRepository.save(user)
  }
}
