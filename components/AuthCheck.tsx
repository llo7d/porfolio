import React from 'react';
import { useContext } from 'react';
import { FirebaseContext } from '../lib/context';
import MustBeSignedIn from './MustBeSignedIn';
import { NextPage } from 'next';

type Props = {
  uid?: string;
  children: JSX.Element;
};

const AuthCheck: NextPage<Props> = ({ children, uid }) => {
  const { user, loadingUser } = useContext(FirebaseContext);

  // if user is loading, show loading screen
  if (loadingUser)
    return (
      <div>
        <h1>Loading...</h1>
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
        <h1>404 thingy</h1>
      </div>
    );
  }

  // if user is logged in and uid matches, show children
  return children;
};

export default AuthCheck;
