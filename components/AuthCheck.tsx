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

  if (loadingUser)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (!user)
    return (
      <div>
        <MustBeSignedIn />
      </div>
    );

  return children;
};

export default AuthCheck;
