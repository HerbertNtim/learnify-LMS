import { Router } from 'express'
import { updateUser } from '../controllers/userClerkController'

const userClerkRoute = Router()
userClerkRoute.put("/:userId", updateUser)

export default userClerkRoute;
