import { TASK_STATUS } from '@app/view/modules/tasks/constants';
import { Task, TaskItem } from '@app/view/modules/tasks/models';

export const buildTaskItem = (tasks: Task[]) => {
	let tasksItem: TaskItem[] = JSON.parse(JSON.stringify(TASK_STATUS));
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
