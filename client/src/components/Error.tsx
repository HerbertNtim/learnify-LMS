import { AlertTriangle } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

interface ErrorProps {
  isError: boolean;
  title?: string;
  courses?: Course[] | Course;
}

const Error: React.FC<ErrorProps> = ({ isError, courses, title }) => {
  if (!isError || !courses) {
    return (
      <div className="flex flex-col items-center justify-center">
        <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-300">
           Unable to Fetch Courses
        </h2>
        <p className="text-gray-400 mt-2 text-center text-lg">
          {title || "Something went wrong while loading the courses. Please check your internet connection or try again later"}.
        </p>
        <div>
          {title ? (
            <Link href="/search" className="mt-6 px-8 py-4 bg-blue-500 font-semibold text-2xl text-white rounded-md hover:bg-blue-600 transition duration-200">Search Courses</Link>
          ) : (
            <Button
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-4 bg-blue-500 font-semibold text-2xl text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Retry
          </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default Error
