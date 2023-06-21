import { Component } from '@angular/core';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  constructor(private data: DataService){}

  connectWallet():void{
    
    //TEST
    this.data.getUser('asdf').subscribe(
      (response:any) => console.log(response),
      (error:any) => console.log(error));

  }
}
