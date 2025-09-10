import { Post } from '../model/Post.js';
import { User } from '../model/User.js';
import { AppDataSource } from '../data-source.js';
export class PostService {
    async findAll(page = 1, limit = 2) {
        const postRepository = AppDataSource.getRepository(Post);
        const [posts, total] = await postRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['author'],
            order: { createdAt: 'DESC' },
        });
        return {
            posts,
            total,
            page,
            limit,
        };
    }
    async create(userId, dto) {
        const post = new Post();
        post.title = dto.title;
        post.content = dto.content;
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }
        post.author = user;
        return await AppDataSource.getRepository(Post).save(post);
    }
    async update(id, userId, dto) {
        const postRepository = AppDataSource.getRepository(Post);
        const post = await postRepository.findOne({ where: { id }, relations: ['author'] });
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.author.id !== userId) {
            throw new Error('You can only edit your own posts');
        }
        if (dto.title !== undefined)
            post.title = dto.title;
        if (dto.content !== undefined)
            post.content = dto.content;
        return await postRepository.save(post);
    }
    async delete(id, userId) {
        const postRepository = AppDataSource.getRepository(Post);
        const post = await postRepository.findOne({ where: { id }, relations: ['author'] });
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.author.id !== userId) {
            throw new Error('You can only delete your own posts');
        }
        await postRepository.remove(post);
    }
}
