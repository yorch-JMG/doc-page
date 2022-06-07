import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiUserService } from "../services/api-user.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private apiUserService: ApiUserService){}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
		const user = this.apiUserService.userData;

		if(user){
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${user.token}`
				}
			});
		}
		return next.handle(request);
	}

}
