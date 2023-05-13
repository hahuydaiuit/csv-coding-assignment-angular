import { Injectable } from '@angular/core';
import { LoadingService, RequestService } from '@app/shared/services';
import { Observable, of, throwError } from 'rxjs';
import { TASK_API } from './task.api';
import { IParams, Task, User } from '../models';
import { storedTasks, storedUsers } from '../mocks';
import { delay, map, finalize } from 'rxjs/operators';
import { randomDelay } from '@app/shared/utils';
import { TASK_ENUM_CODE } from '../constants';

@Injectable({
	providedIn: 'root',
})
export class TasksService {
	storedTasks = storedTasks;
	storedUsers = storedUsers;
	lastId = 4;

	constructor(private requestService: RequestService, public loadingService: LoadingService) {}

	private findTaskById = (id) => this.storedTasks.find((task) => task.id === +id);

	private findUserById = (id) => this.storedUsers.find((user) => user.id === +id);

	getAllTasks(params: IParams = null): Observable<Task[]> {
		let api = JSON.parse(JSON.stringify(TASK_API.GET_ALL_TASK));
		api.params = params;
		if (api.use_mock) {
			return of(this.storedTasks)
				.pipe(delay(randomDelay()))
				.pipe(map((data) => this.filterTaskByParams(data, params)));
		}
		return this.requestService.action(api);
	}

	filterTaskByParams(data: Task[], params: IParams = null): Task[] {
		if (!params) {
			return data;
		}

		if (params?.userId.length > 0) {
			data = data.filter((task) => params.userId.includes(task.assigneeId));
		}

		if (params?.status.length > 0) {
			data = data.filter((task) => params.status.includes(task.status));
		}
		if (params?.name) {
			data = data.filter((task) => task.name.toLowerCase().includes(params.name.toLowerCase()));
		}

		return data;
	}

	getTaskDetail(taskId: number): Observable<Task> {
		this.loadingService.start();
		let api = JSON.parse(JSON.stringify(TASK_API.GET_TASK_INFO));
		api.url += taskId;
		if (api.use_mock) {
			const foundTask = this.findTaskById(taskId);

			if (!foundTask) {
				return throwError('task not found');
			}
			return of(this.storedTasks)
				.pipe(
					delay(randomDelay()),
					finalize(() => {
						this.loadingService.complete();
					})
				)
				.pipe(map((data) => data.find((task) => task.id === taskId)));
		}

		return this.requestService.action(api);
	}

	getAllUsers(): Observable<User[]> {
		this.loadingService.start();
		const api = JSON.parse(JSON.stringify(TASK_API.GET_ALL_USER));
		if (api.use_mock) {
			return of(this.storedUsers).pipe(
				delay(randomDelay()),
				finalize(() => {
					this.loadingService.complete();
				})
			);
		}
		return this.requestService.action(api);
	}

	createNewTask(tasks: Task): Observable<Task> {
		let api = JSON.parse(JSON.stringify(TASK_API.ADD_TASK));
		if (api.use_mock) {
			const newTask: Task = {
				id: ++this.lastId,
				name: tasks.name,
				description: tasks.description,
				assigneeId: tasks.assigneeId,
				status: TASK_ENUM_CODE.TODO,
			};

			this.storedTasks = this.storedTasks.concat(newTask);

			return of(newTask).pipe(delay(randomDelay()));
		}

		return this.requestService.action(api, tasks);
	}

	updateTask(task: Task): Observable<Task> {
		let api = JSON.parse(JSON.stringify(TASK_API.UPDATE_TASK));

		if (api.use_mock) {
			const foundTask = this.findTaskById(task.id);

			if (!foundTask) {
				return throwError(new Error('task not found'));
			}

			const updatedTask = { ...foundTask, ...task };

			this.storedTasks = this.storedTasks.map((t) => (t.id === task.id ? updatedTask : t));

			return of(updatedTask).pipe(delay(randomDelay()));
		}

		return this.requestService.action(api, task);
	}
}
