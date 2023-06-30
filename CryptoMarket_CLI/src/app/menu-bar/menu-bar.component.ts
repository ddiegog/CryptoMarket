import { Component } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { RouterModule } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  private walletLinkedSubscription: Subscription = new Subscription();
  walletLinked: string = '';

  isLoading = false;

  constructor(private data: DataService, private commonService: CommonService, private router: Router){}

  ngOnInit() {
    this.walletLinkedSubscription = this.commonService.walletLinked$.subscribe(
      walletLinked => {
        this.walletLinked = walletLinked;
        // Aquí puedes hacer lo que quieras con el valor actualizado
      }
    );
    this.commonService.validateWalletInit()
  }

  ngOnDestroy() {
    // No olvides cancelar la suscripción cuando el componente se destruya
    this.walletLinkedSubscription.unsubscribe();
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
