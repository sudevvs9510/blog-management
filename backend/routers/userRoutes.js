import express from 'express'
import { login, register } from '../controllers/userControllers.js'

const userRoutes = express.Router()


userRoutes.post('/login',login)
userRoutes.post('/register',register)

export default userRoutes