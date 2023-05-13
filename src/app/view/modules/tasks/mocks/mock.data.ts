import { Task, User } from '../models';

export const storedTasks: Task[] = [
	{
		id: 0,
		name: 'Install a monitor arm',
		description: 'Install a monitor arm',
		assigneeId: 111,
		status: 'TD',
	},
	{
		id: 1,
		name: 'Move the desk to the new location',
		description: 'Move the desk to the new location',
		assigneeId: 222,
		status: 'IP',
	},
	{
		id: 2,
		name: 'Move the desk to the new location 2',
		description: 'Move the desk to the new location 2',
		assigneeId: 333,
		status: 'CP',
	},
	{
		id: 3,
		name: 'Move the desk to the new location 2',
		description: 'Move the desk to the new location 2',
		assigneeId: 222,
		status: 'TD',
	},
	{
		id: 4,
		name: 'Move the desk to the new location 2',
		description: 'Move the desk to the new location 2',
		assigneeId: 333,
		status: 'TD',
	},
];

export const storedUsers: User[] = [
	{ id: 111, name: 'Mike Jason', logo: 'MK', bgColor: 'orange' },
	{ id: 222, name: 'James Rodigez', logo: 'JM', bgColor: 'red' },
	{ id: 333, name: 'Alex Ferguson', logo: 'AL', bgColor: 'blue' },
];
