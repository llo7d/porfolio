import React from 'react';
import { useContext } from 'react';
import { FirebaseContext } from '../lib/context';
import MustBeSignedIn from './MustBeSignedIn';
import { NextPage } from 'next';
import Custom404 from './Custom404';
import Loading from './Loading';

type Props = {
  uid?: string;
  children: JSX.Element;
  fallback?: JSX.Element;
};

const AuthCheck: NextPage<Props> = ({ children, uid, fallback }) => {
  const { user, loadingUser } = useContext(FirebaseContext);


  // if user is loading, show loading screen
  if (loadingUser)
    return (
      <div>
        <Loading />
      </div>
    );

  // if user is not logged in, show must be signed in screen
  if (!user)
    return (
      <div>
        <MustBeSignedIn />
      </div>
    );

  // if logged user id does not match param uid, show 404 page
  if (user?.uid !== uid) {
    return (
      <div>
        <Custom404 ErrorType="This is not your profile" />
      </div>
    );
  }


  // if user is logged in and uid matches, show children
  return children;
};

export default AuthCheck;
