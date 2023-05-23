import { Task, User } from '../models';

export const storedTasks: Task[] = [
	{
		id: 0,
		name: 'Install a monitor arm',
		description: 'Install a monitor arm',
		assigneeId: 1,
		status: 'TD',
	},
	{
		id: 1,
		name: 'Move the desk to the new location',
		description: 'Move the desk to the new location',
		assigneeId: 2,
		status: 'IP',
	},
	{
		id: 2,
		name: 'Move the desk to the new location 2',
		description: 'Move the desk to the new location 2',
		assigneeId: 3,
		status: 'CP',
	},
	{
		id: 3,
		name: 'Move the desk to the new location 2',
		description: 'Move the desk to the new location 2',
		assigneeId: 2,
		status: 'TD',
	},
	{
		id: 4,
		name: 'Move the desk to the new location 2',
		description: 'Move the desk to the new location 2',
		assigneeId: 3,
		status: 'TD',
	},
];

export const storedUsers: User[] = [
	{ id: 1, name: 'Mike Jason', logo: 'MK', bgColor: 'orange' },
	{ id: 2, name: 'James Rodigez', logo: 'JM', bgColor: 'red' },
	{ id: 3, name: 'Alex Ferguson', logo: 'AL', bgColor: 'blue' },
];
