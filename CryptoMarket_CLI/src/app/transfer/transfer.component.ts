import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { DataService } from '../services/data-service.service';
import { Transaction } from '../models/transaction.model';
import { ApiResponse } from '../models/api-response.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private commonService: CommonService, private dataService: DataService) { }

  private userLinkedSubscription: Subscription = new Subscription();
  
  to : string = '';
  message: string = '';
  amount: number = 0;
  isLoading: boolean = false;
  transactions: Transaction[] = [
    { amount: 12.5, message: 'Payment', toWallet: "0xf89341959ce874ba581dccf5001747d46fac2b20", date: new Date(Date.now())},
    { amount: 1, message: 'Buy', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 10000)},
    { amount: 3, message: '4571562356', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 15000)},
    { amount: 44, message: 'fsadf', toWallet: "0xf89341959ce874ba581dccf5001747d46fac2b20", date: new Date(Date.now() - 200000)},
    { amount: 52, message: 'thanks', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 250000)},
    { amount: 55, message: 'crypto', toWallet: "0xf89341959ce874ba581dccf5001747d46fac2b20", date: new Date(Date.now() - 270000)},
    { amount: 43.5, message: 'payment', toWallet: "0xf89341959ce874ba581dccf5001747d46fac2b20", date: new Date(Date.now() - 290000)},
    { amount: 15.5, message: 'crypto', toWallet: "0xf89341959ce874ba581dccf5001747d46fac2b20", date: new Date(Date.now() - 340000)},
    { amount: 35.5, message: 'thanks', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 450000)},
    { amount: 14.4, message: 'thanks', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 500000)},
    { amount: 15.54, message: 'crypto', toWallet: "0xf89341959ce874ba581dccf5001747d46fac2b20", date: new Date(Date.now() - 600000)},
    { amount: 15.54, message: 'thanks', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 650000)},
    { amount: 15.555, message: 'crypto', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 700000)},
    { amount: 65.7, message: 'crypto thanks', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 800000)},
    { amount: 14.5, message: 'crypto', toWallet: "0xf89341959ce874ba581dccf5001747d46fac2b20", date: new Date(Date.now() - 820000)},
    { amount: 14.5, message: 'crypto thanks', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 860000)},
    { amount: 45.2, message: 'payment thanks', toWallet: "0xf89341959ce874ba581dccf5001747d46fac2b20", date: new Date(Date.now() - 870000)},
    { amount: 16.46, message: 'sadf', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 900000)},
    { amount: 57.5, message: '23f', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 950000)},
    { amount: 99, message: 'asdf', toWallet: "0x72cbcae7352545996bfa53ac6a1c07cb1b18f82d", date: new Date(Date.now() - 990000)},
  ];
  showCount: number = 10;

  balance: number = 0;

  ngOnInit(): void {
    this.balance = this.commonService.getCurrentUser().balance;
    this.userLinkedSubscription = this.commonService.userLinked$.subscribe(
      userLinked => {
        this.balance = userLinked.balance;
    });
    

  }

  changeShow(): void {
    this.showCount = (this.showCount == 10 ? 20 : 10);
  }

  ngOnDestroy(): void { 
    this.userLinkedSubscription.unsubscribe();
  }

  updateMessage(event: Event): void {
    this.message = (event.target as HTMLInputElement).value;
  }

  checkAmount(event: Event): void {
    this.amount = (event.target as HTMLInputElement).valueAsNumber;
    console.log(this.amount);
    if(this.amount < 0){
      this.amount = 0;
    }
  }

  cleanVariables(): void {
    this.to = '';
    this.message = '';
    this.amount = 0;
  }

  validateTransfer(): boolean{

    if(!this.to){
      this.commonService.openSnackBar('You have to provide an address to transfer!', 'error');
      return false;
    }

    if(!/^0x[a-fA-F0-9]{40}$/.test(this.to)){
      this.commonService.openSnackBar('The address is invalid!', 'error');
      return false;
    }

    if(this.amount < 0.001 || this.amount > 10000000){
      this.commonService.openSnackBar('You can only transfer between 0.001 and 10000000 Otts', 'error');
      return false;
    }

    if(this.amount > this.balance){
      this.commonService.openSnackBar('The amount to transfer must be equal or less than your balance!', 'error');
      return false;
    }

    return true;
  }

  transfer(): void {
    if(!this.validateTransfer()) return;

    let transaction = new Transaction(0, 1, this.amount, undefined, this.commonService.getWalletLinked(), this.to, this.message);

    this.isLoading = true;

    //firmar
    const payload = "I confirm my approval to transfer "+ this.amount +" Otts to the account " + this.to + " using MetaMask.";
    this.commonService.signMessage(payload)
      .then((signed => {

        if(signed){

          transaction.signedPayload = payload;
          transaction.signature = signed;

          this.dataService.addTransaction(transaction)
            .subscribe((response: ApiResponse) => {
              this.isLoading = false;

              if(response.error){
                this.commonService.openSnackBar(response.error, 'error');
                return;
              }

              this.cleanVariables();
              this.dataService.getBalance(this.commonService.getWalletLinked());
              this.commonService.openSnackBar('Transfer completed successfully!', 'success');

            }, 
            (err:any)=>{
              this.isLoading = false;
              console.error(err);
              this.commonService.openSnackBar(err.message, 'error');
            });
        }
        else{
          this.isLoading = false;
          this.commonService.openSnackBar("Please, sign the transaction!", "error");
          return;
        }
      }))
  }
}
