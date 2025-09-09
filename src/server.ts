import express, { Request, Response } from 'express'
import { AppDataSource } from './data-source.js'

const app = express()
const PORT: number = 3000

// Подключаемся к БД
AppDataSource.initialize()
  .then(() => {
    console.log('Подключение к PostgreSQL установлено')

    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Ошибка подключения к БД:', error)
    process.exit(1) // Завершаем процесс, если БД не подключилась
  })
