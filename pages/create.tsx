import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import AuthCheck from '../components/AuthCheck';
import SelectionItem from '../components/SelectionItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FirebaseContext } from '../lib/context';
import { useContext } from 'react';
import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { useRouter } from 'next/router';

const SkillToObj = (skills: number[]) => {
  const skillsAsObj: Array<{
    id: number;
    name: string;
    label: string;
  }> = [];

  skills.map((skill: any, index) => {
    if (skill === 1) {
      skillsAsObj.push({
        id: index + 1,
        name: 'Frontend',
        label: '#a34646',
      });
    }
    if (skill === 2) {
      skillsAsObj.push({
        id: index + 1,
        name: 'Wireframe',
        label: '#a34694',
      });
    }
    if (skill === 3) {
      skillsAsObj.push({
        id: index + 1,
        name: 'Scripts',
        label: '#a38946',
      });
    }
    if (skill === 4) {
      skillsAsObj.push({
        id: index + 1,
        name: 'Just talk',
        label: '#76245f',
      });
    }
    if (skill === 5) {
      skillsAsObj.push({
        id: index + 1,
        name: 'Backend',
        label: '#53a346',
      });
    }
    if (skill === 6) {
      skillsAsObj.push({
        id: index + 1,
        name: 'UI/UX',
        label: '#4692a3',
      });
    }
    if (skill === 7) {
      skillsAsObj.push({
        id: index + 1,
        name: 'Just code',
        label: '#7446a3',
      });
    }
  });
  return skillsAsObj;
};

// Function that takes in the Level number and returns the Level as a string
const levelToString = (level: number) => {
  let levelString: string = '';
  if (level === 1) {
    return (levelString = 'beginner');
  }
  if (level === 2) {
    return (levelString = 'intermediate');
  }
  if (level === 3) {
    return (levelString = 'expert');
  }
};

