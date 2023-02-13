import {
  GlobeAmericasIcon,
  QuestionMarkCircleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Link from 'next/link';
import router from 'next/router';
import classnames from 'classnames';

const NavMobile: React.FC<{}> = ({}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      className={
        'justify-between items-center w-full absolute top-16 left-0 bg-gray-900 md:flex md:w-auto border z-10'
      }
      id='mobile-menu-2'
    >
      <ul className='flex flex-col p-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium transition-all duration-1000 ease-linear'>
        <li>
          <Link href='/' legacyBehavior>
            <a
              className={classnames(
                'flex items-center py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 hover:text-gray-300',
                {
                  'text-white': router.pathname === '/',
                  'text-gray-500': router.pathname !== '/',
                }
              )}
            >
              <Squares2X2Icon className='w-6 h-6 mr-2' />
              <span>Projects</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href='/news' legacyBehavior>
            <a
              className={classnames(
                'flex items-center py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 hover:text-gray-300',
                {
                  'text-white': router.pathname === '/news',
                  'text-gray-500': router.pathname !== '/news',
                }
              )}
            >
              <GlobeAmericasIcon className='w-6 h-6 mr-2' />
              <span>News</span>
            </a>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href='/how-it-works'>
            <a
              className={classnames(
                'flex items-center py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0 hover:text-gray-300',
                {
                  'text-white': router.pathname === '/how-it-works',
                  'text-gray-500': router.pathname !== '/how-it-works',
                }
              )}
            >
              <QuestionMarkCircleIcon className='w-6 h-6 mr-2' />
              <span>How It Works</span>
            </a>
          </Link>
        </li>
      </ul>
    </motion.div>
  );
};

export default NavMobile;
