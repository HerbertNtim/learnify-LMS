import express from 'express';
import { getUserCourseProgress, getUserEnrolledCourses, updateUserCourseProgress } from '../controllers/userCourseProgressController';

const userCourseProgressRoutes = express.Router();

userCourseProgressRoutes.get('/:userId/enrolled-courses', getUserEnrolledCourses)
userCourseProgressRoutes.get('/:userId/courses/:courseId', getUserCourseProgress)
userCourseProgressRoutes.put('/:userId/courses/:courseId', updateUserCourseProgress)

export default userCourseProgressRoutes;
