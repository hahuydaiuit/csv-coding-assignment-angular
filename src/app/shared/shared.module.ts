import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FilterComponent } from './components/filter/filter.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { SnackBarService } from './services/';

@NgModule({
	declarations: [TaskItemComponent, FilterComponent, TaskDialogComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
	exports: [TaskItemComponent, FilterComponent, TaskDialogComponent],
	providers: [SnackBarService],
})
export class SharedModule {}
