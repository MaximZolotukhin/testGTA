import express from 'express'
import { AppDataSource } from './data-source.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import { swaggerSpec } from './swagger.js'
import swaggerUi from 'swagger-ui-express'

const app = express()
const PORT = 3000

// Middleware
app.use(express.json())
app.use(express.static('public'))

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Роуты
app.use('/', authRoutes)
app.use('/', postRoutes)

// Инициализация БД
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`)
      console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`)
    })
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })
