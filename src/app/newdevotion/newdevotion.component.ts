import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newdevotion',
  templateUrl: './newdevotion.component.html',
  styleUrls: ['./newdevotion.component.scss']
})
export class NewdevotionComponent implements OnInit {
  
  devotionForm = new FormGroup({
    lang: new FormControl('', Validators.compose([Validators.minLength(1)])),
    quote_date: new FormControl('', Validators.compose([Validators.minLength(1)])),
    topic: new FormControl('', Validators.compose([Validators.minLength(1)])),
    bible_verse: new FormControl('', Validators.compose([Validators.minLength(1)])),
    devotion: new FormControl('', Validators.compose([Validators.minLength(1)])),
    prayer: new FormControl('', Validators.compose([Validators.minLength(1)])),
    confession: new FormControl('', Validators.compose([Validators.minLength(1)])),
  });
  constructor() { }

  ngOnInit() {
  }

  onDevotionSubmit(){}

}
