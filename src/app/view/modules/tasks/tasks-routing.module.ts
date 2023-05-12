import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: 'list',
		pathMatch: 'full',
	},
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: 'list',
        component: TaskListComponent
      },
      {
        path: 'detail/:id',
        component: TaskDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
