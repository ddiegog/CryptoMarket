import { Injectable  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';
import { last, map } from 'rxjs';
import { DataService } from './data-service.service';
import { ApiResponse } from '../models/api-response.model';


declare global {
  interface Window { ethereum: any; }
}

@Injectable({
  providedIn: 'root',
  
})
export class CommonService {

  constructor(
    private snackBar: MatSnackBar, 
    private overlayContainer: OverlayContainer,
    private dataService: DataService
    ) { }

  private walletLinkedSource = new BehaviorSubject<string>('');
  walletLinked$ = this.walletLinkedSource.asObservable();


  private changeWalletLinkedState(newState: string) {
    let wallet64 = btoa(newState);
    this.walletLinkedSource.next(wallet64);

    localStorage.setItem('wallet', wallet64);
  }

  private unlinkAll(): void{
    this.walletLinkedSource.next('');
    localStorage.removeItem('token');
    localStorage.removeItem('wallet');
  }

  hasJWT(): boolean{
    return !!localStorage.getItem('token');
  }


  validateWalletInit(): void {
    let wallet = localStorage.getItem('wallet');
    if(wallet){
      this.walletLinkedSource.next(wallet);
    }
  }

  getWalletLinked(): string {
    let wallet = atob(this.walletLinkedSource.getValue())
    return wallet;
  }


  connectMetamask(): Promise<string> {
    return new Promise((resolve, reject) => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts:any) => 
                {
                  this.logInRegister(accounts[0]).then((r) => {
                    resolve(accounts[0])
                  }).catch((err) =>{

                    reject(err);
                  });

                })
                .catch((err:any) => {
                    if (err.code === 4001) {
                        reject('Please connect to MetaMask.');
                    } else {
                        reject(err);
                    }
                });

        } else {
            reject('Metamask is not installed!');
            this.openSnackBar('Metamask is not installed', 'error');
        }
    });
  }

  private logInRegister(wallet: string): Promise<string> {

    return new Promise<string>((resolve, reject) => {
      
      this.dataService.logInRegister(wallet)
        .subscribe((response:ApiResponse) => {

          if(response.error){
            this.openSnackBar(response.error, 'error');
            reject(response.error);
            return;
          }

          this.changeWalletLinkedState(wallet);
          localStorage.setItem('token', response.data.token);

          this.openSnackBar('Connected!', 'success');

          resolve('');

        }, error => {

          let e = 'There was an error during the request: ' + error.message;
          console.error(e);
          this.openSnackBar(e, 'error');

          reject(e);

        });

    });
  
  }

  private openSnackBar(message: string, type: string): void {
    
    this.snackBar.open(message, 'x', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [`custom-snackbar-${type}`],
      politeness: 'assertive',
      data: { key: 'value' }
    });

    const container = this.overlayContainer.getContainerElement();
    container.classList.add('custom-snackbar-error');
    
  }

  logOut(): void {
    this.unlinkAll();
    this.openSnackBar('Logged Out', 'success');
  }


}
