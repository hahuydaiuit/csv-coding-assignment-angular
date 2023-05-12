import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { TasksService } from '../services/tasks.service';
import { Task, User } from '../models';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TasksService]
})
export class TaskListComponent implements OnInit {

  tasks: Task[];
  users: User[];

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getAllTasks();
    this.getAllUsers();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    })
  }

  getAllUsers() {
    this.taskService.getAllUsers().subscribe((data: User[]) => {
      console.log('user: ', data)
      this.users = data;
    })
  }
}
