import { Request, Response } from 'express'
import Course from '../models/courseModel'
import { v4 as uuidv4 } from 'uuid';

export const listCourses = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.query
  try {
    const courses =  category && category !== "all" ? await Course.scan("category").eq(category).exec() : await Course.scan().exec();

    res.status(200).json({ message: "Courses retrieved successfully ", data: courses })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving courses", error });
  }
}

export const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  try {
    const course =  await Course.get(courseId);
    if(!course) {
      res.status(404).json({ message: "Course not found"})
    }

    res.status(200).json({ message: "Courses retrieved successfully ", data: course })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving course", error });
  }
}

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teacherId, teacherName } = req.body;

    if (!teacherId || !teacherName) {
      res.status(400).json({ message: "Please provide teacherId and teacherName" });
      return;
    }

    const newCourse = new Course({
      courseId: uuidv4(),
      teacherId,
      teacherName,
      title: "Untitled Course",
      description: "",
      category: "No categorized",
      image: '',
      price: 0,
      level: "Beginner",
      status: "Draft",
      sections: [],
      enrollment: []
    })
    await newCourse.save();

    res.status(200).json({ message: "Course created successfully ", data: newCourse })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving course", error });
  }
}
