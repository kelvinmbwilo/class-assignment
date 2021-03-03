import { Component, OnInit } from '@angular/core';
import {fadeIn} from '../animations';
import {OperationConflict} from './operation-conflict';
import {Operation} from './operation';

@Component({
  selector: 'app-algorirthm',
  templateUrl: './algorirthm.component.html',
  styleUrls: ['./algorirthm.component.scss'],
  animations: [fadeIn]
})
export class AlgorirthmComponent implements OnInit {

  databaseTransactions: string[] = [
    // 'RX1',
    // 'WX1',
    // 'RY2',
    // 'RX2',
    // 'WY2',
    // 'WX2',
    // 'RX1',
    // 'WX1',
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
  databaseTransactions1 = [
    'RX1',
    'WX1',
    'RX1',
    'WY1',
    'WX1',
    'WY1',
    'RX2',
  ];
  numberOfTransactions = [];
  items = [];

  newTrans;
  newItems;
  operation;
  constructor() { }

  ngOnInit(): void {
    this.findUniqueTransactions(this.databaseTransactions);
    this.findTransactionDataItems(this.databaseTransactions);
    this.getAllWriteTransactions(this.databaseTransactions, 'WB');
  }

  prepareOperationList(items: string[]): Operation[] {
    return items.map(i => {
      const action = i.substr(0, 1);
      const transaction = i.substr(2, 1);
      const item = i.substr(1, 1);
      console.log({action}, {transaction}, {item});
      return new Operation(action, transaction, item);
    });
  }

  conflictOperation(scheduleOperationList: Operation[]): OperationConflict[] {
    const results: OperationConflict[] = [];
    for (let i = 0; i < scheduleOperationList.length; i++) {
      const outerScheduleOpr: Operation = scheduleOperationList[i];

      for (let j = 0; j < scheduleOperationList.length; j++) {
        const innerScheduleOper: Operation = scheduleOperationList[j];
        // If is the same transaction no conflict
        if ((outerScheduleOpr.getTransaction() === innerScheduleOper.getTransaction())) {

          // both are Reading, conflict to occur at least one write is required
        } else if (outerScheduleOpr.getAction() === 'R' && innerScheduleOper.getAction() === 'R') {
          // both are on different items, so no impact, continue
        } else if (outerScheduleOpr.getItem() !== innerScheduleOper.getItem()) {
        } else {
          if (i < j) {
            const newConflict: OperationConflict = new OperationConflict(outerScheduleOpr, innerScheduleOper);
            if (results.indexOf(newConflict) === -1) {
              results.push(newConflict);
            }
          }
        }
      }
    }
    return results;
  }

  checkAcyclic(items: string[]): any {
    const operationList: Operation[] = this.prepareOperationList(items);
    const message = {message: 'Is Precedence Graph Acyclic: ', isAcyclic: false};
    const conflictsList = this.conflictOperation(operationList);
    for (const i of conflictsList) {
      const outerFromOper: Operation = i.getFromOperation();
      const outerToOper: Operation = i.getToOperation();

      for (const j of conflictsList) {
        const innerFromOper: Operation = j.getFromOperation();
        const innerToOper: Operation = j.getToOperation();
        if (outerFromOper.equals(innerToOper) && outerToOper.equals(innerFromOper)) { // there is a cycle
          message.message += 'No \n';
          // tslint:disable-next-line:max-line-length
          message.message += 'There is a cycle between transactions: T' + outerFromOper.getTransaction() + ' and T' + innerFromOper.getTransaction();
          message.isAcyclic = false;
          return message;
        }
      }
    }
    message.isAcyclic = true;
    message.message += 'Yes \n';
    message.message += 'The graph is acyclic.\n';
    return message;
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

  addItems(): any {
    this.databaseTransactions.push(`${this.operation}${this.newItems}${this.newTrans}`);
    this.newTrans = '';
    this.newItems = '';
    this.operation = '';
  }
}
