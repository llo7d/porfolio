
export interface IPost {
    // createdAt: {
    //   seconds: number;
    //   nanoseconds: number;
    // };
    createdAt: number;
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
  }
  

  export interface IUserInfo {
    createdAt: {
      seconds: number;
      nanoseconds: number;
    }
    email:          string;
    githubId:       string;
    githubUrl:      string;
    provider:       string;
    uid:            string;
    photoURL:       string;
    displayName:    string;
    githubUsername: string;
    aboutme:        string;
    discordName:    null | string | boolean | undefined
    twitterUsername:    null | string | boolean;
    shortDescription: string;
    longDescription: string;
    lastUpdated: number;
      
}
