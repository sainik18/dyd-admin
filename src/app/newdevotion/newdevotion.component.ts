import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { userService } from 'app/user.service';

@Component({
  selector: 'app-newdevotion',
  templateUrl: './newdevotion.component.html',
  styleUrls: ['./newdevotion.component.scss']
})
export class NewdevotionComponent implements OnInit {
  
  public devotionForm = new FormGroup({
    lang: new FormControl('', Validators.compose([Validators.minLength(1)])),
    quote_date: new FormControl('', Validators.compose([Validators.minLength(1)])),
    topic: new FormControl('', Validators.compose([Validators.minLength(1)])),
    bible_verse: new FormControl('', Validators.compose([Validators.minLength(1)])),
    devotion: new FormControl('', Validators.compose([Validators.minLength(1)])),
    prayer: new FormControl('', Validators.compose([Validators.minLength(1)])),
    confession: new FormControl('', Validators.compose([Validators.minLength(1)])),
  });
  
  constructor(private snotifyService: SnotifyService, private userservice: userService ) { }

  ngOnInit() {
  }
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

  onDevotionSubmit(){
    this.userservice.insertDevotion(this.devotionForm.value).subscribe( data => {
      console.log(data);
      // this.devotionForm.reset();
      let body = data.msg;
      let title = '';
      if(data.status){
        this.snotifyService.info(body, title, this.getConfig());
      }else {
        this.snotifyService.error(body, title, this.getConfig());
      }
      
    })
    
  }

}
