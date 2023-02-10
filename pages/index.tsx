import { PlusIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Post from "../components/Post";
import { FirebaseContext } from "../lib/context";
import { firestore, fromMillis } from "../lib/firebase";
import {
  collectionGroup,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { IPost } from "../lib/interfaces";
import { GetStaticProps } from "next";
import PostLoader from "../components/PostLoader";
import { LayoutGroup } from "framer-motion";

export const getServerSideProps: GetStaticProps = async () => {
  const postsQuery = query(
    collectionGroup(firestore, "posts"),
    orderBy("createdAt", "desc"),
    limit(5)
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
  const [postLimit, setPostLimit] = useState(10);

  const getMorePosts = async () => {
    setLoading(true);

    const postsQuery = query(
      collectionGroup(firestore, "posts"),
      orderBy("createdAt", "desc"),
      limit(postLimit)
    );

    const postsDocs = await getDocs(postsQuery);

    const newPosts = postsDocs.docs.map((doc) => {
      const data = doc.data();

      const json = JSON.parse(JSON.stringify(data));

      return json;
    });

    setPostLimit(postLimit + 5);
    setLoading(false);
    setPosts([...newPosts]);

    // If post are same lenght as newposts, then there are no more posts
    if (posts.length === newPosts.length) {
      setPostEnd(true);

      toast.error("🦄 No more posts", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Home | Project Listings</title>
        <meta property="og:title" content="Project Listings" key="projects" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>

      <main className="bg-gray-900 min-h-screen py-14 px-10 md:px-28">
        <div className="md:w-[80%] lg:w-[70%] w-[100%] transition-all duration-300 ease-in-out mx-auto">
          {/* Top bar */}
          <div className="flex flex-col gap-5 md:flex-row md:gap-0 items-center justify-between mb-16">
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
          <LayoutGroup>
            {/* Posts */}
            <div className="flex justify-center flex-col">
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
            {/* Load more */}
            {loading && <PostLoader />}
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
          </LayoutGroup>
        </div>
      </main>
    </div>
  );
}
