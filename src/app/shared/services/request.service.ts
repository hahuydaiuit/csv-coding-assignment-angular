import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { RequestOption } from '../models';
import { LoadingService } from './loading/loading.service';
import { CONSTANT } from '../constants';

@Injectable({
	providedIn: 'root',
})
export class RequestService {
	private options: any;

	constructor(public http: HttpClient, public loadingService: LoadingService) {}

	action(api: any, data: any | null = null): Observable<any> {
		const method = api.method as string;

		const option = this.createRequestOptions(api);

		return this.fetch(method, api, data, option);
	}

	public fetch(method: string, api: any, data: any, option: RequestOption): Observable<any> {
		switch (method) {
			case CONSTANT.HTTP_METHOD.GET:
				return this.getData(api, option);
			case CONSTANT.HTTP_METHOD.POST:
				return this.postData(api, data, option);
			case CONSTANT.HTTP_METHOD.PATCH:
				return this.patchData(api, data, option);
			case CONSTANT.HTTP_METHOD.DELETE:
				return this.deleteData(api, data, option);
			case CONSTANT.HTTP_METHOD.PUT:
				return this.putData(api, data, option);
			case CONSTANT.HTTP_METHOD.HEAD:
				return this.headData(api, option);
			default:
				return of(false);
		}
	}

	public headData(api: any, options: any) {
		if (api.loading) {
			this.loadingService.start();
		}
		return this.http.head<any>(api.url, options).pipe(finalize(() => this.loadingService.complete()));
	}

	public getData(api: any, options: any) {
		if (api.loading) {
			this.loadingService.start();
		}
		return this.http.get<any>(api.url, options).pipe(finalize(() => this.loadingService.complete()));
	}

	public postData(api: any, data: any, options: any) {
		if (api.loading) {
			this.loadingService.start();
		}
		return this.http.post<any>(api.url, data, options).pipe(finalize(() => this.loadingService.complete()));
	}

	public patchData(api: any, data: any, options: any) {
		if (api.loading) {
			this.loadingService.start();
		}
		return this.http.patch<any>(api.url, data, options).pipe(finalize(() => this.loadingService.complete()));
	}

	public deleteData(api: any, data: any, options: RequestOption) {
		let optionWithbody = options;
		if (data && Object.keys(data).length > 0) {
			optionWithbody = Object.assign({ body: data }, options);
		}
		if (api.loading) {
			this.loadingService.start();
		}
		return this.http.request('delete', api.url, optionWithbody).pipe(finalize(() => this.loadingService.complete()));
	}

	public putData(api: any, data: any, options: any) {
		if (api.loading) {
			this.loadingService.start();
		}
		return this.http.put<any>(api.url, data, options).pipe(finalize(() => this.loadingService.complete()));
	}

	private createRequestOptions(api: any) {
		this.options = new RequestOption();

		if (api.hasOwnProperty('params')) {
			this.options.params = api.params;
		}

		return this.options;
	}
}
