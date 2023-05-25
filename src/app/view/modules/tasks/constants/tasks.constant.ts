import { TaskItem } from '../models';

export const TASK_CONSTANT = {
	PREFIX: 'TASK-',
};

export enum TASK_ENUM_CODE {
	TODO = 'TD',
	INPROGRESS = 'IP',
	INREVIEW = 'IR',
	COMPLETED = 'CP',
}

export const TASK_STATUS: TaskItem[] = [
	{
		name: 'Todo',
		code: 'TD',
		tasks: [],
	},
	{
		name: 'In Progress',
		code: 'IP',
		tasks: [],
	},
	{
		name: 'In Review',
		code: 'IR',
		tasks: [],
	},
	{
		name: 'Completed',
		code: 'CP',
		tasks: [],
	},
];
