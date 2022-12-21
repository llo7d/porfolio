import { PlusIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useRef, useState } from 'react';
import Post from '../components/Post';
import { FirebaseContext } from '../lib/context';
import { firestore } from '../lib/firebase';
import {
  collectionGroup,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { IPost } from '../lib/interfaces';
import { GetStaticProps } from 'next';
import { async } from '@firebase/util';

const postLimit = 3;
export const getServerSideProps: GetStaticProps = async () => {
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    orderBy('createdAt', 'desc'),
    limit(postLimit)
  );
  const postsDocs = await getDocs(postsQuery);

  // doc.data() and return as json
  const posts = postsDocs.docs.map((doc) => {
    const data = doc.data();

    // turn data into json
    const json = JSON.parse(JSON.stringify(data));

    return json;
  });

  return {
    props: { posts },
  };
};

export default function Home(props: { posts: IPost[] }) {
  const { user, loadingUser } = useContext(FirebaseContext);

  const [posts, setPosts] = useState<IPost[]>(props.posts);
  const [loading, setLoading] = useState(false);
  const [postEnd, setPostEnd] = useState(false);

  // console.log(posts);

  return (
    <div>
      <Head>
        <title>Home | Project Listings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-900 min-h-screen py-14 px-28">
        <div className='w-[960px] mx-auto'>

          {/* Top bar */}
          <div className="flex items-center justify-between mb-16">
            <h1 className="text-white font-sans font-medium text-2xl">
              Projects
            </h1>
            <Link legacyBehavior href="/create">
              <button
                type="button"
                className="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5"
              >
                <PlusIcon className="w-6 h-6 mr-2" />
                <span>Create Project</span>
              </button>
            </Link>
          </div>
          {/* Posts */}
          <div>
            {posts.map((post) => (
              <Post
                key={post.slug}
                title={post.title}
                description={post.description}
                tags={post.tags}
                level={post.level}
                slug={post.slug}
                createdAt={post.createdAt}
                uid={post.uid}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
