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
import AuthCheck from '../../components/AuthCheck';
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

  console.log('uid:', uid);

  // check if user.uid === uid
  // if not, redirect to 404 page

  return (
    // if user is not loading, auth check
    loadingUser ? (
      // Make this look better
      <PostLoader />
    ) : (
      <AuthCheck uid={uid}>
        <div>
          <Head>
            <title>Edit Profile | Project Listings</title>
          </Head>
          <main className="bg-gray-900 min-h-screen py-14 px-28">
            {/* // Add check later if user doesnt exist, redirect to 404 page */}

            <div>
              {/* @ts-ignore */}
              <EditProfile userInfo={userInfo} />
            </div>
          </main>
        </div>
      </AuthCheck>
    )
  );
};

export default Uid;
