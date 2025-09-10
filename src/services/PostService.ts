import { Post } from '../model/Post.js'
import { User } from '../model/User.js'
import { AppDataSource } from '../data-source.js'

export class PostService {
  async create(userId: string, dto: { title: string; content: string }): Promise<Post> {
    const post = new Post()
    post.title = dto.title
    post.content = dto.content

    // Найти автора по id
    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId })
    if (!user) {
      throw new Error('User not found')
    }

    post.author = user

    return await AppDataSource.getRepository(Post).save(post)
  }

  async update(id: string, userId: string, dto: { title?: string; content?: string }): Promise<Post> {
    const postRepository = AppDataSource.getRepository(Post)
    const post = await postRepository.findOne({ where: { id }, relations: ['author'] })

    if (!post) {
      throw new Error('Post not found')
    }

    if (post.author.id !== userId) {
      throw new Error('You can only edit your own posts')
    }

    if (dto.title !== undefined) post.title = dto.title
    if (dto.content !== undefined) post.content = dto.content

    return await postRepository.save(post)
  }

  async delete(id: string, userId: string): Promise<void> {
    const postRepository = AppDataSource.getRepository(Post)
    const post = await postRepository.findOne({ where: { id }, relations: ['author'] })

    if (!post) {
      throw new Error('Post not found')
    }

    if (post.author.id !== userId) {
      throw new Error('You can only delete your own posts')
    }

    await postRepository.remove(post)
  }
}
