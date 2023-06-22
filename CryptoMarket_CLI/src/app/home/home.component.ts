import { Component } from '@angular/core';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private commonData: CommonService){}

  connectMetamask():void {

    this.commonData.connectMetamask()
    .then(account => {
      alert('Connected with account: '+ account);
    })
    .catch(error => {
      alert('Failed to connect: '+ error);
    });

  }


}
