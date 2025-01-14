import { Router } from "express";
import { createCourse, deleteCourse, getCourse, listCourses, updateCourse } from "../controllers/courseController";
import { requireAuth } from "@clerk/express";
import multer from "multer";

const courseRouter = Router()

const upload = multer({ storage: multer.memoryStorage() });

courseRouter.get("/", listCourses)
courseRouter.get("/:courseId", getCourse)
courseRouter.post("/", requireAuth(), createCourse)
courseRouter.put("/:courseId", requireAuth(), upload.single("image"), updateCourse)
courseRouter.delete("/:courseId", requireAuth(), deleteCourse)

export default courseRouter
