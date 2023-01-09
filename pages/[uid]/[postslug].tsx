import React, { useState } from 'react';
import { NextPage } from 'next';
import ModalSocialMediaUsername from '../../components/ModalSocialMediaUsername';
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
import dayjs from 'dayjs';
import MustBeSignedIn from '../../components/MustBeSignedIn';
import Custom404 from '../../components/Custom404';
import Image from 'next/image';

type Params = {
  uid: string;
  postslug: string;
};

export async function getServerSideProps({ params }: { params: Params }) {
  const { uid, postslug } = params;

  // grab the post from firestore
  const postsDocs = await getDocs(
    query(
      collectionGroup(firestore, 'posts'),
      where('uid', '==', uid),
      where('slug', '==', postslug),
      limit(1)
    )
  );

  if (postsDocs.empty) {
    return {
      props: { error: true },
    };
  }

  // doc.data() and return as json
  const postData = postsDocs.docs.map((doc) => {
    const data = doc.data();

    // turn data into json
    const json = JSON.parse(JSON.stringify(data));

    return json;
  });

  // Grab the user data
  const userData = await getUserWithUID(uid);

  return {
    props: { user: userData, post: postData[0], uid },
  };
}

interface Props {
  user: IUserInfo;
  post: IPost;
  uid: string;
  error: boolean;
}
const UserPost: NextPage<Props> = ({ user, post, uid, error }) => {


  const [isDiscordOpen, setIsDiscordOpen] = useState(false);

  // If error, return 404 page
  if (error) {
    return (
      <Custom404 ErrorType="The post you were searching for was not found" />
    );
  }

  // This is needed to display the date since the post was created
  dayjs().format();
  dayjs.extend(require('dayjs/plugin/relativeTime'));


  return (
    <div>
      <div>
        <Head>
          <title>Project Details {post.title}</title>
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
                  <div className="w-[80%] mb-10">
                    <h2 className="text-xl text-white font-medium mb-5">
                      {post.title}
                    </h2>
                    <p className="text-white font-sans text-sm whitespace-pre-line leading-5">
                      {post.description}
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
                    {post.tags.map((tag) => {
                      return (
                        <span
                          key={tag.id}
                          style={{
                            backgroundColor: tag.label,
                          }}
                          className={`text-white text-xs font-sans px-2 py-1 rounded`}
                        >
                          {tag.name}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-white text-xs mt-7">
                    Level Required - Beginner - {/*@ts-ignore  */}
                    {dayjs(post.createdAt.inMiliseconds).fromNow()}
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-16">
                  Posted on {dayjs(post.createdAt.inMiliseconds).format('MMM D, YYYY')}
                </p>
              </div>

              <div className="w-[30%] bg-[#1b232e] pb-8 pt-10 flex flex-col items-center">
                <div className="w-40 h-40 mb-8">
                  <Image src={user.photoURL} width={160} height={160} className="w-40 h-40 rounded-full object-cover" alt='user image' />
                </div>
                <div className="w-full px-10 flex flex-col items-center">
                  <p className="text-center font-sans text-white font-bold text-xl mb-8">
                    {user.displayName ? user.displayName : user.githubUsername}
                  </p>
                  <p className="text-center font-sans text-gray-500 text-sm mb-14">
                    {user.longDescription}
                  </p>
                  <div className="flex items-center gap-5 mb-24">
                    {/* I think later remake this as a component, too much shit and it looks shit */}
                    {user.discordName === 'false' ||
                      user.discordName == null ? null : (
                      <button
                        type="button"
                        onClick={() => setIsDiscordOpen(true)}
                      >
                        <Image src="/images/icon-discord.png" width={20} height={20} alt='discord icon' />
                      </button>
                    )}
                    {user.twitterUsername === 'false' ||
                      user.twitterUsername == null ? null : (
                      <a
                        href={`https://twitter.com/${user.twitterUsername}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="/images/icon-twitter.png"
                          width={20}
                          height={20}
                          alt='twitter icon'
                        />

                      </a>
                    )}
                    <a
                      href={`https://github.com/${user.githubUsername}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        src="/images/icon-github.png"
                        width={20}
                        height={20}
                        alt='github icon'
                      />
                    </a>
                  </div>
                  <div className="border-t border-gray-500 w-full mt-auto" />
                  <p className="text-xs text-gray-500 mt-8">
                    Member since{' '}
                    {dayjs(user.createdAt.seconds * 1000).format('MMM D, YYYY')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <ModalSocialMediaUsername
          socialMedia="Discord"
          // @ts-ignore
          username={user.discordName}
          isOpen={isDiscordOpen}
          onRequestClose={() => setIsDiscordOpen(false)}
          link="https://discord.com"
        />
      </div >
    </div >
  );
};

export default UserPost;
