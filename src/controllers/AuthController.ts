import { Request, Response } from 'express'
import { RegisterUserDto } from '../dto/RegisterUserDto.js'
import { LoginUserDto } from '../dto/LoginUserDto'
import { UserService } from '../services/UserService.js'

export class AuthController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response): Promise<void> {
    const dto = req.body as RegisterUserDto

    try {
      const user = await this.userService.create(dto)
      res.status(201).json({ message: 'User created successfully', user })
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const dto = req.body as LoginUserDto

    try {
      const user = await this.userService.validate(dto.email, dto.password)
      if (user) {
        res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } })
      } else {
        res.status(401).json({ error: 'Invalid email or password' })
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
}
