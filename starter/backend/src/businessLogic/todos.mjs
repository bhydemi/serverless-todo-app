import { v4 as uuidv4 } from 'uuid'
import { TodosAccess } from '../dataLayer/todosAccess.mjs'
import { AttachmentUtils } from '../fileStorage/attachmentUtils.mjs'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('todos')
const todosAccess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()

export async function getTodosForUser(userId) {
  logger.info('Getting todos for user', { userId })
  return todosAccess.getTodosForUser(userId)
}

export async function createTodo(userId, newTodo) {
  logger.info('Creating todo', { userId, newTodo })

  const todoId = uuidv4()
  const createdAt = new Date().toISOString()

  const newItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    ...newTodo
  }

  return todosAccess.createTodo(newItem)
}

export async function updateTodo(userId, todoId, todoUpdate) {
  logger.info('Updating todo', { userId, todoId, todoUpdate })
  return todosAccess.updateTodo(userId, todoId, todoUpdate)
}

export async function deleteTodo(userId, todoId) {
  logger.info('Deleting todo', { userId, todoId })
  return todosAccess.deleteTodo(userId, todoId)
}

export async function createAttachmentPresignedUrl(userId, todoId) {
  logger.info('Creating attachment presigned URL', { userId, todoId })

  const uploadUrl = await attachmentUtils.getUploadUrl(todoId)
  const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId)

  await todosAccess.updateTodoAttachmentUrl(userId, todoId, attachmentUrl)

  return uploadUrl
}
