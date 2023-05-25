import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	public isLoading = new BehaviorSubject(false);

	start() {
		this.isLoading.next(true);
	}

	complete() {
		this.isLoading.next(false);
	}

	getLoading(): Observable<boolean> {
		return this.isLoading;
	}
}
