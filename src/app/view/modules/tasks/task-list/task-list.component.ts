import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { IParams, Task, TaskItem, User } from '../models';
import { TASK_CONSTANT, TASK_ENUM_CODE } from '../constants';
import { Subscription, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '@app/shared/components/task-dialog/task-dialog.component';
import { DIALOG_HEIGHT, DIALOG_WIDTH } from '@app/shared/constants';
import { SnackBarService } from '@app/shared/services';
import { buildTaskItem } from '@app/shared/utils';
import { UserService } from '../../users/services/user.service';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
	subscription: Subscription = new Subscription();
	tasks: Task[];
	users: User[];
	preFix = TASK_CONSTANT.PREFIX;
	currentParams = null;

	tasksItem: TaskItem[] = [];
	isLoading = false;

	constructor(
		private taskService: TasksService,
		public dialog: MatDialog,
		private snackBarService: SnackBarService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.init();
	}

	init() {
		this.isLoading = true;
		const tasks = this.taskService.getAllTasks();
		const users = this.userService.getAllUsers();

		this.subscription.add(
			forkJoin([tasks, users]).subscribe(
				(results) => {
					this.tasks = results[0];
					this.users = results[1];
					this.buildTaskAssignee();
					this.tasksItem = buildTaskItem(this.tasks);
					this.isLoading = false;
				},
				(error) => {
					this.snackBarService.openSnackBar('Something was wrong!', '', 'start', 'bottom', 'panel-error');
				}
			)
		);
	}

	// getAllUser() {
	// 	this.userService.getAllUser().subscribe((users: User[]) => {
	// 		this.users = users;
	// 	});
	// }

	getAllTasks(params: IParams = null) {
		this.isLoading = true;
		// this.tasksItem = [];
		this.subscription.add(
			this.taskService.getAllTasks(params).subscribe(
				(data: Task[]) => {
					this.tasks = data;
					this.buildTaskAssignee();
					this.tasksItem = buildTaskItem(this.tasks);
					this.currentParams = params;
					this.isLoading = false;
				},
				() => {
					this.snackBarService.openSnackBar('Something was wrong!', '', 'start', 'bottom', 'panel-error');
				}
			)
		);
	}

	buildTaskAssignee() {
		this.tasks.forEach((task) => {
			const userAssignee = this.users.find((user) => user.id === task.assigneeId);
			task.logo = userAssignee.logo;
			task.bgColor = userAssignee.bgColor;
			task.assigneeName = userAssignee.name;
		});
	}

	onSearch(params: IParams) {
		this.getAllTasks(params);
	}

	addNewTask() {
		// this.userService.getAllUser().subscribe((users: User[]) => {
		// 	this.users = users;

		const dialogRef = this.dialog.open(TaskDialogComponent, {
			width: DIALOG_WIDTH.LARGE,
			height: DIALOG_HEIGHT.LARGE,
			autoFocus: false,
			disableClose: true,
			data: {
				users: this.users,
				task: {
					id: null,
					name: '',
					description: '',
					assigneeId: this.users[0].id,
					status: TASK_ENUM_CODE.TODO,
				},
				config: {
					title: 'Create new task',
					buttonLbl: 'Create',
					isEdit: false,
				},
			},
		});

		dialogRef.componentInstance.onSaveTaskEmitter.subscribe((data) => {
			this.taskService.createNewTask(data).subscribe((task) => {
				this.getAllTasks(this.currentParams);
				this.snackBarService.openSnackBar(`Create new task ${task.name} successfully`, '', 'start', 'bottom', 'panel-sucess');
				dialogRef.close();
			});
		});
		// });
	}

	updateTask(task: Task) {
		const dialogRef = this.dialog.open(TaskDialogComponent, {
			width: DIALOG_WIDTH.LARGE,
			height: DIALOG_HEIGHT.LARGE,
			autoFocus: false,
			disableClose: true,
			data: {
				users: this.users,
				task,
				config: {
					title: 'Update task',
					buttonLbl: 'Save',
					isEdit: true,
				},
			},
		});

		dialogRef.componentInstance.onSaveTaskEmitter.subscribe((data) => {
			this.taskService.updateTask(data).subscribe((task) => {
				this.snackBarService.openSnackBar(`Update ${task.name} successful`, '', 'start', 'bottom', 'panel-sucess');
				this.getAllTasks(this.currentParams);
				dialogRef.close();
			});
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
