import { Component, OnInit, Inject, EventEmitter } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TASK_STATUS } from "@app/view/modules/tasks/constants";
import { Task, User } from "@app/view/modules/tasks/models";

@Component({
  selector: "app-task-dialog",
  templateUrl: "./task-dialog.component.html",
  styleUrls: ["./task-dialog.component.scss"],
})
export class TaskDialogComponent implements OnInit {
  onSaveTaskEmitter = new EventEmitter();
  taskStatus = TASK_STATUS;
  previousValue!: Task;
  
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

  ngOnInit(): void {
    this.assigneeSelected = this.data.users.find(user => user.id === this.data.task.assigneeId);
    this.remaningAssignee = this.data.users.filter((user) => user.id !== this.assigneeSelected.id);
    this.statusSelected = this.taskStatus.find(status => status.value === this.data.task.completed).name;

    this.previousValue = JSON.parse(JSON.stringify(this.data.task));
    this.initForm();
  }

  initForm() {
    this.taskForm = this.formBuilder.group({
      id: [this.data.task.id],
      name: [this.data.task.name, [Validators.required]],
      description: [this.data.task.description, [Validators.required]],
      assigneeId: [this.data.task.assigneeId, [Validators.required]],
      completed: [this.data.task.completed],
    });
  }

  changeAssignee(user: User) {
    this.assigneeSelected = user;
    this.remaningAssignee = this.data.users.filter((user) => user.id !== this.assigneeSelected.id);

    this.taskForm.get("assigneeId").setValue(this.assigneeSelected.id);
  }

  changeStatus(status: boolean) {
    this.statusSelected = this.taskStatus.find(task => task.value === status).name;
    this.taskForm.get("completed").setValue(status);
  }

  onSave() {
    this.onSaveTaskEmitter.emit(this.taskForm.value);
  }

  hasChangeData() {
    delete this.previousValue.logo;
    delete this.previousValue.bgColor;
    return this.data.config.isEdit && JSON.stringify(this.previousValue) === JSON.stringify(this.taskForm.value);
  }

  gotoDetail() {
    this.router.navigate([`/tasks/detail/${this.data.task.id}`])
  }
}
