import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  url: string = 'https://localhost:7108/api/user/login';

		private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("usuario")!));

  constructor(private _http: HttpClient) {}

	public get userData(): User {
		return this.userSubject.value;
	}

  login(email: string, password: string): Observable<Response> {
		return this._http.post<Response>(this.url, { email, password }).pipe(
			map(res => {
				if(res.success === 1) {
					const user:User = res.data;
					localStorage.setItem('user', JSON.stringify(user))
					this.userSubject.next(user);
				}
				return res;
			})
		);
  }
	logout(){
		localStorage.removeItem('user');
		this.userSubject.next({email:'', token:''});
	}
}
