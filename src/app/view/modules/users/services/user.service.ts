import { Injectable } from '@angular/core';
import { storedUsers } from '../../tasks/mocks';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../tasks/models';
import { randomDelay } from '@app/shared/utils';
import { delay, map } from 'rxjs/operators';
import { IParamUser, UpdateUser } from '../model/users.model';
import { generateNewColor } from '@app/shared/utils/generate-color';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	storedUsers = storedUsers;
	lastId = 3;
	constructor() {}

	private findUserById = (id) => this.storedUsers.find((user) => user.id === +id);

	getAllUsers(params: IParamUser = null): Observable<User[]> {
		return of(this.storedUsers)
			.pipe(delay(randomDelay()))
			.pipe(map((data) => this.filterTaskByParams(data, params)));
	}

	filterTaskByParams(data: User[], params: IParamUser = null): User[] {
		if (!params) {
			return data;
		}

		if (params?.name) {
			data = data.filter((task) => task.name.toLowerCase().includes(params.name.toLowerCase()));
		}

		return data;
	}

	createNewUser(name: string): Observable<User> {
		const newUser: User = {
			id: ++this.lastId,
			name: name,
			logo: name.charAt(0).toUpperCase(),
			bgColor: generateNewColor(),
		};

		this.storedUsers = this.storedUsers.concat(newUser);

		return of(newUser).pipe(delay(randomDelay()));
	}

	updateUser(updateUser: UpdateUser): Observable<User> {
		const foundUser = this.findUserById(updateUser.id);

		if (!foundUser) {
			return throwError(new Error('User not found'));
		}

		const updatedUser = { ...foundUser, ...updateUser };

		this.storedUsers = this.storedUsers.map((t) => (t.id === updateUser.id ? updatedUser : t));

		return of(updatedUser).pipe(delay(randomDelay()));
	}
}
