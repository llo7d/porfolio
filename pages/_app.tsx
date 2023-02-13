import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import { FirebaseContext } from '../lib/context';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { StrictMode } from 'react';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  const [user, loadingUser, error] = useAuthState(auth);

  return (
    <StrictMode>
      <FirebaseContext.Provider value={{ user, loadingUser }}>
        {/* <ToastContainer /> */}
        <ToastContainer
          position='top-center'
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme='light'
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FirebaseContext.Provider>
    </StrictMode>
  );
}
