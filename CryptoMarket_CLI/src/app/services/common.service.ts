import { Injectable  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';


declare global {
  interface Window { ethereum: any; }
}

@Injectable({
  providedIn: 'root',
  
})
export class CommonService {

  public static walletLinked: string = '';

  connectMetamask(): Promise<string> {
    return new Promise((resolve, reject) => {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then((accounts:any) => 
                {
                  CommonService.walletLinked = accounts;
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


  constructor(private snackBar: MatSnackBar, private overlayContainer: OverlayContainer) { }
}
