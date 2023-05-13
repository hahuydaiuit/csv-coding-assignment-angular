import { TASK_ENUM_CODE, TASK_STATUS } from '@app/view/modules/tasks/constants';
import { Task, TaskItem } from '@app/view/modules/tasks/models';

export const buildTaskItem = (tasks: Task[]) => {
	let tasksItem: TaskItem[] = [
		{
			name: 'Todo',
			code: TASK_ENUM_CODE.TODO,
			tasks: [],
		},
		{
			name: 'In-Progress',
			code: TASK_ENUM_CODE.INPROGRESS,
			tasks: [],
		},
		{
			name: 'Completed',
			code: TASK_ENUM_CODE.COMPLETED,
			tasks: [],
		},
	];
	tasks.forEach((task) => {
		let taskItem = tasksItem.find((item) => item.code === task.status);
		if (taskItem) {
			taskItem.tasks.push(task);
		} else {
			tasksItem.push({
				name: TASK_STATUS.find((status) => status.code === task.status).name,
				code: task.status,
				tasks: [task],
			});
		}
	});

	console.log('tasksItem: ', tasksItem);
	return tasksItem;
};
