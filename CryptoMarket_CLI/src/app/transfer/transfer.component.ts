import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) { }

  to : string = '';
  message: string = '';
  amount: number = 0;
  isLoading: boolean = false;

  balance: number = 0;

  ngOnInit(): void {
    
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

  validateTransfer(): void{

    if(!this.to){
      this.snackBar.open('You have to provide a wallet to transfer!', 'error');
      return;
    }

    if(this.amount < 0.01 || this.amount > 10000000){
      this.snackBar.open('You can only transfer between 0.01 and 10000000 Otts', 'error');
      return;
    }

    if(this.amount > this.balance){
      this.snackBar.open('The amount to transfer must be equal or less than your balance!', 'error');
      return;
    }


  }

  transfer(): void {
    this.validateTransfer();

  }

}
