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
  startAfter,
  startAt,
} from 'firebase/firestore';
import { IPost } from '../lib/interfaces';
import { GetStaticProps } from 'next';

const postLimit = 2;
export const getServerSideProps: GetStaticProps = async () => {


  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    orderBy('createdAtInFirebaseDate', 'desc'),
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

  const getMorePosts = async () => {
    setLoading(true);

    const lastPost = posts[posts.length - 1];

    // Get the last visible document
    console.log("last", lastPost);

    const cursor = lastPost


    const postsQuery = query(
      collectionGroup(firestore, 'posts'),
      orderBy('createdAtInFirebaseDate', 'desc'),
      startAfter(cursor.createdAtInFirebaseDate),
      limit(postLimit)
    );

    const postsDocs = await getDocs(postsQuery);


    const newPosts = postsDocs.docs.map((doc) => {
      const data = doc.data();

      const json = JSON.parse(JSON.stringify(data));

      return json;
    }

    );

    setPosts([...posts, ...newPosts]);
  };


  return (
    <div>
      <Head>
        <title>Home | Project Listings</title>
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
          {/* Load more */}
          {!loading && !postEnd && (
            <button
              onClick={() => {
                getMorePosts();
                console.log(posts);

              }}
              type="button"
              className="flex items-center justify-center w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              <span>Load More</span>
            </button>
          )}
        </div>

      </main>
    </div>
  );
}
