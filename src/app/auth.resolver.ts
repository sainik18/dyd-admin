import { Injectable } from '@angular/core';

import { Resolve, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthResolver implements Resolve<Observable<string>> {
    constructor(private router: Router) {}
  
    resolve() {
        let loggedin = false;
        if(localStorage.getItem('email')){
            loggedin = true;
        }else {
            this.router.navigate(['/login'])
        }
      return Observable.of('true').delay(2000);
    }
  }