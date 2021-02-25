import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-algorirthm',
  templateUrl: './algorirthm.component.html',
  styleUrls: ['./algorirthm.component.scss']
})
export class AlgorirthmComponent implements OnInit {

  databaseTransactions1 = [
    'RX1',
    'WX1',
    'RY2',
    'RX2',
    'WY2',
    'WX2',
    'RX1',
    'WX1',
  ];
  databaseTransactions2 = [
    'RX1',
    'WX1',
    'RY2',
    'WY2',
    'WC3',
    'RC3'
  ];
  databaseTransactions5 = [
    'RX1',
    'WX1',
    'RY2',
    'RX2',
    'WY2',
    'WX2',
    'RX3'
  ];
  databaseTransactions = [
    'RX1',
    'WX1',
    'RX1',
    'WY1',
    'WX1',
    'WY1',
    'RX2',
  ];
  constructor() { }

  ngOnInit(): void {
    this.findUniqueTransactions(this.databaseTransactions);
    this.findTransactionDataItems(this.databaseTransactions);
    this.getAllWriteTransactions(this.databaseTransactions, 'WB');
  }

  findUniqueTransactions(transactionData: string[]): any[] {
    const trans = [];
    transactionData.forEach(transaction => {
      const lastCharacter = transaction.substr(-1, 1);
      if (trans.indexOf(lastCharacter) === -1) {
        trans.push(lastCharacter);
      }
    });
    console.log({trans});
    return trans;
  }

  findTransactionDataItems(transactionData: string[]): any{
    const trans = [];
    transactionData.forEach(transaction => {
      const secondCharacter = transaction.substr(1, 1);
      if (trans.indexOf(secondCharacter) === -1) {
        trans.push(secondCharacter);
      }
    });
    console.log({trans});
    return trans;
  }

  getAllWriteTransactions(transactionData: string[], op): any {
    const found = false;
    transactionData.forEach(transaction => {
      const firstChar = transaction.substr(0, 2);
      if (firstChar === op) {
        console.log('ipo');
        return true;
      }
    });
    return false;
  }

  findItem(transactionData, operation): any {
    return transactionData.find(i => i === operation);
  }

  // Check to see if read of same data occures in more than one transaction
  getAllReadTransactions(transactionData, y, numberOfTransaction): any{
    const result = false;
    let count = 0;
    numberOfTransaction.forEach(trans => {
      const find = transactionData.find(i => i === y + '' + trans);
      if (find) {
        count = count + 1;
      }
    });
    return count >= 2;
  }

  // Check number of reads and write in each transaction
  findNumberOfReadAndWrite(transactionData, numberOfTransaction, op): any {
    let checkReadStatus = false;
    let checkWriteStatus = false;
    checkWriteStatus = this.getAllWriteTransactions(transactionData, 'W' + op);
    checkReadStatus = this.getAllReadTransactions(transactionData, 'R' + op, numberOfTransaction);
    return checkReadStatus && checkWriteStatus;
  }

  performSerializibilty(transactionData, numberOfTransaction): any {
    let result = '';
    let checkStatus: any = '';
    let countDataQualified = 0;
    if (numberOfTransaction.length === 1){
      checkStatus = false;
    } else if (numberOfTransaction.length > 1){
      const uniqueTransactionData = this.findTransactionDataItems(transactionData);
      uniqueTransactionData.forEach(item => {
        const x = this.findNumberOfReadAndWrite(transactionData, numberOfTransaction, item);
        countDataQualified = x ? countDataQualified + 1 : countDataQualified;
      });
      if (countDataQualified >= 1){
        checkStatus = 'TRUE';
      } else {
        checkStatus = 'FALSE';
      }
    }
    if (checkStatus === 'TRUE') {
      // there is cycle in the precedence graph
      result = 'Conflict serializable';
    } else if (checkStatus === 'FALSE'){
      // no cycle in the precedence graph
      result = 'Not conflict serializable';
    } else {
      result = 'In Conclusive';
    }
    return result;
  }

}
