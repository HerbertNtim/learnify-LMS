"use client"

import Loading from "@/components/Loading"
import { useGetCoursesQuery } from "@/state/api"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const Search = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const { data: courses, isLoading, isError } = useGetCoursesQuery({})
  const [ selectedCourse, setSelectedCourse ] = useState<Course | null>(null)

  useEffect(() => {
    if(courses) {
      if(id) {
        const course = courses.find((c) => c.courseId === id)
        setSelectedCourse(course || courses[0])
      } else {
        setSelectedCourse(courses[0])
      }
    }
  }, [courses, id])

  if(!isLoading) {
    return <Loading />
  }

  return (
    <div>Search</div>
  )
}

export default Search
