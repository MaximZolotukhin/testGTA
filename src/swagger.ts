import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API для регистрации и входа пользователей',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Локальный сервер',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // ← путь к файлам с аннотациями
}

export const swaggerSpec = swaggerJSDoc(options)
