import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export type HttpObserve = 'body' | 'events' | 'response';

export class RequestOption {
	headers?:
		| HttpHeaders
		| {
				[header: string]: string | string[];
		  };
	observe?: HttpObserve = 'body';
	params?:
		| HttpParams
		| {
				[param: string]: string | string[];
		  };
	reportProgress?: boolean;
	responseType?: 'json';
	withCredentials?: boolean;
	context?: HttpContext;

	constructor() {
		this.headers = new HttpHeaders();
		this.params = new HttpParams();
		this.context = new HttpContext();
	}
}