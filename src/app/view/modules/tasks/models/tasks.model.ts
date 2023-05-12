export type User = {
  id: number;
  name: string;
  logo: string;
  bgColor: string;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  assigneeId: number;
  completed: boolean;
  logo?: string;
  bgColor?: string;
};

export type IParams = {
  name: string;
  userId: number[];
  completed?: boolean[];
};

export type TaskWithStatus = {
  todo: Task[];
  completed: Task[];
};

// export enum TASK_STATUS = {

// }
