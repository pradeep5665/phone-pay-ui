import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../service/auth.service';
import { ValidateUserService } from '../service/validate-user.service';
import { ValidateUser } from '../model/validate-user.model';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;
  invalidLogin: boolean;
  url: string;
  token: string;
  validateUser = new ValidateUser();
  param1: string;
  decoded: any;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthenticationService,
    private validateUserService: ValidateUserService) {
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
   sessionStorage.removeItem('userToken1');
   sessionStorage.removeItem('userDetails');
   this.token = sessionStorage.getItem('userToken');
   console.log('token on login:', this.token);
   this.decoded = jwt_decode(this.token);
   console.log('decoded token value: ', this.decoded);
   var username = this.decoded.sub;
   console.log('decoded username value: ', username);
  sessionStorage.setItem('userToken1', this.token);
  sessionStorage.setItem('userDetails',JSON.stringify(this.decoded));
  console.log('decoded username value: ', sessionStorage.getItem('userDetails'));
  sessionStorage.setItem('adviceGroup', this.decoded.adviceGroup);
  console.log("AdviceGroup", sessionStorage.getItem('adviceGroup'));

  if(this.decoded.authorities === 'ServicingAdmin'){
    console.log(this.decoded.authorities);
    this.router.navigate(['app-admin-dashboard']);

  }else if(this.decoded.authorities ==='ServicingUser'){
    console.log(this.decoded.authorities);
    this.router.navigate(['check-request']);
  } else {
    this.router.navigate(['app-login']);
  }
  }

}

