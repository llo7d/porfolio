import React from 'react';
import { useRouter } from 'next/router';

const UserPost = () => {
  const { asPath } = useRouter();

  return (
    <div>
      <h1>{asPath}</h1>
    </div>
  );
};

export default UserPost;
