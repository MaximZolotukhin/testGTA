import { Request, Response } from 'express'
import { GetAllPostDto } from '../dto/GetAllDto.js'
import { CreatePostDto } from '../dto/CreatePostDto.js'
import { UpdatePostDto } from '../dto/UpdatePostDto.js'
import { PostService } from '../services/PostService.js'

export class PostController {
  constructor(private postService: PostService) {}

  async findAll(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 2

    try {
      const result = await this.postService.findAll(page, limit)
      res.json(result)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    // Пока userId берём из тела запроса — позже заменим на JWT
    const userId = req.body.userId as string
    const dto = req.body as CreatePostDto

    if (!userId) {
      res.status(400).json({ error: 'User ID is required' })
      return
    }

    try {
      const post = await this.postService.create(userId, dto)
      res.status(201).json({ message: 'Post created successfully', post })
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const userId = req.body.userId as string
    const id = req.params.id as string
    const dto = req.body as UpdatePostDto

    if (!userId) {
      res.status(400).json({ error: 'User ID is required' })
      return
    }

    try {
      const post = await this.postService.update(id, userId, dto)
      res.json({ message: 'Post updated successfully', post })
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const userId = req.body.userId as string
    const id = req.params.id as string

    if (!userId) {
      res.status(400).json({ error: 'User ID is required' })
      return
    }

    try {
      await this.postService.delete(id, userId)
      res.json({ message: 'Post deleted successfully' })
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
}
