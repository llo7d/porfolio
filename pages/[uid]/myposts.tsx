import React from 'react';
import AuthCheck from '../../components/AuthCheck';
import { firestore, getUserWithUID } from '../../lib/firebase';
import { NextPage } from 'next';
import { IPost, IUserInfo } from '../../lib/interfaces';
import Custom404 from '../../components/Custom404';
import { collection, getDocs, limit, orderBy, query, doc, getDoc, deleteDoc } from 'firebase/firestore';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';
import Post from '../../components/Post';
import { useState } from 'react';

interface Params {
  uid: string;
}

export async function getServerSideProps({ params }: { params: Params }) {
  const { uid } = params;

  // Grab the user data
  const userData = await getUserWithUID(uid);

  if (!userData) {
    return {
      props: { error: true },
    };
  }

  // Check if the user 
  // Grab the posts data

  const postsRef = query(collection(firestore, 'users', uid, 'posts'));

  // get the first 10 posts

  const postsQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(5));
  const postsDocs = await getDocs(postsQuery);

  // doc.data() and return as json
  const posts = postsDocs.docs.map((doc) => {
    const data = doc.data();

    // turn data into json
    const json = JSON.parse(JSON.stringify(data));

    return json;
  });

  // check if posts is empty, if yes, return empty array
  if (posts.length === 0) {
    return {
      props: { posts: [], userInfo: userData, uid },
    }
  }

  // return posts with userinfo and the uid paramter
  return {
    props: { posts, userInfo: userData, uid },
  };


}

type Props = {
  userInfo: IUserInfo;
  uid: string;
  error: boolean;
  posts: any;
};


const MyPosts: NextPage<Props> = ({ userInfo, uid, error, posts }) => {
  const [postsArray, setPostsArray] = useState<IPost[]>(posts);

  if (error) {
    return (
      <div>
        <Custom404 ErrorType="Page not found" />
      </div>
    );
  }

  return (
    <>
      {/* <AuthCheck fallback={<SignIn />}> */}
      <AuthCheck uid={uid} fallback={<h1>Sorry, you must be signed in to view this page.</h1>}>
        <div>
          <main className="bg-gray-900 min-h-screen py-14 px-28">
            {/* Top bar */}
            <div className='w-[960px] mx-auto'>

              {/* Create a text that is in the center of the page, that says My POSTS */}
              <div className="flex items-center justify-center ">
                <h1 className="text-4xl font-bold text-white">My posts</h1>
              </div>

              <div className="flex items-center justify-between mb-16">

              </div>
              {/* If posts array is empty show a button that says "create post" else show the posts */}
              {posts.length === 0 ? (
                <>
                  {/* // text in white that says "You have no posts..." */}

                  <div className="flex items-center justify-center">
                    {/* // button that says "create post" */}

                    <Link href="/create">
                      <button
                        type="button"
                        className="flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5"
                      >
                        <PlusIcon className="w-6 h-6 mr-2" />
                        <span>Create post</span>
                      </button>
                    </Link>
                  </div>
                </>
              ) : (

                <div>
                  {/* @ts-ignore */}
                  {postsArray.map((post) => (
                    <Post
                      key={post.slug}
                      title={post.title}
                      description={post.description}
                      tags={post.tags}
                      level={post.level}
                      slug={post.slug}
                      createdAt={post.createdAt}
                      uid={post.uid}
                      deletePost={true}
                      postsArray={postsArray}
                      setPostsArray={setPostsArray}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </AuthCheck>
    </>);
};

export default MyPosts;
