import express from 'express';
import { AppDataSource } from './data-source.js';
import { AuthController } from './controllers/AuthController.js';
import { UserService } from './services/UserService.js';
const app = express();
const PORT = 3000;
app.use(express.json());
AppDataSource.initialize()
    .then(() => {
    console.log('✅ Data Source has been initialized!');
    const userService = new UserService();
    const authController = new AuthController(userService);
    app.post('/api/register', (req, res) => {
        authController.register(req, res);
    });
    app.listen(PORT, () => {
        console.log(`🚀 Server started on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ Error during Data Source initialization:', err);
});
