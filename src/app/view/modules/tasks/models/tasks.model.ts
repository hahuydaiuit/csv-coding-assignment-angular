
export type User = {
    id: number;
    name: string;
    logo: string;
    bgColor: string;
  };
  
  export type Task = {
    id: number;
    description: string;
    assigneeId: number;
    completed: boolean;
  };

  export type IParams = {
    userId: number;
    completed?: boolean;
  }