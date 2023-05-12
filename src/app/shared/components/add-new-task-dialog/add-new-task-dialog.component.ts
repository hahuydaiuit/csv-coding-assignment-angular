import { Component, OnInit, Inject, EventEmitter } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "@app/view/modules/tasks/models";
import { TasksService } from "@app/view/modules/tasks/services/tasks.service";

@Component({
  selector: "app-add-new-task-dialog",
  templateUrl: "./add-new-task-dialog.component.html",
  styleUrls: ["./add-new-task-dialog.component.scss"],
})
export class AddNewTaskDialogComponent implements OnInit {
  createNewTaskEmitter = new EventEmitter();
  constructor(
    public dialogRef: MatDialogRef<AddNewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly taskService: TasksService
  ) {}

  taskForm!: UntypedFormGroup;
  assigneeSelected!: User;
  remaningAssignee!: User[];

  ngOnInit(): void {
    this.assigneeSelected = this.data.users[0];
    this.remaningAssignee = this.data.users.filter((user) => user.id !== this.assigneeSelected.id);

    this.initForm();
  }

  initForm() {
    this.taskForm = this.formBuilder.group({
      id: [],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      assigneeId: [this.assigneeSelected.id, [Validators.required]],
      completed: [false],
    });
  }

  changeAssignee(user: User) {
    this.assigneeSelected = user;
    this.remaningAssignee = this.data.users.filter((user) => user.id !== this.assigneeSelected.id);

    this.taskForm.get("assigneeId").setValue(this.assigneeSelected.id);
  }

  createNewTask() {
    this.taskService.createNewTask(this.taskForm.getRawValue()).subscribe((task) => {
      console.log(task);
      this.createNewTaskEmitter.emit(true);
      this.dialogRef.close();
    });
  }
}
