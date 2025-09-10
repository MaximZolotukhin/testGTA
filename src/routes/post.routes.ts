import { Router } from 'express'
import { PostController } from '../controllers/PostController.js'
import { PostService } from '../services/PostService.js'

// Создаем экземпляры
const postService = new PostService()
const postController = new PostController(postService)

const router = Router()

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Создать новый пост
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID авторизованного пользователя (временно)
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пост создан
 *       400:
 *         description: Ошибка валидации или доступа
 */
router.post('/api/posts', (req, res) => {
  postController.create(req, res)
})

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Обновить пост
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID авторизованного пользователя (временно)
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Пост обновлён
 *       400:
 *         description: Ошибка валидации или доступа
 */
router.put('/api/posts/:id', (req, res) => {
  postController.update(req, res)
})

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Удалить пост
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID авторизованного пользователя (временно)
 *     responses:
 *       200:
 *         description: Пост удалён
 *       400:
 *         description: Ошибка доступа
 */
router.delete('/api/posts/:id', (req, res) => {
  postController.delete(req, res)
})

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Получить список постов с пагинацией
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 2
 *         description: Количество постов на странице
 *     responses:
 *       200:
 *         description: Список постов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 */
router.get('/api/posts', (req, res) => {
  postController.findAll(req, res)
})

export default router
