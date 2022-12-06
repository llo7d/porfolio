import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import ModalSocialMediaUsername from '../../components/ModalSocialMediaUsername';
import { HeartIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import {
  collectionGroup,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { firestore, getUserWithUID } from '../../lib/firebase';
import { IPost, IUserInfo } from '../../lib/interfaces';
import { userAgent } from 'next/server';

type Params = {
  uid: string;
  post: string;
};

export async function getServerSideProps({ params }: { params: Params }) {
  const { uid, post } = params;
  // grab the post from firestore
  // const postQuery = query(
  //   collectionGroup(firestore, 'posts'),
  //   where('uid', '==', uid),
  //   where('slug', '==', post)
  // );

  // Grab the userdata from firestore

  // // const postQuery = getUserWithUID(uid)
  // const postQuery = query(
  //   collectionGroup(firestore, 'users'),
  //   where('uid', '==', uid),
  //   limit(1)
  // );

  // const postsDocs = await getDocs(postQuery);

  // // doc.data() and return as json
  // const postData = postsDocs.docs.map((doc) => {
  //   const data = doc.data();

  //   // turn data into json
  //   const json = JSON.parse(JSON.stringify(data));

  //   return json;
  // });

  const postData = await getUserWithUID(uid);

  const user = postData;

  // const user = 'Test';
  return {
    props: { user },
  };
}

interface Props {
  user: IUserInfo;
  post: IPost;
}
const UserPost: NextPage<Props> = ({ user }) => {
  console.log(user);

  const [isDiscordOpen, setIsDiscordOpen] = useState(false);
  const [isTwitterOpen, setIsTwitterOpen] = useState(false);

  const tags = [
    {
      id: 1,
      label: 'Wireframe',
      color: '#5FBE50',
    },
    {
      id: 2,
      label: 'TailwindCSS',
      color: '#EA5D76',
    },
    {
      id: 3,
      label: 'TailwindCSS',
      color: '#EA5D76',
    },
  ];

  return (
    <div>
      <div>
        <Head>
          <title>Project Details | Project Listings</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="bg-gray-900 min-h-screen pt-14 pb-48 px-28">
          <div className="flex items-center justify-between mb-16">
            <h1 className="text-white font-sans font-medium text-2xl">
              Project Details
            </h1>
          </div>

          <div className="w-[960px] mx-auto">
            <div className="flex bg-gray-800 rounded-xl overflow-hidden">
              <div className="w-[70%] flex flex-col py-8 px-12">
                <div className="flex justify-between">
                  <div className="w-[80%] mb-20">
                    <h2 className="text-xl text-white font-medium mb-5">
                      Portfolio Site Design
                    </h2>
                    <p className="text-white font-sans text-sm whitespace-pre-line leading-5">
                      I made a Wireframe with Figma and I need help to transform
                      it to realiity with css, I was able to somewhat do some of
                      it myself but not fully so I need your help to finish
                      that!
                      {'\n'}I made a Wireframe with Figma and I need help to
                      transform it to realiity with css, I was able to somewhat
                      do some of it myself but not fully so I need your help to
                      finish that!{'\n'}I made a Wireframe with Figma and I need
                      help to transform it to realiity with css, I was able to
                      somewhat do some of it myself but not fully so I need your
                      help to finish that!
                    </p>
                  </div>
                  {/* <button
                    className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center"
                    type="button"
                    onClick={favourite}
                  >
                    <HeartIcon
                      className={`w-4 h-4 ${
                        isFavourite ? 'text-red-500' : 'text-gray-700'
                      }`}
                    />
                  </button> */}
                </div>

                <div className="mb-auto">
                  <h3 className="text-sm text-white font-bold mb-3">
                    Skills and Expertise
                  </h3>
                  <div className="flex gap-2 w-[80%]">
                    {tags.map((tag) => {
                      return (
                        <span
                          key={tag.id}
                          style={{
                            backgroundColor: tag.color,
                          }}
                          className={`text-white text-xs font-sans px-2 py-1 rounded`}
                        >
                          {tag.label}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-white text-xs mt-7">
                    Level Required - Beginner - Posted 2 hours
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-16">
                  Posted on Aug 12, 2020
                </p>
              </div>

              <div className="w-[30%] bg-[#1b232e] pb-8 pt-10 flex flex-col items-center">
                <div className="w-40 h-40 mb-8">
                  <img
                    className="w-40 h-40 rounded-full object-cover"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  />
                </div>
                <div className="w-full px-10 flex flex-col items-center">
                  <p className="text-center font-sans text-white font-bold text-xl mb-8">
                    Peter Smeder
                  </p>
                  <p className="text-center font-sans text-gray-500 text-sm mb-14">
                    A dude who likes to make stuff and create stuff. I am from
                    Huston.
                  </p>
                  <div className="flex items-center gap-5 mb-24">
                    <button
                      type="button"
                      onClick={() => setIsDiscordOpen(true)}
                    >
                      <img className="w-5 h-5" src="/images/icon-discord.png" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsTwitterOpen(true)}
                    >
                      <img className="w-5 h-5" src="/images/icon-twitter.png" />
                    </button>
                  </div>
                  <div className="border-t border-gray-500 w-full mt-auto" />
                  <p className="text-xs text-gray-500 mt-8">
                    Member since Mar 15, 2021
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <ModalSocialMediaUsername
          socialMedia="Discord"
          username="name#1234"
          isOpen={isDiscordOpen}
          onRequestClose={() => setIsDiscordOpen(false)}
        />
        <ModalSocialMediaUsername
          socialMedia="Twitter"
          username="username"
          isOpen={isTwitterOpen}
          onRequestClose={() => setIsTwitterOpen(false)}
        />
      </div>
    </div>
  );
};

export default UserPost;
