import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TASK_CONSTANT, TASK_STATUS } from '@app/view/modules/tasks/constants';
import { Task, TaskItem, User } from '@app/view/modules/tasks/models';

@Component({
	selector: 'app-task-dialog',
	templateUrl: './task-dialog.component.html',
	styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
	onSaveTaskEmitter = new EventEmitter();
	taskStatus = JSON.parse(JSON.stringify(TASK_STATUS));
	previousValue!: Task;
	preFix = TASK_CONSTANT.PREFIX;

	constructor(
		public dialogRef: MatDialogRef<TaskDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private readonly formBuilder: UntypedFormBuilder,
		private readonly router: Router
	) {}

	taskForm!: UntypedFormGroup;
	assigneeSelected!: User;
	remaningAssignee!: User[];
	statusSelected: string;
	remaingStatus!: TaskItem[];

	ngOnInit(): void {
		this.initValue();
		this.initForm();
	}

	initValue() {
		this.assigneeSelected = this.data.users.find((user) => user.id === this.data.task.assigneeId);
		this.remaningAssignee = this.data.users.filter((user) => user.id !== this.assigneeSelected.id);
		this.statusSelected = this.taskStatus.find((status) => status.code === this.data.task.status).name;
		this.remaingStatus = this.taskStatus.filter((status) => status.code !== this.data.task.status);

		this.previousValue = JSON.parse(JSON.stringify(this.data.task));
	}

	initForm() {
		this.taskForm = this.formBuilder.group({
			id: [this.data.task.id],
			name: [this.data.task.name, [Validators.required]],
			description: [this.data.task.description, [Validators.required]],
			assigneeId: [this.data.task.assigneeId, [Validators.required]],
			status: [this.data.task.status],
		});
	}

	changeAssignee(user: User) {
		this.assigneeSelected = user;
		this.remaningAssignee = this.data.users.filter((user) => user.id !== this.assigneeSelected.id);

		this.taskForm.get('assigneeId').setValue(this.assigneeSelected.id);
	}

	changeStatus(status: string) {
		this.statusSelected = this.taskStatus.find((task) => task.code === status).name;
		this.remaingStatus = this.taskStatus.filter((task) => task.code !== status);
		this.taskForm.get('status').setValue(status);
	}

	onSave() {
		this.onSaveTaskEmitter.emit(this.taskForm.value);
	}

	hasChangeData() {
		delete this.previousValue.logo;
		delete this.previousValue.bgColor;
		delete this.previousValue.assigneeName;
		return this.data.config.isEdit && JSON.stringify(this.previousValue) === JSON.stringify(this.taskForm.value);
	}

	gotoDetail() {
		this.router.navigate([`/tasks/detail/${this.preFix}${this.data.task.id}`]);
	}
}
