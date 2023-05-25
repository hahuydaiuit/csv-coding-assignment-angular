import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-left-nav',
	templateUrl: './left-nav.component.html',
	styleUrls: ['./left-nav.component.scss'],
})
export class LeftNavComponent implements OnInit {
	leftMenu = [
		{
			name: 'Task',
			link: '/tasks',
		},
		{
			name: 'Users',
			link: '/users',
		},
		{
			name: 'Settings',
			link: '/settings',
		},
	];
	constructor() {}

	ngOnInit(): void {}
}
