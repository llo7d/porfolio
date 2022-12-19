import { NextPage } from 'next';
import React from 'react';

type props = {
  ErrorType: string;
};
const Custom404: NextPage<props> = ({ ErrorType }) => {
  return (
    <main className="bg-gray-900 min-h-screen py-14 px-28">
      <div className="flex flex-col items-center mb-6">
        <div>
          <p className="font-sans font-medium text-4xl text-white">
            {ErrorType}
          </p>
          <div className="flex justify-center mt-6">
            {/* // Button that redirects to the front page of the website and is styled with Tailwind CSS classes and while on hover it changes the background color to gray-700 */}
            <a
              href="/"
              className="bg-gray-800 hover:bg-gray-700 text-white font-sans font-medium text-sm px-6 py-2 rounded-md"
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Custom404;
