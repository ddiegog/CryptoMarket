import { Component } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { RouterModule } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  constructor(private data: DataService, private commonData: CommonService){}

  walletLinked = CommonService.walletLinked;

  connectMetamask():void {

    this.commonData.connectMetamask()
    .then((account:string) => {
      alert('Connected with account: '+ account);
    })
    .catch((error:string) => {
      
    });

  }

}
