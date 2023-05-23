import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../../tasks/models';
import { SnackBarService } from '@app/shared/services';
import { IParamUser } from '../model/users.model';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
	users: User[] = [];
	isUpdateUser = false;
	userIsUpdating!: User;
	searchName = '';
	userInput = '';
	displayedColumns: string[] = ['id', 'name'];
	constructor(private userService: UserService, private snackBarService: SnackBarService) {}

	ngOnInit(): void {
		this.getAllUsers();
	}

	getAllUsers(params: IParamUser = null) {
		this.userService.getAllUsers(params).subscribe((users: User[]) => {
			this.users = users;
		});
	}

	addNewUser() {
		this.userService.createNewUser(this.userInput).subscribe((user: User) => {
			this.userInput = '';
			this.snackBarService.openSnackBar(`Create new user ${user.name} successfully`, '', 'start', 'bottom', 'panel-sucess');
			this.getAllUsers();
		});
	}

	onUpdateUser(user: User) {
		this.isUpdateUser = true;
		this.userInput = user.name;
		this.userIsUpdating = user;
	}

	updateUser() {
		this.userService.updateUser({ id: this.userIsUpdating.id, name: this.userInput }).subscribe((user: User) => {
			this.userInput = '';
			this.isUpdateUser = false;
			this.snackBarService.openSnackBar(`Update user ${user.name} successfully`, '', 'start', 'bottom', 'panel-sucess');
			this.getAllUsers();
		});
	}

	cancelUpdateUser() {
		this.isUpdateUser = false;
		this.userInput = '';
		this.userIsUpdating = null;
	}
}
