import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import * as dynamoose from 'dynamoose'
import { clerkMiddleware, createClerkClient, requireAuth } from '@clerk/express'
// ROUTE IMPORTS
import courseRouter from './routes/courseRoutes'
import userClerkRoute from './routes/userClerkRoutes'
import transactionRoute from './routes/transactionRoute'
import userCourseProgressRoutes from './routes/userCourseProgressRoutes'
import Serverless from 'serverless-http'
import seed from './seed/seedDynamodb'


// CONFIGURATIONS
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'

if(!isProduction) {
  dynamoose.aws.ddb.local()
}

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
})


const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(clerkMiddleware())

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to LEARNIFY')
})
app.use("/courses", courseRouter);
app.use("/users/clerk", requireAuth(), userClerkRoute);
app.use("/transactions", requireAuth(), transactionRoute);
app.use("/users/course-progress", requireAuth(), userCourseProgressRoutes);

// SERVER
const port = process.env.PORT || 5000
if(!isProduction) {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
  })
}

// aws production environment
const serverlessApp = Serverless(app);
export const handler = async (event: any, context: any) => {
  if (event.action === 'seed') {
    await seed();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Seeding complete' }),
    }
  } else {
    return serverlessApp(event, context);
  }
}
