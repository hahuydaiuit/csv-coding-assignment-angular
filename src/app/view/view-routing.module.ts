import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'tasks',
		pathMatch: 'full',
	},
	{
		path: '',
		component: ViewComponent,
		children: [
			{
				path: 'tasks',
				loadChildren: () => import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
			},
			{
				path: 'users',
				loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
			},
			{
				path: 'settings',
				loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ViewRoutingModule {}
