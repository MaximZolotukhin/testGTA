import { Router } from 'express';
import { PostController } from '../controllers/PostController.js';
import { PostService } from '../services/PostService.js';
const postService = new PostService();
const postController = new PostController(postService);
const router = Router();
router.post('/api/posts', (req, res) => {
    postController.create(req, res);
});
router.put('/api/posts/:id', (req, res) => {
    postController.update(req, res);
});
router.delete('/api/posts/:id', (req, res) => {
    postController.delete(req, res);
});
export default router;
