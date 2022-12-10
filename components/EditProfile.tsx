import React, { MouseEventHandler, useState } from 'react';
import type { NextPage } from 'next';
import { IUserInfo } from '../lib/interfaces';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';

interface Props {
  userInfo: IUserInfo;
}
const EditProfile: NextPage<Props> = ({ userInfo }) => {
  const [updateProfile, setUpdateProfile] = useState({
    name: userInfo.displayName ? userInfo.displayName : userInfo.githubUsername,
    shortDescription: userInfo.shortDescription,
    longDescription: userInfo.longDescription,
    discord: userInfo.discordName,
    twitter: userInfo.twitterUsername,
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    // Check the last time the user updated their profile and if it was less than 24 hours ago, dont let them update it
    if (userInfo.lastUpdated) {
      // create a new date object from the lastUpdated timestamp which is in seconds
      const lastUpdated = new Date(userInfo.lastUpdated);
      const now = new Date();
      const diff = now.getTime() - lastUpdated.getTime();
      const diffHours = diff / (1000 * 3600);
      const diffMinutes = diff / (1000 * 60);

      console.log(
        'lastUpdated: ',
        lastUpdated,
        'now:',
        now,
        diffHours,
        diff,
        'diffMinutes: ',
        diffMinutes
      );

      // If diffrence is less than 60 minute, dont let them update their profile
      if (diffMinutes < 60) {
        // show the toast.error with a slide in animation
        toast.error(
          '🦄 You can only update your profile once every 60 minute',
          {
            position: 'top-center',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
        return;
      }
      // toast.error(
      //   '🦄 You can only update your profile once every 60 minute',
      //   {
      //     position: 'top-center',
      //     autoClose: 2500,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'light',
      //   }
      // );
      // return;
    }

    // Check if there is any changes in the form
    if (
      updateProfile.name === userInfo.displayName &&
      updateProfile.shortDescription === userInfo.shortDescription &&
      updateProfile.longDescription === userInfo.longDescription &&
      updateProfile.discord === userInfo.discordName &&
      updateProfile.twitter === userInfo.twitterUsername
    ) {
      toast.info('🦄 No changes made', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    // Check if the user left any fields as an empty string
    if (
      updateProfile.name === '' ||
      updateProfile.shortDescription === '' ||
      updateProfile.longDescription === ''
    ) {
      // Notify the user that they cant leave any fields empty and tell them the field that is empty
      if (updateProfile.name === '') {
        setUpdateProfile({
          ...updateProfile,
          name: '',
        });

        toast.error('🦄 Cant leave the NAME field empty', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else if (updateProfile.shortDescription === '') {
        toast.error('🦄 Cant leave shortDescriptio field emtpy', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else if (updateProfile.longDescription === '') {
        // Set the placeholder text to an empty string so that the user can see the placeholder text
        setUpdateProfile({
          ...updateProfile,
          longDescription: '',
        });

        toast.error('🦄 Cant leave longDescription field emtpy', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }

      return;
    }

    // If all the checks are passed, update the database
    await updateDoc(doc(firestore, 'users', userInfo.uid), {
      // Include all the that is already in the database
      ...userInfo,
      displayName: updateProfile.name,
      shortDescription: updateProfile.shortDescription,
      longDescription: updateProfile.longDescription,
      discordName: updateProfile.discord,
      twitterUsername: updateProfile.twitter,
      // update the lastUpdated field with the current time in seconds
      lastUpdated: new Date().getTime(),
    });

    //@ts-ignore Reload the page with nextjs
    Router.reload(window.location.pathname);

    toast.success('🦄 Wow profile is updated', {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <div>
      <main className="bg-gray-900 min-h-screen py-14 px-28">
        <div>
          <h1 className="text-white font-sans font-medium text-2xl mb-10">
            Profile
          </h1>

          <form>
            {/* <form> */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-3 text-sm font-sans font-medium text-gray-400"
              >
                Name
              </label>

              {/* If maxLenght for Name is reached, show a message */}

              <input
                maxLength={15}
                type="text"
                id="name"
                name="name"
                className="bg-gray-700 border border-gray-600 placeholder-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={updateProfile.name}
                // placeholder={
                //   userInfo.displayName
                //     ? userInfo.displayName
                //     : userInfo.githubUsername
                // }
                onChange={(e) =>
                  setUpdateProfile({
                    ...updateProfile,
                    name: e.target.value,
                  })
                }
                required
              />
              {/* <p className="mt-3">
                <span className="text-sm text-gray-400 font-sans mb-2 ">
                  You have {15 - updateProfile.name.length} characters left
                </span>
              </p> */}
            </div>
            <div className="mb-6">
              <label
                htmlFor="shortDescription"
                className="block mb-3 text-sm font-sans font-medium text-gray-400"
              >
                Short Description
              </label>
              <p className="text-sm text-gray-400 font-sans mb-2">
                For example: &quot;Wireframes&quot;
              </p>
              <input
                maxLength={45}
                type="text"
                id="shortDescription"
                name="shortDescription"
                className="bg-gray-700 border border-gray-600 placeholder-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={updateProfile.shortDescription}
                // placeholder={userInfo.shortDescription}
                onChange={(e) =>
                  setUpdateProfile({
                    ...updateProfile,
                    shortDescription: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block mb-3 text-sm font-sans font-medium text-gray-400"
              >
                Description
              </label>
              <p className="text-sm text-gray-400 font-sans mb-2">
                For example: &quot;Fan of UI/UX Designs and here to help you
                come up with ideas&quot;
              </p>
              <textarea
                maxLength={120}
                id="description"
                name="description"
                className="bg-gray-700 border border-gray-600 placeholder-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                // placeholder={userInfo.longDescription}
                value={updateProfile.longDescription}
                rows={5}
                onChange={(e) =>
                  setUpdateProfile({
                    ...updateProfile,
                    longDescription: e.target.value,
                  })
                }
                required
              />
            </div>
            {/* Discord */}
            <div className="grid grid-cols-12 gap-12 mb-2">
              <div className="col-span-5">
                <p className="block mb-3 text-sm font-sans font-medium text-gray-400">
                  Links
                </p>
                <div className="flex mb-4">
                  <div className="inline-flex items-center w-28 px-2 pr-3 text-sm text-gray-900 bg-gray-600 rounded-l-md border border-r-0 border-gray-600 select-none">
                    <img
                      className="w-8 h-8 mr-2"
                      src={'/images/icon-discord-framed.png'}
                    />
                    <p className="font-sans text-white font-medium">
                      {'Discord'}
                    </p>
                  </div>
                  <input
                    maxLength={32}
                    type="text"
                    name={'discordUsername'}
                    className="rounded-none placeholder:text-gray-400 text-center rounded-r-lg bg-gray-700 border text-white focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-600 p-2.5"
                    placeholder={
                      userInfo.discordName
                        ? (userInfo.discordName as string)
                        : `Enter your discord username`
                    }
                    onChange={(e) =>
                      setUpdateProfile({
                        ...updateProfile,
                        discord: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            {/* Twitter */}
            <div className="grid grid-cols-12 gap-12 mb-24">
              <div className="col-span-5">
                <div className="flex mb-4">
                  <div className="inline-flex items-center w-28 px-2 pr-3 text-sm text-gray-900 bg-gray-600 rounded-l-md border border-r-0 border-gray-600 select-none">
                    <img
                      className="w-8 h-8 mr-2"
                      src={'/images/icon-twitter-framed.png'}
                    />
                    <p className="font-sans text-white font-medium">
                      {'Twitter'}
                    </p>
                  </div>
                  <input
                    maxLength={20}
                    type="text"
                    name={'twitterUsername'}
                    className="rounded-none placeholder:text-gray-400 text-center rounded-r-lg bg-gray-700 border text-white focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-600 p-2.5"
                    placeholder={
                      userInfo.twitterUsername
                        ? (userInfo.twitterUsername as string)
                        : `Enter your twitter username`
                    }
                    onChange={(e) =>
                      setUpdateProfile({
                        ...updateProfile,
                        twitter: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={handleClick}
                type="button"
                className="mx-auto text-white hover:text-gray-600 border border-blue-500 hover:border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
