import { Injectable  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';
import { last, map } from 'rxjs';


declare global {
  interface Window { ethereum: any; }
}

@Injectable({
  providedIn: 'root',
  
})
export class CommonService {

  private walletLinkedSource = new BehaviorSubject<string>('');
  walletLinked$ = this.walletLinkedSource.asObservable();


  changeWalletLinkedState(newState: string) {
    this.walletLinkedSource.next(newState);
    localStorage.setItem('wallet', newState);
  }

  validateWalletInit(): void {
    let wallet = localStorage.getItem('wallet');
    if(wallet){
      this.walletLinkedSource.next(wallet);
    }
  }

  getWalletLinked(): string {
    return this.walletLinkedSource.getValue();
  }


  connectMetamask(): Promise<string> {
    return new Promise((resolve, reject) => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts:any) => 
                {
                  this.changeWalletLinkedState(accounts[0]);
                  this.openSnackBar('Connected with Metamask!', 'success');
                  resolve(accounts[0])
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

  private logInRegister(wallet: string) {

  }

  openSnackBar(message: string, type: string): void {
    
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
    this.changeWalletLinkedState('');
    this.openSnackBar('Logged Out', 'success');
  }


  constructor(private snackBar: MatSnackBar, private overlayContainer: OverlayContainer) { }
}
