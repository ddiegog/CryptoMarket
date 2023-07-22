import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { DataService } from 'src/app/services/data-service.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
  constructor(private dataService: DataService, private commonService: CommonService){
  }

  ngOnInit(): void {
    this.getTransactions();
    this.commonService.refreshData$.subscribe(() => {
      this.getTransactions();
    })
  }

  transactions: Transaction[] = [];

  showCount: number = 10;

  getTransactions(): void {
    this.dataService.getTransactions(20).subscribe(response => {

      if(response.error){
        this.commonService.openSnackBar(response.error, 'error');
        return;
      }
      
      this.transactions = response.data;

    });
  }

  changeShow(): void {
    this.showCount = (this.showCount == 10 ? 20 : 10);
  }


}
