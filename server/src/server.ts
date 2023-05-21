import 'dotenv/config'

import fastify from 'fastify'
import { resolve } from 'node:path'

import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'

const app = fastify()

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(require('@fastify/multipart'))

app.register(require('@fastify/cors'), {
  origin: true,
})

app.register(require('@fastify/jwt'), {
  secret: 'spacetime',
})

app.register(uploadRoutes)
app.register(authRoutes)
app.register(memoriesRoutes)

const port = Number(process.env.APP_PORT) ?? 3000

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`🚀🚀🚀 HTTP server running on http://localhost:${port}`)
  })
