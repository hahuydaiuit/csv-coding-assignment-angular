import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users.component';

@NgModule({
	declarations: [UsersComponent, UserListComponent],
	imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
