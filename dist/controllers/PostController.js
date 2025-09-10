export class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async create(req, res) {
        const userId = req.body.userId;
        const dto = req.body;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        try {
            const post = await this.postService.create(userId, dto);
            res.status(201).json({ message: 'Post created successfully', post });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async update(req, res) {
        const userId = req.body.userId;
        const id = req.params.id;
        const dto = req.body;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        try {
            const post = await this.postService.update(id, userId, dto);
            res.json({ message: 'Post updated successfully', post });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async delete(req, res) {
        const userId = req.body.userId;
        const id = req.params.id;
        if (!userId) {
            res.status(400).json({ error: 'User ID is required' });
            return;
        }
        try {
            await this.postService.delete(id, userId);
            res.json({ message: 'Post deleted successfully' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
