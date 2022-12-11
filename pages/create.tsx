import React from 'react';
import AuthCheck from '../components/AuthCheck';

const CreatePost = () => {
  return (
    <>
      <AuthCheck>
        <div>
          <h1>CreatePost</h1>
        </div>
      </AuthCheck>
    </>
  );
};

export default CreatePost;
