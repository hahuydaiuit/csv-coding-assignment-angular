import { Component, OnInit, OnDestroy } from '@angular/core';
import { TASK_ENUM_CODE, TASK_STATUS } from '../constants';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription, forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { Task, User } from '../models';
import { SnackBarService } from '@app/shared/services';

@Component({
	selector: 'app-task-detail',
	templateUrl: './task-detail.component.html',
	styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit, OnDestroy {
	subscription: Subscription = new Subscription();
	taskStatus = TASK_STATUS;
	taskForm!: UntypedFormGroup;
	users: User[];
	taskId: number;
	taskDetail!: Task;
	assigneeSelected!: User;
	remaningAssignee!: User[];
	statusSelected: string;
	previousValue!: Task;

	constructor(
		private readonly formBuilder: UntypedFormBuilder,
		public route: ActivatedRoute,
		private taskService: TasksService,
		public router: Router,
		private snackBarService: SnackBarService
	) {}

	ngOnInit(): void {
		this.initForm();

		this.route.paramMap.subscribe((params) => {
			this.taskId = parseInt(params.get('id') || '', 10);
			this.initData();
		});
	}

	initData() {
		const taskDetail = this.taskService.getTaskDetail(this.taskId).pipe(catchError((error) => throwError(error)));
		const users = this.taskService.getAllUsers().pipe(catchError((error) => throwError(error)));

		this.subscription.add(
			forkJoin([taskDetail, users]).subscribe(
				(results) => {
					this.taskDetail = results[0];
					this.users = results[1];

					this.assigneeSelected = this.users.find((user) => user.id === this.taskDetail.assigneeId);
					this.remaningAssignee = this.users.filter((user) => user.id !== this.assigneeSelected.id);
					this.statusSelected = this.taskStatus.find((status) => status.code === this.taskDetail.status).name;

					this.previousValue = JSON.parse(JSON.stringify(this.taskDetail));

					this.taskForm.patchValue(this.taskDetail);
				},
				(error) => {
					const errorTask = error[0];
					const errorUser = error[1];
					if (errorTask) {
						this.snackBarService.openSnackBar('Task not found!', '', 'start', 'bottom', 'panel-error');
						this.router.navigate(['/tasks']);
					}
				}
			)
		);
	}

	initForm() {
		this.taskForm = this.formBuilder.group({
			id: [null],
			name: ['', [Validators.required]],
			description: ['', [Validators.required]],
			assigneeId: [null, [Validators.required]],
			status: [TASK_ENUM_CODE.TODO],
		});
	}

	changeStatus(status: string) {
		this.statusSelected = this.taskStatus.find((task) => task.code === status).name;
		this.taskForm.get('status').setValue(status);
	}

	changeAssignee(user: User) {
		this.assigneeSelected = user;
		this.remaningAssignee = this.users.filter((user) => user.id !== this.assigneeSelected.id);

		this.taskForm.get('assigneeId').setValue(this.assigneeSelected.id);
	}

	onSave() {
		this.taskService.updateTask(this.taskForm.value).subscribe(
			(task) => {
				if (task) {
					this.router.navigate(['/tasks']);
				}
			},
			(error) => {
				this.snackBarService.openSnackBar('Something was wrong!', '', 'start', 'bottom', 'panel-error');
			}
		);
	}

	hasChangeData() {
		delete this.previousValue.logo;
		delete this.previousValue.bgColor;
		return JSON.stringify(this.previousValue) === JSON.stringify(this.taskForm.value);
	}

	gotoList() {
		this.router.navigate(['/tasks']);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
