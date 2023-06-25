import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private walletLinkedSubscription: Subscription = new Subscription();
  walletLinked: string = '';

  constructor(private commonService: CommonService){}

  ngOnInit() {
    this.walletLinkedSubscription = this.commonService.walletLinked$.subscribe(
      walletLinked => {
        this.walletLinked = walletLinked;
      }
    );
  }

  ngOnDestroy() {
    this.walletLinkedSubscription.unsubscribe();
  }

  connectMetamask():void {

    this.commonService.connectMetamask()
    .then((account:string) => {
      console.log('Connected with account: '+ account);
      this.walletLinked = account;
    })
    .catch((error:any) => {
      //alert('Failed to connect: '+ error);
    })

  }


}
