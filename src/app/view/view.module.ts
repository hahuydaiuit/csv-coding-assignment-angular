import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { LeftNavComponent } from './layout/left-nav/left-nav.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { TasksService } from './modules/tasks/services/tasks.service';
import { LoadingService } from '@app/shared/services';
import { UserService } from './modules/users/services/user.service';
import { HeaderComponent } from './layout/header/header/header.component';

@NgModule({
	declarations: [ViewComponent, LeftNavComponent, SettingsComponent, HeaderComponent],
	imports: [CommonModule, ViewRoutingModule],
	providers: [TasksService, UserService, LoadingService],
})
export class ViewModule {}
