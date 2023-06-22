import { Component } from '@angular/core';
import { DataService } from '../data-service.service';
import { RouterModule } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  constructor(private data: DataService, private commonData: CommonService){}

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
