import { Injectable  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';
import { last, map } from 'rxjs';
import { DataService } from './data-service.service';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';
import { ethers } from 'ethers';


declare global {
  interface Window { ethereum: any; web3: any; }
}

@Injectable({
  providedIn: 'root',
  
})
export class CommonService {

  provider = new ethers.BrowserProvider(window.ethereum);

  constructor(
    private snackBar: MatSnackBar, 
    private overlayContainer: OverlayContainer,
    private dataService: DataService
    ) {}
    

  private walletLinkedSource = new BehaviorSubject<string>('');
  walletLinked$ = this.walletLinkedSource.asObservable();
  
  user : User = this.defaultUser();

  private userLinkedSource = new BehaviorSubject<User>(this.defaultUser());
  userLinked$ = this.userLinkedSource.asObservable();

  getCurrentUser() : User {
    return this.user;
  }

  setCurrentUser(user : User){
    //this.user = this.defaultUser();
    this.userLinkedSource.next(user);
  }

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
    let wallet64 = localStorage.getItem('wallet');
    if(wallet64){
      this.walletLinkedSource.next(wallet64);

      if(!this.user){
        this.dataService.getUser(atob(wallet64)!).subscribe(r =>{
          this.user = r.data;
        }, 
        error => {
          console.log(error.message);
        })
      }
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

                    this.user = r;
                    resolve(accounts[0]);

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

  private logInRegister(wallet: string): Promise<User> {

    return new Promise<User>((resolve, reject) => {
      
      this.dataService.logInRegister(wallet)
        .subscribe((response:ApiResponse) => {

          if(response.error){
            this.openSnackBar(response.error, 'error');
            reject(response.error);
            return;
          }

          this.changeWalletLinkedState(wallet);
          this.setCurrentUser(response.data.user);
          localStorage.setItem('token', response.data.token);

          this.openSnackBar('Connected!', 'success');

          resolve(response.data.user);

        }, error => {

          let e = 'There was an error during the request: ' + error.message;
          console.error(e);
          this.openSnackBar(e, 'error');

          reject(e);

        });

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

  logOut(alert: boolean = false): void {
    this.unlinkAll();
    if(alert) this.openSnackBar('Logged Out', 'success');
  }

  verifyToken(cb: () => void): void {
    this.dataService.checkTokenValidity().subscribe(
      ()=>{}, 
      (error)=>{
        console.error(error.message);
        cb();
        this.openSnackBar('Your session has expired. Please log in again.', 'alert');
      })
  }

  signMessage(message: string): Promise<string> {

    return new Promise<string>(async (resolve) => {
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = await this.provider.getSigner();
      signer.signMessage(message).then((s)=>{
        resolve(s);
      }).catch(x => {
        console.log(x);
        resolve("");
      });

    });
   
  }

  private defaultUser() : User {
    return new User('','',0,'','',0);
  }
}
