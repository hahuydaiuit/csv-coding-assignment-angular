import { Injectable } from '@angular/core';
import { RequestService } from '@app/shared/services';
import { Observable, of } from 'rxjs';
import { TASK_API } from './task.api';
import { IParams, Task, User } from '../models';
import { storedTasks, storedUsers } from '../mocks';
import { delay, map } from 'rxjs/operators';
import { randomDelay } from '@app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  storedTasks = storedTasks;

  storedUsers = storedUsers;

  constructor(private requestService: RequestService) { }

  getAllTasks(params: IParams = null): Observable<Task[]> {
    let api = JSON.parse(JSON.stringify(TASK_API.GET_ALL_TASK));
    api.params = params;
    if (api.use_mock) {
      return of(this.storedTasks).pipe(delay(randomDelay())).pipe(map(data => data.filter(task => !params || (params && task.assigneeId === params.userId && task.completed === params.completed))));
    }
    return this.requestService.action(api);
  }

  getTaskDetail(taskId: number): Observable<Task> {
    let api = JSON.parse(JSON.stringify(TASK_API.GET_TASK_INFO));
    api.url += taskId;
    if (api.use_mock) {
      return of(this.storedTasks).pipe(delay(randomDelay())).pipe(map(data => data.find(task => task.id === taskId)));
    }

    return this.requestService.action(api);
  }

  getAllUsers(): Observable<User[]> {
    const api = JSON.parse(JSON.stringify(TASK_API.GET_ALL_USER));
    if (api.use_mock) {
      return of(this.storedUsers).pipe(delay(randomDelay()))
    }
    return this.requestService.action(api);
  }
}
