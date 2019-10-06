import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { userService } from 'app/user.service';

@Component({
  selector: 'app-confession',
  templateUrl: './confession.component.html',
  styleUrls: ['./confession.component.scss']
})
export class ConfessionComponent implements OnInit {

  imageSrc: string = '';
  loaded: boolean = false;
  public confessionForm = new FormGroup({
    videolink: new FormControl('', Validators.compose([Validators.minLength(1)])),
    name: new FormControl('', Validators.compose([Validators.minLength(1)])),
    title: new FormControl('', Validators.compose([Validators.minLength(1)])),
    description: new FormControl('', Validators.compose([Validators.minLength(1)])),
    thumbnail: new FormControl('', Validators.compose([Validators.minLength(1)]))
    
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
    this.userservice.getConfession().subscribe((data) => {
      console.log(data);
      this.confessionForm.patchValue(data.data[0]);
    })
  }

  onConfessionSubmit(){
    this.userservice.updateConfession(this.confessionForm.value).subscribe( (data) => {
      let body = data.msg;
      let title = '';
      if(data.status){
        this.snotifyService.info(body, title, this.getConfig());
      }else {
        this.snotifyService.error(body, title, this.getConfig());
      }
      
    })
  }

  handleInputChange(e) {
    console.log("input change")
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
    }

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
}

_handleReaderLoaded(e) {
  console.log("_handleReaderLoaded")
 var reader = e.target;
 this.imageSrc = reader.result;
 this.confessionForm.controls['thumbnail'].setValue(this.imageSrc);
 console.log(this.imageSrc);
 this.loaded = true;
}

}
