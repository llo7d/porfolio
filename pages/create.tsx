import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import AuthCheck from '../components/AuthCheck';
import SelectionItem from '../components/SelectionItem';

// // Function that takes in an array of number skills and returns an array of skills as strings
// const IdToString = (skills: number[]) => {
//   const skillsAsStrings: string[] = [];
//   skills.map((skill: any) => {
//     if (skill === 1) {
//       skillsAsStrings.push('frontend');
//     }
//     if (skill === 2) {
//       skillsAsStrings.push('wireframe');
//     }
//     if (skill === 3) {
//       skillsAsStrings.push('scripts');
//     }
//     if (skill === 4) {
//       skillsAsStrings.push('just talk');
//     }
//     if (skill === 5) {
//       skillsAsStrings.push('backend');
//     }
//     if (skill === 6) {
//       skillsAsStrings.push('ui/ux');
//     }
//     if (skill === 7) {
//       skillsAsStrings.push('just code');
//     }
//   });
//   return skillsAsStrings;
// };

const SkillToObj = (skills: number[]) => {
  const skillsAsObj: any[] = [];
  skills.map((skill: any, index) => {
    if (skill === 2) {
      skillsAsObj.push({
        id: index,
        name: 'Wireframe',
        label: '#5FBE50',
      });
    }
    console.log(index + 1);
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
  skills: any;
  level: string | undefined;
};
const CreatePost: NextPage = () => {
  const [skillIDs, setSkillIDs] = useState<number[]>([]);
  const [levelID, setLevelID] = useState<number>(1);

  // create a post object, with typescript types
  // const [post, setPost] = useState<postType>({
  //   title: '',
  //   description: '',
  //   skills: [''],
  //   level: '',
  // });

  const [post, setPost] = useState<postType>({
    title: '',
    description: '',
    skills: [],
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

  const setupPostAsJson = () => {
    setPost({
      ...post,
      skills: SkillToObj(skillIDs),
      level: levelToString(levelID),
    });
    console.log(post);
  };

  console.log(post);

  return (
    <AuthCheck>
      <div>
        <Head>
          <title>Create Project | Project Listings</title>
          <link rel="icon" href="/favicon.ico" />
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
                  maxLength={50}
                  type="text"
                  id="title"
                  name="title"
                  className="bg-gray-700 border border-gray-600 placeholder:text-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter project title"
                  // value="https://dribbble.com/shots/13967318-Dribbble-Promotion-Service-UI-Components"
                  spellCheck={false}
                  onChange={(e) => {
                    setPost({
                      ...post,
                      title: e.target.value,
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
                  // value="I need help with..."
                  required
                  maxLength={600}
                  onChange={(e) => {
                    setPost({
                      ...post,
                      description: e.target.value,
                    });
                  }}
                />
              </div>

              {/* I need help with */}
              <div className="mb-8">
                <p className="block mb-2 text-sm font-sans font-medium text-gray-400">
                  I need help with
                </p>
                <div className="grid grid-cols-4 gap-5">
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
                <div className="grid grid-cols-4 gap-5">
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
                  onClick={() => setupPostAsJson()}
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
