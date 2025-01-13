import Stripe from 'stripe'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import Course from '../models/courseModel'
import Transaction from '../models/transactionModel'
import { User } from '@clerk/express'
import UserCourseProgress from '../models/userCourseProgressModel'

dotenv.config()

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('No Stripe secret key found')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createStripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { amount } = req.body;

  if (!amount || amount <= 0) {
    amount = 50;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
    });

    res.json({
      message:"",
      data: {
        clientSecret: paymentIntent.client_secret,
      }
    })
  } catch (error) {
    res.status(500).json({ message: "Error creating payment intent", error });
  }
}

export const createTransaction = async (
  req: Request, 
  res: Response
): Promise<void> => {
  const { userId, courseId, transactionId, amount, paymentProvider } = req.body;

  try {
    // 1. get course 
    const course = await Course.get(courseId);

    // 2. create transaction
    const newTransaction = new Transaction({
      dateTime: new Date().toISOString(),
      userId,
      courseId,
      transactionId,
      amount,
      paymentProvider
    })
    await newTransaction.save();

    // 3. create initial course progress
    const initialProgress = new UserCourseProgress({
      userId,
      courseId,
      enrollmentDate: new Date().toISOString(),
      overallProgress: 0,
      sections: course.sections.map((section: any) => ({
        sectionId: section.sectionId,
        chapters: section.chapters.map((chapter: any) => ({
          chapterId: chapter.chapterId,
          completed: false
        }))
      })),
      lastAccessedTimeStamp: new Date().toISOString()
    })
    await initialProgress.save();

    // 4. add enrollment to relevant course
    await Course.update(
      { courseId },
      { $ADD: { enrollments: [{userId}] } }  
    )

    res.json({
      message: "Purchase Course successfully",
      data: {
        transaction: newTransaction,
        courseProgress: initialProgress
      }
    })

  } catch (error) {
    res.status(500).json({ message: "Error creating transaction and enrollment", error });
  }
}
