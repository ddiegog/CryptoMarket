import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private walletLinkedSubscription: Subscription = new Subscription();
  walletLinked: string = '';

  isLoading : boolean = false;

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
    this.isLoading = true;
    this.commonService.connectMetamask()
    .then((account:string) => {
      console.log('Connected with account: '+ account);
      this.walletLinked = account;
      this.isLoading = false;
    })
    .catch((error:any) => {
      this.isLoading = false;

      //alert('Failed to connect: '+ error);
    })

  }


}
