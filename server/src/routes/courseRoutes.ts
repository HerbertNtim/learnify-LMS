import { Router } from "express";
import { getCourse, listCourses } from "../controllers/courseController";

const courseRouter = Router()

courseRouter.get("/", listCourses)
courseRouter.get("/:courseId", getCourse)

export default courseRouter
