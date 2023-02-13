import { NextPage } from 'next';
import React from 'react';

type props = {
  ErrorType?: string;
};
const Loading: NextPage<props> = ({ ErrorType }) => {
  return (
    <main className='bg-gray-900 min-h-screen py-14 px-28'>
      <div className='flex flex-col items-center mb-6'>
        <div>
          <p className='font-sans font-medium text-4xl text-white'>
            {'Loading...'}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Loading;
