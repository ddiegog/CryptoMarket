import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private commonData: CommonService){}

  connectMetamask():void {

    this.commonData.connectMetamask()
    .then((account:string) => {
      console.log('Connected with account: '+ account);
      CommonService.walletLinked = account;
    })
    .catch((error:any) => {
      //alert('Failed to connect: '+ error);
    });

  }


}
