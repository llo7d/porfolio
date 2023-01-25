import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  GlobeAmericasIcon,
  QuestionMarkCircleIcon,
  DocumentIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { auth, handleSignInWithGithub } from '../../lib/firebase';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { FirebaseContext } from '../../lib/context';
import Image from 'next/image';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
  const { user, loadingUser } = useContext(FirebaseContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);

      toast.success('🦄 You have logged out!', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  const refModalLoginElement = useRef(null);
  const refModalLogin = useRef<any>(null);

  const refAccountMenuElement = useRef(null);
  const refAccountButtonElement = useRef(null);
  const refAccountDropdown = useRef<any>(null);

  // Responsible for the dropdown menu.
  useEffect(() => {
    import('flowbite').then(() => {
      if (typeof window !== 'undefined') {
        if (refModalLoginElement.current) {
          const options = {
            backdropClasses:
              'bg-black bg-opacity-70 backdrop-blur-sm fixed inset-0 z-40',
            onHide: () => {
              document.body.style.overflow = 'auto';
            },
            onShow: () => {
              document.body.style.overflow = 'hidden';
            },
            onToggle: () => { },
          };

          refModalLogin.current = new Modal(
            refModalLoginElement.current,
            options
          );
        }

        if (refAccountMenuElement.current && refAccountButtonElement.current) {
          refAccountDropdown.current = new Dropdown(
            refAccountMenuElement.current,
            refAccountButtonElement.current,
            {}
          );
        }
      }
    });

    console.log(user);
  }, [user]);

  //Responsible for?? (I don't know what this does.)
  useEffect(() => {
    refAccountDropdown.current?.hide();
  }, [router.asPath]);

  return (
    <div className="pt-16">
      <nav className="fixed top-0 w-full bg-gray-800 border-b border-gray-700 px-28">
        {/* Left side of the navbar */}
        <div className="flex flex-wrap justify-between items-center mx-auto h-16">
          <Link href="/" legacyBehavior>
            <a className="flex items-center">
              {/* <img
                src="/images/portfolio-my-profile-browser-svgrepo-com.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              /> */}
              <span className="self-center text-xl text-white font-semibold whitespace-nowrap">
                Porfolio
              </span>
            </a>
          </Link>

          <div
            className="hidden justify-between items-center w-full absolute left-1/2 -translate-x-1/2 md:flex md:w-auto"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              <li>
                <Link href="/" legacyBehavior>
                  <a
                    className={classnames(
                      'flex items-center py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0',
                      {
                        'text-white': router.pathname === '/',
                        'text-gray-500': router.pathname !== '/',
                      }
                    )}
                  >
                    <Squares2X2Icon className="w-6 h-6 mr-2" />
                    <span>Projects</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/news" legacyBehavior>
                  <a
                    className={classnames(
                      'flex items-center py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0',
                      {
                        'text-white': router.pathname === '/news',
                        'text-gray-500': router.pathname !== '/news',
                      }
                    )}
                  >
                    <GlobeAmericasIcon className="w-6 h-6 mr-2" />
                    <span>News</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/how-it-works">
                <a
                    className={classnames(
                      'flex items-center py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0',
                      {
                        'text-white': router.pathname === '/how-it-works',
                        'text-gray-500': router.pathname !== '/how-it-works',
                      }
                    )}
                  >
                    <QuestionMarkCircleIcon className="w-6 h-6 mr-2" />
                    <span>How It Works</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Logged in User */}
          {loadingUser ? (
            <h1 className="text-white">Loading...</h1>
          ) : (
            <>
              {/* User LoggedIn */}
              {user && (
                <div className="flex items-center">
                  <button
                    ref={refAccountButtonElement}
                    type="button"
                    className="flex items-center text-sm bg-gray-800 rounded-full"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="w-8 h-8 rounded-full object-cover mr-3"
                      src={user?.photoURL as string}
                      width={40}
                      height={40}
                      alt="User Profile Picture"
                      loading="eager"
                    />
                    {/* 
                    <img
                      className="w-8 h-8 rounded-full object-cover mr-3"
                      src={user?.photoURL as string}
                      alt="user photo"
                    /> */}
                    <ChevronDownIcon className="text-gray-500 w-5 h-5" />
                  </button>
                  <div
                    ref={refAccountMenuElement}
                    className="hidden w-64 border overflow-hidden z-50 my-4 list-none bg-gray-800 rounded-xl divide-y border-gray-700 shadow !-translate-x-14 !top-16 !left-auto !right-12"
                    id="user-dropdown"
                  >
                    <ul aria-labelledby="user-menu-button">
                      <li className="px-4 border-b border-gray-700 hover:bg-gray-900">
                        {/* Link to user /profile/{user?.uid} */}
                        <Link href={`/${user?.uid}`} legacyBehavior>
                          {/* <Link legacyBehavior href="/profile/{user?.iod}" > */}
                          <a className="flex items-center py-3 text-sm text-white">
                            <UserIcon className="mr-3 w-6 h-6" />
                            <p className="">My Profile</p>
                          </a>
                        </Link>
                      </li>
                      <li className="px-4 border-b border-gray-700 hover:bg-gray-900">
                        <Link legacyBehavior href={`/${user?.uid}/myposts`}>
                          <a className="flex items-center py-3 text-sm text-white">
                            <DocumentIcon className="mr-3 w-6 h-6" />
                            <p className="">My Posts</p>
                          </a>
                        </Link>
                      </li>
                      {/* To be added in the future */}
                      {/* <li className="px-4 border-b border-gray-700 hover:bg-gray-900">
                        <Link legacyBehavior href="/profile/hearted">
                          <a className="flex items-center py-3 text-sm text-white">
                            <HeartIcon className="mr-3 w-6 h-6" />
                            <p className="">Liked Posts </p>
                          </a>
                        </Link>
                      </li> */}
                      <li>
                        <button
                          className="px-4 flex items-center w-full py-3 text-sm text-red-500 hover:bg-gray-900"
                          onClick={() => {
                            handleSignOut();
                          }}
                        >
                          <ArrowRightOnRectangleIcon className="mr-3 w-6 h-6" />
                          <p className="">Log Out</p>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <button
                    data-collapse-toggle="mobile-menu-2"
                    type="button"
                    className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="mobile-menu-2"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
              {/* User NOT LoggedIn*/}
              {!user && (
                <button
                  className="text-white font-sans"
                  type="button"
                  onClick={() => refModalLogin.current?.show()}
                >
                  Login
                </button>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Login Modal  */}
      <div
        ref={refModalLoginElement}
        id="loginModal"
        tabIndex={-1}
        aria-hidden="true"
        aria-modal="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
        onClick={() => refModalLogin.current?.hide()}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div
            className="relative bg-gray-700 rounded-lg shadow"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={() => refModalLogin.current?.hide()}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <p className="text-center font-sans font-bold my-4 text-gray-300">
                Authentication
              </p>
              <div className="flex flex-col items-center mb-6">
                <button
                  type="button"
                  className="mb-3 w-52 justify-center text-white font-medium bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  onClick={() => {
                    handleSignInWithGithub();
                    refModalLogin.current?.hide();
                  }}
                >
                  <svg
                    className="mr-3 -ml-1 w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="github"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    ></path>
                  </svg>
                  Sign in with Github
                </button>
                {/* // Google */}
              </div>
              <div className="flex items-center justify-center text-sm font-medium text-gray-300">
                <span className="mr-1">What is Portfolior?</span>

                <button
                  className="text-blue-500 hover:underline"
                  type="button"
                  onClick={() => {
                    router.push('/about');
                  }}
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      {children}

      {/* Footer */}
      <div className="h-16 bg-gray-800 border-t border-gray-700 flex items-center px-28">
        <a href="#" className="mr-4">
          <img className="w-6" src="/images/icon-twitter-gray.png" />
        </a>

        <p className="text-gray-500 font-sans font-medium text-sm absolute left-1/2 -translate-x-1/2">
          &copy; 2023 - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Layout;
