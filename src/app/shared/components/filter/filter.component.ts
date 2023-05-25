import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TASK_STATUS } from '@app/view/modules/tasks/constants';
import { IParams, User } from '@app/view/modules/tasks/models';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
	@Input() users: User[];
	@Output() search = new EventEmitter();
	selectedAssigneeID = [];

	taskStatus = JSON.parse(JSON.stringify(TASK_STATUS));

	searchFilter: IParams = {
		name: '',
		userId: [],
		status: [],
	};

	constructor() {}

	ngOnInit(): void {}

	onChangeName(event: any) {
		this.searchFilter.name = event;
		this.search.emit(this.searchFilter);
	}

	onChangeStatus(event: any) {
		this.searchFilter.status = event;
		this.search.emit(this.searchFilter);
	}

	selectAssignee(userId: number) {
		if (this.selectedAssigneeID.includes(userId)) {
			this.selectedAssigneeID = this.selectedAssigneeID.filter((id) => id !== userId);
		} else {
			this.selectedAssigneeID.push(userId);
		}

		this.searchFilter.userId = this.selectedAssigneeID;
		this.search.emit(this.searchFilter);
	}

	clearFilter() {
		this.searchFilter = {
			name: '',
			userId: [],
			status: [],
		};
		this.selectedAssigneeID = [];
		this.search.emit(this.searchFilter);
	}
}
