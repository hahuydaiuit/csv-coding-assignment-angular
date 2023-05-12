import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TASK_CONSTANT } from "@app/view/modules/tasks/constants";
import { Task } from "@app/view/modules/tasks/models";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent implements OnInit {
  @Input() tasks: Task[];
  @Output() openDetail = new EventEmitter();
  preFix = TASK_CONSTANT.PREFIX;

  constructor() {}

  ngOnInit(): void {}

  openTaskDetail(task: Task) {
    this.openDetail.emit(task);
  }
}
