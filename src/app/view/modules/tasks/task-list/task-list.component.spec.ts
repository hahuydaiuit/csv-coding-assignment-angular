import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TasksService } from '../services/tasks.service';
import { storedTasks, storedUsers } from '../mocks';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { SnackBarService } from '@app/shared/services/snack-bar/snack-bar.service';
import { MaterialModule } from '@app/shared/material.module';
import { TaskItemComponent } from '@app/shared/components/task-item/task-item.component';
import { FilterComponent } from '@app/shared/components/filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskDialogComponent } from '@app/shared/components/task-dialog/task-dialog.component';

export const MatDialogRefMock = {
	componentInstance: {
		onSaveTaskEmitter: of({}),
	},
};

describe('TaskListComponent', () => {
	let component: TaskListComponent;
	let fixture: ComponentFixture<TaskListComponent>;
	let tasksService: TasksService;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TaskListComponent, TaskItemComponent, FilterComponent, TaskDialogComponent],
			imports: [HttpClientModule, CommonModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MaterialModule],
			providers: [
				TasksService,
				SnackBarService,
				{
					provide: MatDialogRef,
					useValue: MatDialogRefMock,
				},
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskListComponent);
		component = fixture.componentInstance;
		tasksService = TestBed.inject(TasksService);

		spyOn(tasksService, 'getAllTasks').and.returnValue(of(storedTasks));
		spyOn(tasksService, 'getAllUsers').and.returnValue(of(storedUsers));
		spyOn(tasksService, 'updateTask').and.returnValue(of({}));
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('testing', () => {
		beforeEach(fakeAsync(() => {
			spyOn(component, 'getAllTasks');
			fixture.detectChanges();
			component.ngOnInit();
			tick();
		}));

		it('ngOnInit', fakeAsync(() => {
			let assigneeFilter = fixture.debugElement.query(By.css('.filter__assignee__item'));

			assigneeFilter.triggerEventHandler('click', null);
			tick();
			fixture.detectChanges();
			expect(component.getAllTasks).toHaveBeenCalled();
			flush();
		}));

		it('test open dialog', fakeAsync(() => {
			spyOn(component.dialog, 'open').and.returnValue({
				componentInstance: {
					onSaveTaskEmitter: of(true),
				},
				close: () => {}, //NOSONAR
			} as MatDialogRef<unknown, unknown>);

			let task = fixture.debugElement.query(By.css('.task-item__issue'));
			task.triggerEventHandler('click', null);
			tick();
			fixture.detectChanges();
			expect(component.dialog.open).toHaveBeenCalled();
			flush();
		}));

		it('test add dialog', fakeAsync(() => {
			let task = fixture.debugElement.query(By.css('#id-button-add'));
			task.triggerEventHandler('click', null);
			tick();
			fixture.detectChanges();
			let title: HTMLElement = document.querySelector('#id-dialog-title');
			expect(title.className).toContain('mat-dialog-title');
			flush();
		}));
	});
});
