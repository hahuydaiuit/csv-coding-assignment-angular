import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { MaterialModule } from '@app/shared/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { TasksService } from './services/tasks.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingService } from '@app/shared/services';

@NgModule({
	declarations: [TasksComponent, TaskListComponent, TaskDetailComponent],
	imports: [CommonModule, TasksRoutingModule, ReactiveFormsModule, MaterialModule, SharedModule],
	providers: [TasksService, LoadingService],
})
export class TasksModule {}
