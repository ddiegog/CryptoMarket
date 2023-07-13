import { Component } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { RouterModule } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  private walletLinkedSubscription: Subscription = new Subscription();
  private userLinkedSubscription: Subscription = new Subscription();
  walletLinked: string = '';

  isLoading = false;
  balance: number = 0;

  constructor(private dataService: DataService, private commonService: CommonService, private router: Router){}

  ngOnInit() {

    this.walletLinkedSubscription = this.commonService.walletLinked$.subscribe(
      walletLinked => {
        this.walletLinked = walletLinked;
      }
    );
    this.commonService.validateWalletInit()

    this.userLinkedSubscription = this.commonService.userLinked$.subscribe(
      userLinked => {
        this.balance = userLinked.balance;
    });
    
    // get balance
    this.dataService.getBalance(this.walletLinked)
      .subscribe( (response: ApiResponse) =>{

        if(response.error){
          this.commonService.openSnackBar('Error getting the balance: ' + response.error, 'error');
          return;
        }

        this.balance = response.data;

        const auxUser = this.commonService.getCurrentUser();
        auxUser.balance = this.balance;
        this.commonService.setCurrentUser(auxUser);
        
      } );
  }

  ngOnDestroy() {
    this.walletLinkedSubscription.unsubscribe();
    this.userLinkedSubscription.unsubscribe();
  }

  connectMetamask():void {
    this.startLoading();
    this.commonService.connectMetamask()
    .then((account:string) => {
      this.stopLoading();
    })
    .catch((error:string) => {
      this.stopLoading();
    });

  }

  logOut(){
    this.commonService.logOut();
  }

  private startLoading() {
    this.isLoading = true;
  }

  private stopLoading() {
    this.isLoading = false;
  }

  
  navigateToProfile(){
    let wallet = this.commonService.getWalletLinked();

    this.router.navigate(['/profile'], { state: { parameter: wallet } });
  }

}
