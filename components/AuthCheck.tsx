import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { FirebaseContext } from '../lib/context';
import MustBeSignedIn from './MustBeSignedIn';

const AuthCheck = ({ children }: { children: JSX.Element }) => {
  const { user, loadingUser } = useContext(FirebaseContext);

  if (!user)
    return (
      <div>
        <MustBeSignedIn />
      </div>
      //   <Link href="/enter">
      //     <h1>You must be signed in</h1>
      //   </Link>
    );
  return children;

  //   return username ? props.children : props.fallback || <Link href="/enter">You must be signed in</Link>;

  //   return (
  //     <div>
  //       <h1>AuthCheck</h1>
  //     </div>
  //   );
};

export default AuthCheck;