type postType = {
  title: string;
  description: string;
  tags: any;
  level: string | undefined;
  slug?: string;
  createdAt?: number;
  uid?: string;
};
const CreatePost: NextPage = () => {
  const { user, loadingUser } = useContext(FirebaseContext);
  const router = useRouter();

  const [skillIDs, setSkillIDs] = useState<number[]>([]);
  const [levelID, setLevelID] = useState<number>(1);

  const [post, setPost] = useState<postType>({
    title: '',
    description: '',
    tags: [],
    level: '',
  });

  const toggleSkill = (skillID: number) => {
    const isExists = skillIDs.includes(skillID);

    if (isExists) {
      const newSkillIDs = skillIDs.filter((itemID) => {
        return itemID !== skillID;
      });

      setSkillIDs(newSkillIDs);
    } else {
      const newSkillIDs = [...skillIDs, skillID];

      setSkillIDs(newSkillIDs);
    }
  };

  const reformatData = () => {
    // const titleToKebabCase = post.title.toLowerCase().split(' ').join('-');

    const reformetedData = {
      ...post,
      level: levelToString(levelID),
      tags: SkillToObj(skillIDs),
      slug: titleToKebabCase(post.title),
      createdAt: {
        inMiliseconds: new Date().getTime(),
        // inDate that is Timestamp type object
        inFirebaseDate: serverTimestamp(),

      },
      createdAtInFirebaseDate: serverTimestamp(),
      uid: user?.uid,
    };

    return reformetedData;
  };
  const titleToKebabCase = (title: string) => {
    // Remove any duble spaces from the title
    const titleWithoutDubleSpaces = title.replace(/\s+/g, ' ').trim();

    // Remove the space from start or end of the title
    const titleWithoutSpaces = titleWithoutDubleSpaces.replace(
      /^\s+|\s+$/g,
      ''
    );

    // Transform the title to kebab case
    const titleToKebabCase = titleWithoutSpaces
      .toLowerCase()
      .split(' ')
      .join('-');

    return titleToKebabCase;
  };

  const handleSubmit = async () => {
    // 1. Check if the user has written a title that is is longer the 5
    if (post.title.length < 5) {
      toast.info('🦄 Please enter a longer title', {
        position: 'top-right',
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
    // 2. check if the user has written a description
    if (post.description.length < 50) {
      toast.info('🦄 Please enter a longer description', {
        position: 'top-right',
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
    // 3. lets check if the user has selected any skills
    if (skillIDs.length === 0) {
      toast.info('🦄 Please select atleast 1 skill', {
        position: 'top-right',
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
    // 4. check if user hasnt selected more then 3 skills
    if (skillIDs.length > 3) {
      toast.info('🦄 Please select at most 3 skills', {
        position: 'top-right',
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

    if (user) {
      // create a reference to the user document
      const postRef = doc(firestore, 'users', user.uid);

      // create the reference to the users posts collection
      const postsRef = collection(postRef, 'posts');

      // check how many posts the user has
      const postsSnap = await getDocs(postsRef);

      // // if the user has more then 3 posts, dont let him create a new one
      if (postsSnap.size >= 3) {
        toast.warning('🦄 You have reached post limit', {
          position: 'top-right',
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

      if (postsSnap.docs.find((doc) => doc.id === reformatData().slug)) {
        toast.info('🦄 You already have a post with this title', {
          position: 'top-right',
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

      const lastPost = postsSnap.docs[postsSnap.docs.length - 1];

      // check if last post exists
      if (!lastPost) {
        // create the post with the kebab case as the id
        await setDoc(
          doc(postsRef, titleToKebabCase(post.title)),
          reformatData()
        );
        // redirect the user to the post page
        router.push(`/${user.uid}/${titleToKebabCase(post.title)}`);

        toast.success('🦄 You have created your 1st Post! ', {
          position: 'top-right',
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
      // create a date object from the last post
      const lastPostDate = new Date(lastPost.data().createdAt.inMiliseconds);
      // get the current date
      const currentDate = new Date();

      // console.log('lastPostDate:', lastPostDate);
      // console.log('currentDate:', currentDate);

      // get the difference between the last post and the current date in minutes
      const differenceInMinutes = Math.floor(
        (currentDate.getTime() - lastPostDate.getTime()) / 1000 / 60
      );

      // // if the difference is less then 60 minutes, dont let the user create a new post
      // if (differenceInMinutes < 60) {
      //   toast.info(
      //     `🦄 You have to wait ${60 - differenceInMinutes
      //     } minutes before you can create a new post`,
      //     {
      //       position: 'top-right',
      //       autoClose: 2500,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: 'light',
      //     }
      //   );

      //   return;
      // }
      // create the post with the kebab case as the id
      await setDoc(doc(postsRef, titleToKebabCase(post.title)), reformatData())

      router.push(`/${user.uid}/${titleToKebabCase(post.title)}`);

      toast.success('🦄 Post created ', {
        position: 'top-right',
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
  };

  return (
    <AuthCheck uid={user?.uid}>
      <div>
        <Head>
          <title>Create Project | Project Listings</title>
        </Head>

        <main className="bg-gray-900 min-h-screen py-14 px-28">
          <div className="mb-20">
            <h1 className="text-white font-sans font-medium text-2xl mb-16">
              Projects
            </h1>

            <form>
              <div className="mb-14">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-sans font-medium text-gray-400"
                >
                  Title
                </label>
                <p className="text-sm text-gray-400 font-sans mb-2">
                  For example: &quot;Need help with a wireframe&quot;
                </p>
                <input
                  pattern="[A-Za-z]"
                  maxLength={50}
                  type="text"
                  id="title"
                  name="title"
                  className="bg-gray-700 border border-gray-600 placeholder:text-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter project title"
                  value={post.title}
                  spellCheck={false}
                  onChange={(e) => {
                    const cleanedTitle = e.target.value.replace(
                      /[^a-zA-Z0-9\s]/g,
                      ''
                    );
                    setPost({
                      ...post,
                      title: cleanedTitle,
                    });
                  }}
                  required
                />
              </div>
              <div className="mb-14">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-sans font-medium text-gray-400"
                >
                  Description
                </label>
                <p className="text-sm text-gray-400 font-sans mb-2">
                  For example: &quot;I am trying to figure out how to wireframe
                  this new website...&quot;
                </p>
                <textarea
                  id="description"
                  name="description"
                  className="bg-gray-700 border border-gray-600 placeholder:text-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter project description"
                  rows={10}
                  value={post.description}
                  required
                  maxLength={600}
                  onChange={(e) => {
                    // clean up the text from any symbols etc.. but allow emty string as spaces
                    // also no single word can be longer than 20 characters long
                    const cleanedDescription = e.target.value.replace(
                      /[^A-Za-z0-9\s\.\,\?\!]/g,
                      ''
                    ).replace(/\b\w{30,}\b/g, '')

                    setPost({
                      ...post,
                      description: cleanedDescription,
                    });
                  }}
                />
              </div>

              {/* I need help with */}
              <div className="mb-8">
                <p className="block mb-2 text-sm font-sans font-medium text-gray-400">
                  I need help with
                </p>
                <div className="grid grid-cols-4 gap-5" onChange={() => { }}>
                  <SelectionItem
                    name="skill"
                    label="Frontend"
                    value="frontend"
                    icon="/images/icon-frontend.png"
                    isSelected={skillIDs.includes(1)}
                    onClick={() => toggleSkill(1)}
                  />
                  <SelectionItem
                    name="skill"
                    label="Wireframe"
                    value="wireframe"
                    icon="/images/icon-wireframe.png"
                    isSelected={skillIDs.includes(2)}
                    onClick={() => toggleSkill(2)}
                  />
                  <SelectionItem
                    name="skill"
                    label="Scripts"
                    value="scripts"
                    icon="/images/icon-scripts.png"
                    isSelected={skillIDs.includes(3)}
                    onClick={() => toggleSkill(3)}
                  />
                  <SelectionItem
                    name="skill"
                    label="Just Talk"
                    value="just_talk"
                    icon="/images/icon-just-talk.png"
                    isSelected={skillIDs.includes(4)}
                    onClick={() => toggleSkill(4)}
                  />
                  <SelectionItem
                    name="skill"
                    label="Backend"
                    value="backend"
                    icon="/images/icon-backend.png"
                    isSelected={skillIDs.includes(5)}
                    onClick={() => toggleSkill(5)}
                  />
                  <SelectionItem
                    name="skill"
                    label="UI/UX"
                    value="ui_ux"
                    icon="/images/icon-uiux.png"
                    isSelected={skillIDs.includes(6)}
                    onClick={() => toggleSkill(6)}
                  />
                  <SelectionItem
                    name="skill"
                    label="Just Code"
                    value="just_code"
                    icon="/images/icon-just-code.png"
                    isSelected={skillIDs.includes(7)}
                    onClick={() => toggleSkill(7)}
                  />
                  <button
                    type="button"
                    className="flex justify-center text-gray-400 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-sm px-3 py-2.5"
                    onClick={() => {
                      // Redirect to twitter.com, but open in a new tab
                      window.open('https://twitter.com/@dogoo00d');
                    }}
                  >
                    <span className="whitespace-pre-line">
                      Recommend a new one?{'\n'}Contact support
                    </span>
                  </button>
                </div>
              </div>

              {/* Level Recommended */}
              <div className="mb-24">
                <p className="block mb-2 text-sm font-sans font-medium text-gray-400">
                  Level Recommended
                </p>
                <div className="grid grid-cols-4 gap-5" onChange={() => { }}>
                  <SelectionItem
                    name="level"
                    label="Beginner"
                    value="beginner"
                    icon="/images/icon-beginner.png"
                    isSelected={levelID === 1}
                    onClick={() => setLevelID(1)}
                  />
                  <SelectionItem
                    name="level"
                    label="Intermediate"
                    value="intermediate"
                    icon="/images/icon-intermediate.png"
                    isSelected={levelID === 2}
                    onClick={() => setLevelID(2)}
                  />
                  <SelectionItem
                    name="level"
                    label="Expert"
                    value="expert"
                    icon="/images/icon-expert.png"
                    isSelected={levelID === 3}
                    onClick={() => setLevelID(3)}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className="mx-auto text-white hover:text-gray-600 border border-blue-500 hover:border-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => handleSubmit()}
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AuthCheck>
  );
};

export default CreatePost;
