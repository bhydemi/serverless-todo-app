import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createTodo } from '../../businessLogic/todos.mjs'
import { getUserId } from '../utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('createTodo')

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    logger.info('Processing createTodo event', { event })

    const userId = getUserId(event)
    const newTodo = JSON.parse(event.body)

    const item = await createTodo(userId, newTodo)

    return {
      statusCode: 201,
      body: JSON.stringify({
        item
      })
    }
  })
