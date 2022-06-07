import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUserService } from '../services/api-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

	public email: string = '';
	public password: string = '';

	constructor(public apiAuth: ApiUserService, private router: Router){
		if(this.apiAuth.userData){
			this.router.navigate(['/']);
		}

	}

  ngOnInit(): void {
  }

	login(){
		this.apiAuth.login(this.email, this.password).subscribe(response => {
			if(response.success === 1){
				this.router.navigate(['/']);
			}
		})

	}

}
