import {
  UserIcon,
  SunIcon,
  ArrowRightOnRectangleIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  GlobeAmericasIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
  const [isDarkModeActive, setIsDarkModeActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const router = useRouter();

  const refModalLoginElement = useRef(null);
  const refModalLogin = useRef<any>(null);

  const refAccountMenuElement = useRef(null);
  const refAccountButtonElement = useRef(null);
  const refAccountDropdown = useRef<any>(null);

  return (
    <div className="pt-16">
      {/* NavBar */}
      <h1>NavBar</h1>
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-gray-800 border-b border-gray-700 px-28">
        <div className="flex flex-wrap justify-between items-center mx-auto h-16">
          <Link href="/">
            <a className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl text-white font-semibold whitespace-nowrap">
                Site Name
              </span>
            </a>
          </Link>

          {/* Menu */}
          <div
            className="hidden justify-between items-center w-full absolute left-1/2 -translate-x-1/2 md:flex md:w-auto"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              <li>
                <Link href="/">
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
                <Link href="/news">
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
                <Link href="/">
                  <a className="flex items-center py-2 pr-4 pl-3 text-gray-500 rounded md:hover:bg-transparent md:p-0">
                    <QuestionMarkCircleIcon className="w-6 h-6 mr-2" />
                    <span>How It Works</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {isLoggedIn && (
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
                <img
                  className="w-8 h-8 rounded-full object-cover mr-3"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
                <ChevronDownIcon className="text-gray-500 w-5 h-5" />
              </button>
              <div
                ref={refAccountMenuElement}
                className="hidden w-64 border overflow-hidden z-50 my-4 list-none bg-gray-800 rounded-xl divide-y border-gray-700 shadow !-translate-x-14 !top-16 !left-auto !right-12"
                id="user-dropdown"
              >
                <ul aria-labelledby="user-menu-button">
                  <li className="px-4 border-b border-gray-700 hover:bg-gray-900">
                    <Link href="/profile/edit">
                      <a className="flex items-center py-3 text-sm text-white">
                        <UserIcon className="mr-3 w-6 h-6" />
                        <p className="">My Profile</p>
                      </a>
                    </Link>
                  </li>
                  <li className="px-4 border-b border-gray-700 hover:bg-gray-900">
                    <div className="flex items-center py-3 text-sm text-white">
                      <SunIcon className="mr-3 w-6 h-6" />
                      <p className="mr-auto">Dark Theme</p>
                      <label
                        htmlFor="checked-toggle"
                        className="inline-flex relative items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value=""
                          id="checked-toggle"
                          className="sr-only peer"
                          checked={isDarkModeActive}
                          onChange={() =>
                            setIsDarkModeActive(!isDarkModeActive)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </li>
                  <li>
                    <button
                      className="px-4 flex items-center w-full py-3 text-sm text-red-500 hover:bg-gray-900"
                      onClick={() => setIsLoggedIn(false)}
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
          {!isLoggedIn && (
            <button
              className="text-white font-sans"
              type="button"
              onClick={() => refModalLogin.current?.show()}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Main content */}
      {children}

      {/* Footer */}
      <h1>Footer</h1>
    </div>
  );
};

export default Layout;
