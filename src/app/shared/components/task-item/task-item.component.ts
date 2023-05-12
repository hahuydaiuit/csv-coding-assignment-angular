import { Component, OnInit, Input } from "@angular/core";
import { TASK_CONSTANT } from "@app/view/modules/tasks/constants";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.scss"],
})
export class TaskItemComponent implements OnInit {
  @Input() tasks: Task[];
  preFix = TASK_CONSTANT.PREFIX;

  constructor() {}

  ngOnInit(): void {}
}
