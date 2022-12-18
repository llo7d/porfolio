import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../lib/context';
import PostLoader from '../../components/PostLoader';
import type { NextPage } from 'next';
import Head from 'next/head';
import EditProfile from '../../components/EditProfile';
import { IUserInfo } from '../../lib/interfaces';
import { getUserWithUID } from '../../lib/firebase';
import AuthCheck from '../../components/AuthCheck';

interface Params {
  uid: string;
}

export async function getServerSideProps({ params }: { params: Params }) {
  const { uid } = params;

  // Grab the user data
  const userData = await getUserWithUID(uid);

  if (!userData) {
    return {
      props: { error: true },
    };
  }

  return {
    props: { userInfo: userData, uid },
  };
}

type Props = {
  userInfo: IUserInfo;
  uid: string;
  error: boolean;
};

const EditProfilePage: NextPage<Props> = ({ userInfo, uid, error }) => {
  const { user, loadingUser } = useContext(FirebaseContext);

  if (error) {
    return (
      <div>
        <h1>404</h1>
      </div>
    );
  }
  // console.log('uid:', uid);

  // check if user.uid === uid
  // if not, redirect to 404 page

  // if (user?.uid !== uid) {
  //   return (
  //     <div>
  //       <h1>404</h1>
  //     </div>
  //   );
  // }
  return (
    // if user is not loading, auth check

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
  );
};

export default EditProfilePage;
