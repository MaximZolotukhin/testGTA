import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { UserService } from '../services/UserService.js';
const userService = new UserService();
const authController = new AuthController(userService);
const router = Router();
router.post('/api/register', (req, res) => {
    authController.register(req, res);
});
router.post('/api/login', (req, res) => {
    authController.login(req, res);
});
export default router;
