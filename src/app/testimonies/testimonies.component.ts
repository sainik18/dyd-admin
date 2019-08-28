import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { userService } from 'app/user.service';

@Component({
  selector: 'app-testimonies',
  templateUrl: './testimonies.component.html',
  styleUrls: ['./testimonies.component.scss']
})
export class TestimoniesComponent implements OnInit {

  public testimoniesForm = new FormGroup({
    videolink1: new FormControl('', Validators.compose([Validators.minLength(1)])),
    title1: new FormControl('', Validators.compose([Validators.minLength(1)])),
    readmore1: new FormControl('', Validators.compose([Validators.minLength(1)])),
    videolink2: new FormControl('', Validators.compose([Validators.minLength(1)])),
    title2: new FormControl('', Validators.compose([Validators.minLength(1)])),
    readmore2: new FormControl('', Validators.compose([Validators.minLength(1)])),
    videolink3: new FormControl('', Validators.compose([Validators.minLength(1)])),
    title3: new FormControl('', Validators.compose([Validators.minLength(1)])),
    readmore3: new FormControl('', Validators.compose([Validators.minLength(1)])),
  });

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
        global: {
            newOnTop: true,
            maxAtPosition: -1,
            maxOnScreen: 6,
        }
    });
    return {
        bodyMaxLength: 80,
        titleMaxLength: 15,
        backdrop: -1,
        position: SnotifyPosition.rightBottom,
        timeout: 3000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
    };
}
  constructor(private snotifyService: SnotifyService, private userservice: userService) { }

  ngOnInit() {
    this.userservice.getTestimonies().subscribe((data) => {
      console.log(data);
      this.testimoniesForm.patchValue(data.data[0]);
    })
  }
  
  onTestimoniesSubmit(){
    this.userservice.updateTestimonies(this.testimoniesForm.value).subscribe( (data) => {
      let body = data.msg;
      let title = '';
      console.log(data);
      if(data.status){
        this.snotifyService.info(body, title, this.getConfig());
      }else {
        this.snotifyService.error(body, title, this.getConfig());
      }
      
    })
  }

}
