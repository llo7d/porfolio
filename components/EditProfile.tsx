import React from 'react';
import type { NextPage } from 'next';

const EditProfile: NextPage = () => {
  return (
    <div>
      <main className="bg-gray-900 min-h-screen py-14 px-28">
        <div className="mb-10">
          <h1 className="text-white font-sans font-medium text-2xl mb-10">
            Profile
          </h1>

          <form>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-3 text-sm font-sans font-medium text-gray-400"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-700 border border-gray-600 placeholder-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your name"
                value="Peter Sneeper"
                required
              />
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
                type="text"
                id="shortDescription"
                name="shortDescription"
                className="bg-gray-700 border border-gray-600 placeholder-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your short description"
                value="Wireframes"
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
                id="description"
                name="description"
                className="bg-gray-700 border border-gray-600 placeholder-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your description"
                rows={5}
                value="I like UI/UX Designs and love to come up with new ideas!"
                required
              />
            </div>
            <div className="grid grid-cols-12 gap-12 mb-24">
              <div className="col-span-5">
                <p className="block mb-3 text-sm font-sans font-medium text-gray-400">
                  Links
                </p>
                {/* <SocialInput
            name="discordUsername"
            placeholder="Enter your Discord username"
            value="name#1234"
            socialMediaIcon="/images/icon-discord-framed.png"
            socialMediaLabel="Discord"
          />
          <SocialInput
            name="twitterUsername"
            placeholder="Enter your Twitter username"
            value="username"
            socialMediaIcon="/images/icon-twitter-framed.png"
            socialMediaLabel="Twitter"
          /> */}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <button
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
