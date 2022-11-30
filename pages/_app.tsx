import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import { FirebaseContext } from '../lib/context';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { StrictMode } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [user, loadingUser, error] = useAuthState(auth);

  return (
    <StrictMode>
      <FirebaseContext.Provider value={{ user, loadingUser }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FirebaseContext.Provider>
    </StrictMode>
  );
}
