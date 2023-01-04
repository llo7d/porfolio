
export interface IPost {
  // createdAt: {
  //   seconds: number;
  //   nanoseconds: number;
  // };
  createdAt: {
    inMiliseconds: number;
    inFirebaseFormat?: Date;
  }
  description: string;
  level: string;
  slug: string;
  tags: [
    {
      label: string;
      name: string;
      id: number;
    }
  ];
  title: string;
  uid: string;
  url?: string;
  deletePost?: boolean;
  handleDelete?: (slug: string, uid: string) => void
  postsArray?: IPost[];
  setPostsArray?: (postsArray: IPost[]) => void;
}


export interface IUserInfo {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  }
  email: string;
  githubId: string;
  githubUrl: string;
  provider: string;
  uid: string;
  photoURL: string;
  displayName: string;
  githubUsername: string;
  aboutme: string;
  discordName: null | string | boolean | undefined
  twitterUsername: null | string | boolean;
  shortDescription: string;
  longDescription: string;
  lastUpdated: {
    inMiliseconds: number;
    // inDate that is Timestamp type object
    inFirebaseDate: Date;
  },

}
