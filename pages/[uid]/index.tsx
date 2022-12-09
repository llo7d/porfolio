import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../lib/context';
import PostLoader from '../../components/PostLoader';
import type { NextPage } from 'next';
import Head from 'next/head';
import EditProfile from '../../components/EditProfile';
import { IUserInfo } from '../../lib/interfaces';
import { getUserWithUID } from '../../lib/firebase';
import { userInfo } from 'os';
// import SocialInput from '../../components/SocialInput';

interface Params {
  uid: string;
}

export async function getServerSideProps({ params }: { params: Params }) {
  const { uid } = params;

  // Grab the user data
  const userData = await getUserWithUID(uid);

  return {
    props: { userInfo: userData, uid },
  };
}

type Props = {
  userInfo: IUserInfo;
  uid: string;
};

const Uid: NextPage<Props> = ({ userInfo, uid }) => {
  const { user, loadingUser } = useContext(FirebaseContext);

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
            {/* @ts-ignore */}
            <EditProfile userInfo={userInfo} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Uid;
