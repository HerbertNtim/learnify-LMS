import { AlertTriangle } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

interface ErrorProps {
  isError: boolean;
}

const UserError: React.FC<ErrorProps> = ({ isError}) => {
  if (!isError) {
    return (
      <div className="flex flex-col items-center justify-center">
        <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-300">
         LOG IN TO ACCESS COURSES
        </h2>
        <Button
          onClick={() => window.location.reload()}
          className="mt-6 px-8 py-4 bg-blue-500 font-semibold text-2xl text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          <Link className="text-white" href="/signin">Log in</Link>
        </Button>
      </div>
    );
  }

  return null;
}

export default UserError
