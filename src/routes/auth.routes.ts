import { Router } from 'express'
import { AuthController } from '../controllers/AuthController.js'
import { UserService } from '../services/UserService.js'

// Создаем экземпляры (временно — позже через DI)
const userService = new UserService()
const authController = new AuthController(userService)

const router = Router()

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пользователь создан
 *       400:
 *         description: Ошибка валидации
 */
router.post('/api/register', (req, res) => {
  authController.register(req, res)
})

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Вход пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Вход успешен
 *       401:
 *         description: Неверный email или пароль
 */
router.post('/api/login', (req, res) => {
  authController.login(req, res)
})

export default router
