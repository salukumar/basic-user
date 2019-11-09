import { Component, OnInit } from '@angular/core';
import { User, QuoteService } from '../quote.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user: User = { 
    "gender": "",
    "name": {
        "title": "",
        "first": "",
        "last": ""
    },
    "location": {
        "street": "",
        "city": "",
        "state": "",
        "zip": null,
    },
    "email": "",
    "username": "",
    "password": "",
    "salt": "",
    "md5": "",
    "sha1": "",
    "sha256": "",
    "registered": null,
    "dob": null,
    "phone": "",
    "cell": "",
    "picture": {
        "large": "",
        "medium": "",
        "thumbnail": ""
    }

} ;

toastMessage: string = '';
invalidTimeToaster = false; 

  constructor(private quoteService: QuoteService, private route: Router) { }

  ngOnInit() {
  }
  onSubmit() { // add  user function
      let dob = this.user.dob;
      this.user.dob = moment(`${dob.year}-${dob.month}-${dob.day}`).valueOf()  
      this.quoteService.addUser(this.user);
      this.showToaster('You have successfully added a user');
      this.route.navigate(['']);
  }


  onFileChanged(image: any) {
    if (image.target.files && image.target.files[0]) {

      if (image.target.files[0].type.indexOf('image') < 0) {
        this.showToaster('Please upload a valid image');
        return;
      }

      const reader = new FileReader();

      reader.readAsDataURL(image.target.files[0]);

      reader.onload = (eventImage: any) => {
        this.user.picture.large = eventImage.target.result;
      };
    }
  }

  private showToaster(msg: string) {

    this.toastMessage = msg;
    this.invalidTimeToaster = true;

    setTimeout(() => {
      this.invalidTimeToaster = false;
    }, 3000);

  }
}
