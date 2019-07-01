import { Component, OnInit } from '@angular/core';
import { userService } from 'app/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-devotions',
  templateUrl: './devotions.component.html',
  styleUrls: ['./devotions.component.scss']
})
export class DevotionsComponent implements OnInit {
  data = [];
  modalData : any;
  language = localStorage.getItem('lang');
  constructor(private userservice: userService, private modalService: NgbModal) { }

  ngOnInit() {
    let params = {
      lang: localStorage.getItem('lang')
    }

    this.userservice.getdevotions(params).subscribe( (data) => {
      console.log(data);
      if(data.status){
        this.data = data.data;
      }
      
    })
  }

  viewDevotion(content, _id){
    this.modalData = this.data.filter(row => row._id == _id);
    console.log(this.modalData);
    this.modalService.open(content).result.then((result) => {
  });
  }

}
