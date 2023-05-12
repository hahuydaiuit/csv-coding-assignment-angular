import { Task, User } from "../models";

export const storedTasks: Task[] = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false
    },
    {
        id: 2,
        description: "Move the desk to the new location",
        assigneeId: 222,
        completed: true
      }
  ];

  export const storedUsers: User[] = [
    { id: 111, name: "Mike", logo: 'MK', bgColor: 'orange' },
    { id: 222, name: "James", logo: 'JM', bgColor: 'red'  },
    { id: 333, name: "Alex", logo: 'AL', bgColor: 'blue'  },
  ];
