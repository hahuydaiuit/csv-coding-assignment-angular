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
	status: string;
	logo?: string;
	bgColor?: string;
	assigneeName?: string;
};

export type IParams = {
	name: string;
	userId: number[];
	status?: string[];
};

export type TaskItem = {
	name: string;
	code: string;
	tasks: Task[];
};
