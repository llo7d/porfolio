import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Card } from 'flowbite-react';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import Post from '../components/Post';
import { FirebaseContext } from '../lib/context';

export default function Home() {
  const { user, loadingUser } = useContext(FirebaseContext);

  return (
    <div>
      <Head>
        <title>Home | Project Listings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-900 min-h-screen py-14 px-28">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-white font-sans font-medium text-2xl">
            Projects
          </h1>
          <Link legacyBehavior href="/projects/create">
            <a>
              <button
                type="button"
                className="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                <PlusIcon className="w-6 h-6 mr-2" />
                <span>Create Project</span>
              </button>
            </a>
          </Link>
        </div>
        {/* Posts */}
        <div>
          <Post
            title="Portfolio site design"
            url="/projects/portfolio-site-design"
            body="I made a Wireframe with Figma and I need help to transform it to realiity with css, I was able to somewhat do some of it myself but not fully so I need your help to finish that!"
            level="Beginner"
            date="Aug 12, 2020"
            posted="2 hours ago"
            tags={[
              {
                id: 1,
                label: 'Wireframe',
                color: '#5FBE50',
              },
              {
                id: 2,
                label: 'UI/UX',
                color: '#4692A3',
              },
              {
                id: 3,
                label: 'TailwindCSS',
                color: '#EA5D76',
              },
            ]}
          />
        </div>
      </main>
    </div>
  );
}
