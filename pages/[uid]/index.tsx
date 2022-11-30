import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../lib/context';
import PostLoader from '../../components/PostLoader';
import type { NextPage } from 'next';
import Head from 'next/head';
import EditProfile from '../../components/EditProfile';
// import SocialInput from '../../components/SocialInput';

const Uid: NextPage = () => {
  const { user, loadingUser } = useContext(FirebaseContext);

  const router = useRouter();
  const { uid } = router.query;

  return (
    <div>
      <Head>
        <title>Edit Profile | Project Listings</title>
      </Head>
      <main className="bg-gray-900 min-h-screen py-14 px-28">
        {/* // Add check later if user doesnt exist, redirect to 404 page */}
        {loadingUser ? (
          <PostLoader />
        ) : (
          <div>
            {/* Pass the profile compents etc.. later */}
            <EditProfile />
          </div>
        )}
      </main>
    </div>
  );
};

export default Uid;
