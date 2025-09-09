import express from 'express';
import { AppDataSource } from './data-source.js';
const app = express();
const PORT = 3000;
AppDataSource.initialize()
    .then(() => {
    console.log('Подключение к PostgreSQL установлено');
    app.listen(PORT, () => {
        console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Ошибка подключения к БД:', error);
    process.exit(1);
});
