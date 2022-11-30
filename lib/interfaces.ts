
export interface IPost {
    createdAt: {
      seconds: number;
      nanoseconds: number;
    };
    description: string;
    level: string;
    slug: string;
    tags: [
      {
        label: string;
        color: string;
        id: number;
      }
    ];
    title: string;
    uid: string;
    url?: string;
  }
  