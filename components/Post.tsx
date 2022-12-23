import Link from 'next/link';
import { IPost } from '../lib/interfaces';
import dayjs from 'dayjs';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/solid';
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { firestore } from '../lib/firebase';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../lib/context';
import { useContext, useState } from 'react';

const Post: React.FC<IPost> = ({
  title,
  createdAt,
  description,
  slug,
  level,
  tags,
  uid,
  deletePost,
  handleDelete,
}) => {
  const shortDescription = description?.split(' ').slice(0, 25).join(' ');


  const { user, loadingUser } = useContext(FirebaseContext);
  const [canDelete, setCanDelete] = useState(false);


  // This is needed to display the date since the post was created
  dayjs().format();
  dayjs.extend(require('dayjs/plugin/relativeTime'));

  const readableDate = new Date(createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const router = useRouter();




  // Delete post
  const handleDelete1 = async (slug: string, uid: string) => {
    // Delete the post from the database
    const postRef = doc(firestore, 'users', uid, 'posts', slug);

    // Grab the post data
    const postDoc = await getDoc(postRef);

    if (postDoc.exists()) {

      if (user) {

        // Check if the user uid matches the post uid
        if (postDoc.data().uid === user.uid && user.uid === uid) {
          console.log("User uid matches post uid", postDoc.data().uid, user.uid);

          // Delete the post
          // await deleteDoc(postRef);


          // alert the user that the post was deleted
          alert("Post deleted");




        } else {
          // If the user uid does not match the post uid, do nothing
          console.log("Not your post, you can't delete it");


          return;
        }
      }

    }
  };




  return (
    <div className="py-6 px-8 bg-gray-800 rounded-xl mb-8 transition-shadow duration-300 hover:shadow-2xl">
      <div className="flex justify-between">
        <div className="w-[80%]">
          <Link href={`/${uid}/${slug}`}>
            <h2 className="text-xl text-white font-medium mb-5">{title}</h2>
          </Link>
          <p className="text-white text-xs mb-3 ">
            Level Required - {level} - Posted {/* @ts-ignore */}
            {' ' + dayjs(createdAt).fromNow()}
          </p>
          <p className="text-white font-sans mb-6 text-xs">
            {description?.split(' ').length > 25 ? (
              <>
                {shortDescription}
                <Link legacyBehavior href={`/${uid}/${slug}`}>
                  <a className="text-white font-medium"> ...read more</a>
                </Link>
              </>
            ) : (
              <h1 className="text-white font-medium">
                {description}
              </h1>
            )}
          </p>
        </div>

        {/* Delete icon */}
        {deletePost ? (
          <button
            className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center"
            type="button"
            onClick={() => {
              handleDelete(slug, uid);
            }}
          >
            <TrashIcon
              className={`w-4 h-4 ${true ? 'text-red-500' : 'text-gray-700'
                }`}
            />
          </button>
        ) : (
          null
        )}


        {/* // Heart posts as favourite, in the future. */}
        {/* <button
          className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center"
          type="button"
          onClick={onClickFavourite}
        >
          <HeartIcon
            className={`w-4 h-4 ${
              isFavourite ? 'text-red-500' : 'text-gray-700'
            }`}
          />
        </button> */}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 w-[80%]">
          {tags?.map((tag) => {
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
        <p className="text-xs text-gray-400">{readableDate}</p>
      </div>
    </div >
  );
};

export default Post;
