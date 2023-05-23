import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/shared/material.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
	declarations: [UsersComponent, UserListComponent],
	imports: [CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule, SharedModule],
})
export class UsersModule {}
