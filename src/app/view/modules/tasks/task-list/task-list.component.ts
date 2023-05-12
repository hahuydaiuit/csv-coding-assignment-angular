import { Component, OnInit } from "@angular/core";
import { TasksService } from "../services/tasks.service";
import { IParams, Task, TaskWithStatus, User } from "../models";
import { TASK_CONSTANT } from "../constants";
import { forkJoin } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AddNewTaskDialogComponent } from "@app/shared/components/add-new-task-dialog/add-new-task-dialog.component";
import { DIALOG_HEIGHT, DIALOG_WIDTH } from "@app/shared/constants";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
  providers: [],
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  users: User[];
  taskWithStatus: TaskWithStatus = {
    todo: [],
    completed: [],
  };
  preFix = TASK_CONSTANT.PREFIX;

  constructor(private taskService: TasksService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    const tasks = this.taskService.getAllTasks();
    const users = this.taskService.getAllUsers();

    forkJoin([tasks, users]).subscribe((results) => {
      this.tasks = results[0];
      this.users = results[1];
      this.buildLogoAndBg();
      this.taskWithStatus.todo = this.tasks.filter((task) => !task.completed);
      this.taskWithStatus.completed = this.tasks.filter((task) => task.completed);
    });
  }

  getAllTasks(params: IParams = null) {
    this.taskService.getAllTasks(params).subscribe((data: Task[]) => {
      this.tasks = data;
      this.buildLogoAndBg();
      this.taskWithStatus.todo = this.tasks.filter((task) => !task.completed);
      this.taskWithStatus.completed = this.tasks.filter((task) => task.completed);
      console.log("this.tasks: ", this.tasks);
    });
  }

  buildLogoAndBg() {
    this.tasks.forEach((task) => {
      const userAssignee = this.users.find((user) => user.id === task.assigneeId);
      task.logo = userAssignee.logo;
      task.bgColor = userAssignee.bgColor;
    });
  }

  onSearch(params: IParams) {
    this.getAllTasks(params);
  }

  addNewTask() {
    const dialogRef = this.dialog.open(AddNewTaskDialogComponent, {
      width: DIALOG_WIDTH.LARGE,
      height: DIALOG_HEIGHT.LARGE,
      autoFocus: false,
      disableClose: true,
      data: {
        users: this.users,
      },
    });

    dialogRef.componentInstance.createNewTaskEmitter.subscribe((isSucess) => {
      if (isSucess) {
        this.getAllTasks();
      }
    });
  }
}
