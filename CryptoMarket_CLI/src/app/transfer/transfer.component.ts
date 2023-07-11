import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private commonService: CommonService) { }

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
      this.commonService.openSnackBar('You have to provide an address to transfer!', 'error');
      return;
    }

    if(!/^0x[a-fA-F0-9]{40}$/.test(this.to)){
      this.commonService.openSnackBar('The address is invalid!', 'error');
      return;
    }

    if(this.amount < 0.001 || this.amount > 10000000){
      this.commonService.openSnackBar('You can only transfer between 0.001 and 10000000 Otts', 'error');
      return;
    }

    if(this.amount > this.balance){
      this.commonService.openSnackBar('The amount to transfer must be equal or less than your balance!', 'error');
      return;
    }

  }

  transfer(): void {
    this.validateTransfer();
    
    

  }

}
