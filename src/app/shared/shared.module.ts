import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskItemComponent } from "./components/task-item/task-item.component";
import { FilterComponent } from "./components/filter/filter.component";
import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddNewTaskDialogComponent } from "./components/add-new-task-dialog/add-new-task-dialog.component";

@NgModule({
  declarations: [TaskItemComponent, FilterComponent, AddNewTaskDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  exports: [TaskItemComponent, FilterComponent, AddNewTaskDialogComponent],
})
export class SharedModule {}
