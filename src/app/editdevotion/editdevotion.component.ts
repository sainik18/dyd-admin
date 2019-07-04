import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { userService } from 'app/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';

@Component({
  selector: 'app-editdevotion',
  templateUrl: './editdevotion.component.html',
  styleUrls: ['./editdevotion.component.scss']
})
export class EditdevotionComponent implements OnInit {
  devId = '';
  selectedLang = 'English';
  public devotionForm = new FormGroup({
    lang: new FormControl(localStorage.getItem('lang'), Validators.compose([Validators.minLength(1)])),
    quote_date: new FormControl('', Validators.compose([Validators.minLength(1)])),
    topic: new FormControl('', Validators.compose([Validators.minLength(1)])),
    bible_verse: new FormControl('', Validators.compose([Validators.minLength(1)])),
    devotion: new FormControl('', Validators.compose([Validators.minLength(1)])),
    prayer: new FormControl('', Validators.compose([Validators.minLength(1)])),
    confession: new FormControl('', Validators.compose([Validators.minLength(1)])),
    _id: new FormControl(this.devId)
  });
  constructor(private route:ActivatedRoute, private snotifyService: SnotifyService, private userservice: userService) { }

  ngOnInit() {
    this.devId = this.route.snapshot.params['id'];
    this.getDevotionById();
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
        bodyMaxLength: 50,
        titleMaxLength: 50,
        backdrop: -1,
        position: SnotifyPosition.rightTop,
        timeout: 5000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
    };
}

  getDevotionById(){
    let params = {
      _id: this.devId,
      lang: localStorage.getItem('lang')
    };

    this.userservice.getDevotionById(params).subscribe( data => {
      this.devotionForm.patchValue(data.data[0]);
      this.selectedLang = data.data[0].lang;
    })
  }

  updateDevotion(){
    console.log(this.devotionForm.value);
    this.userservice.updateDevotionById(this.devotionForm.value).subscribe( data => {
      console.log(data);
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
