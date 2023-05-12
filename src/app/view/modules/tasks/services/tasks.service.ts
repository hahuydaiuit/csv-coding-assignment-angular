import { Injectable } from "@angular/core";
import { RequestService } from "@app/shared/services";
import { Observable, of } from "rxjs";
import { TASK_API } from "./task.api";
import { IParams, Task, User } from "../models";
import { storedTasks, storedUsers } from "../mocks";
import { delay, map } from "rxjs/operators";
import { randomDelay } from "@app/shared/utils";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  storedTasks = storedTasks;
  storedUsers = storedUsers;
  lastId = 2;

  constructor(private requestService: RequestService) {}

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

    if (params?.completed.length > 0) {
      data = data.filter((task) => params.completed.includes(task.completed));
    }
    if (params?.name) {
      data = data.filter((task) => task.name.toLowerCase().includes(params.name.toLowerCase()));
    }

    return data;
  }

  getTaskDetail(taskId: number): Observable<Task> {
    let api = JSON.parse(JSON.stringify(TASK_API.GET_TASK_INFO));
    api.url += taskId;
    if (api.use_mock) {
      return of(this.storedTasks)
        .pipe(delay(randomDelay()))
        .pipe(map((data) => data.find((task) => task.id === taskId)));
    }

    return this.requestService.action(api);
  }

  getAllUsers(): Observable<User[]> {
    const api = JSON.parse(JSON.stringify(TASK_API.GET_ALL_USER));
    if (api.use_mock) {
      return of(this.storedUsers).pipe(delay(randomDelay()));
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
        completed: false,
      };

      this.storedTasks = this.storedTasks.concat(newTask);

      return of(newTask).pipe(delay(randomDelay()));
    }

    return this.requestService.action(api, tasks);
  }
}