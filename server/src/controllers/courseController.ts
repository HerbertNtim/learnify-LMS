import { Request, Response } from 'express'
import Course from '../models/courseModel'
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from '@clerk/express';

const s3 = new AWS.S3()

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

export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  const updateData = { ...req.body };
  const { userId } = getAuth(req);

  try {
    const course = await Course.get(courseId);
    if(!course) {
      res.status(404).json({ message: "Course not found"})
      return;
    }

    if(course.teacherId !== userId) {
      res.status(403).json({ message: "You are not allowed to update this course" })
      return;
    }

    if (updateData.price) {
      const price = parseInt(updateData.price);

      if(isNaN(price)) {
        res.status(400).json({ message: "Invalid price format", error: "Price should be a number" })
        return;
      }

      updateData.price = price * 100;
    }

    if (updateData.sections) {
      const sectionData = typeof updateData.sections === 'string' ? JSON.parse(updateData.sections) : updateData.sections;

      updateData.sections = sectionData.map((section: any) => ({
        ...section,
        sectionId: section.sectionId || uuidv4(),
        chapters: section.chapters.map((chapter: any) => ({
          ...chapter,
          chapterId: chapter.chapterId || uuidv4(),
        }))
      }));
    }

    Object.assign(course, updateData)
    await course.save()

    res.status(200).json({ message: "Course updated successfully ", data: course })
  } catch (error: any) {
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
}

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  const { courseId } = req.params;
  const { userId } = getAuth(req);

  try {
    const course = await Course.get(courseId);
    if(!course) {
      res.status(404).json({ message: "Course not found"})
      return;
    }

    if(course.teacherId !== userId) {
      res.status(403).json({ message: "You are not allowed to delete this course" })
      return;
    }

    await Course.delete(courseId);

    res.status(200).json({ message: "Course deleted successfully "})
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
}

// AWS s3 uploads
export const getUploadVideoUrl = async (req: Request, res: Response): Promise<void> => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    res.status(400).json({ message: "Please provide fileName and fileType" });
    return;
  }

  try {
    const uniqueId = uuidv4()

    const s3Key = `videos/${uniqueId}/${fileName}`;

    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME || "",
      Key: s3Key,
      Expires: 60,
      ContentType: fileType,
    }

    const uploadUrl = s3.getSignedUrl('putObject', s3Params);
    const videoUrl = `${process.env.CLOUDFRONT_DOMAIN}/videos/${uniqueId}/${fileName}`;

    res.status(200).json({ message: "Upload URL generated successfully", data: { uploadUrl, videoUrl } })
  } catch (error) {
    res.status(500).json({ message: "Error uploading video", error });
  }
}
