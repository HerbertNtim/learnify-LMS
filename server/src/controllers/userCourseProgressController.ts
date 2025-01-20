import { Request, Response } from "express";
import UserCourseProgress from "../models/userCourseProgressModel";
import Course from "../models/courseModel";

export const getUserEnrolledCourses = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const enrolledCourses = await UserCourseProgress.query("userId").eq(userId).exec();
    const courseIds = enrolledCourses.map((course: any) => course.courseId);
    const courses = await Course.batchGet(courseIds);
    
    res.status(200).json({
      message: "Successfully fetched user's enrolled courses",
      data: courses,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch user's enrolled courses",
      error: error.message,
    });
  }
}

export const getUserCourseProgress = async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;

  try {
    const progress = await UserCourseProgress.get({ userId, courseId });

    res.status(200).json({
      message: "Successfully fetched user's course progress",
      data: progress,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to fetch user's course progress",
      error: error.message,
    });
  }
}
