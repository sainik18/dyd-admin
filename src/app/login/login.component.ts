import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { userService } from '../user.service';
const eml = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //@ViewChild('f') loginForm: NgForm;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.pattern(eml)),
    password: new FormControl('', Validators.compose([Validators.minLength(3)]))
  });
    constructor(private router: Router,
        private route: ActivatedRoute, private userservice: userService) { }
    ngOnInit(){  
    }

    onLoginSubmit(){

      const logindata = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
    };
    this.userservice.login(logindata).subscribe( (data) => {
      console.log(data);
    })
    }

    // On submit button click    
    onSubmit() {
        this.loginForm.reset();
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

}
