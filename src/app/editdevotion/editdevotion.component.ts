import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { userService } from 'app/user.service';

@Component({
  selector: 'app-editdevotion',
  templateUrl: './editdevotion.component.html',
  styleUrls: ['./editdevotion.component.scss']
})
export class EditdevotionComponent implements OnInit {
  devId = '';

  constructor(private route:ActivatedRoute, private userservice: userService) { }

  ngOnInit() {
    this.devId = this.route.snapshot.params['id'];
    this.getDevotionById();
  }

  getDevotionById(){
    let params = {
      _id: this.devId,
      lang: localStorage.getItem('lang')
    };

    this.userservice.getDevotionById(params).subscribe( data => {
      console.log(data);
    })


  }

}
