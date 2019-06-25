import { Component, OnInit } from '@angular/core';
import { userService } from 'app/user.service';

@Component({
  selector: 'app-devotions',
  templateUrl: './devotions.component.html',
  styleUrls: ['./devotions.component.scss']
})
export class DevotionsComponent implements OnInit {
  data = [];
  constructor(private userservice: userService) { }

  ngOnInit() {
    let params = {
      lang: 'en'
    }

    this.userservice.getdevotions(params).subscribe( (data) => {
      console.log(data);
      this.data = data.data;
    })
  }

}
