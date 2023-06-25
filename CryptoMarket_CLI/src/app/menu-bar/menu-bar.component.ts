import { Component } from '@angular/core';
import { DataService } from '../services/data-service.service';
import { RouterModule } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  private walletLinkedSubscription: Subscription = new Subscription();
  walletLinked: string = '';

  constructor(private data: DataService, private commonService: CommonService){}

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

    this.commonService.connectMetamask()
    .then((account:string) => {
      
      
    })
    .catch((error:string) => {
      
    });

  }

  logOut(){
    this.commonService.logOut();
  }

}
