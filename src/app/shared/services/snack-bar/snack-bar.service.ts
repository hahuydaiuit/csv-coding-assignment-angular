import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
	constructor(private matSnackBar: MatSnackBar) {}

	openSnackBar(message: string, action: string, hPosition?: any, vPosition?: any, className?: any) {
		this.matSnackBar.open(message, action, {
			duration: 5000,
			horizontalPosition: hPosition ? hPosition : 'center',
			verticalPosition: vPosition ? vPosition : 'top',
			panelClass: className,
		});
	}
}
