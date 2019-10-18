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

  imageSrc: string = '';
  thumb: string = '';
  selectedFile: File = null;
  fd = new FormData();

  public testimoniesForm = new FormGroup({
    videolink1: new FormControl('', Validators.compose([Validators.minLength(1)])),
    title1: new FormControl('', Validators.compose([Validators.minLength(1)])),
    readmore1: new FormControl('', Validators.compose([Validators.minLength(1)])),
    date1: new FormControl('', Validators.compose([Validators.minLength(1)])),
    thumbnail1: new FormControl('', Validators.compose([Validators.minLength(1)])),
    videolink2: new FormControl('', Validators.compose([Validators.minLength(1)])),
    title2: new FormControl('', Validators.compose([Validators.minLength(1)])),
    readmore2: new FormControl('', Validators.compose([Validators.minLength(1)])),
    date2: new FormControl('', Validators.compose([Validators.minLength(1)])),
    thumbnail2: new FormControl('', Validators.compose([Validators.minLength(1)])),
    videolink3: new FormControl('', Validators.compose([Validators.minLength(1)])),
    title3: new FormControl('', Validators.compose([Validators.minLength(1)])),
    readmore3: new FormControl('', Validators.compose([Validators.minLength(1)])),
    date3: new FormControl('', Validators.compose([Validators.minLength(1)])),
    thumbnail3: new FormControl('', Validators.compose([Validators.minLength(1)]))
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
      if(data.status){
        this.snotifyService.info(body, title, this.getConfig());
      }else {
        this.snotifyService.error(body, title, this.getConfig());
      }
      
    })
  }

  uploadImage(event, type){
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
    this.userservice.uploadImage(this.fd).subscribe( (data) => {
      this.fd.delete('file');
      if(data.status){
        this.testimoniesForm.controls[type].setValue(data.url);
      }

    })
  }

  handleInputChange(e, thumb) {
    console.log("input change");
    this.thumb = thumb;
    console.log(this.thumb);
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
 this.testimoniesForm.controls[this.thumb].setValue(this.imageSrc);
 console.log(this.imageSrc);
}

}
