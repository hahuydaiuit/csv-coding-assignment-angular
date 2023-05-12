import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'tasks',
		pathMatch: 'full',
	},
	{
		path: 'tasks',
		loadChildren: () => import('./modules/tasks/tasks.module').then((m) => m.TasksModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ViewRoutingModule {}
