import { Request, Response } from "express";
import UserCourseProgress from "../models/userCourseProgressModel";
import Course from "../models/courseModel";
import { calculateOverallProgress, mergeSections } from "../utils/utils";

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

export const updateUserCourseProgress = async (req: Request, res: Response) => {
  const { userId, courseId } = req.params;
  const progressData = req.body;

  try {
    let progress = await UserCourseProgress.get({ userId, courseId });

    if (!progress) {
      progress = new UserCourseProgress({ 
        userId, 
        courseId,
        enrollmentDate: new Date().toISOString(),
        overallProgress: 0,
        sections: progressData.section || [],
        lastAccessedTimestamp: new Date().toISOString(), 
      });
    } else {
      progress.sections = mergeSections(
        progress.sections,
        progressData.section || []
      );
      progress.lastAccessedTimestamp = new Date().toISOString();
      progress.overallProgress = calculateOverallProgress(progress.sections);
    }

    await progress.save();

    res.status(200).json({
      message: "Successfully updated user's course progress",
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user's course progress",
      error
    });
  }
}
