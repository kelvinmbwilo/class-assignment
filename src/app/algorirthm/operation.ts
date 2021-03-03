export class Operation {
  action: string;
  transaction: any;
  item: any;

  constructor(action, transaction, item) {
    this.action = action;
    this.transaction = transaction;
    this.item = item;
  }

  getItem(): any {
    return this.item;
  }

  setItem(item): void {
    this.item = item;
  }

  getTransaction(): any {
    return this.transaction;
  }

  setTransaction(transaction): void {
    this.transaction = transaction;
  }

  getAction(): any {
    return this.action;
  }

  setAction(action): void {
    this.action = action;
  }

  // tslint:disable-next-line:ban-types
  equals(obj: Operation): boolean {
    if (this === obj) {
      return true;
    }
    if (!obj) {
      return false;
    }
    const other: Operation = (obj as Operation);
    if (this.transaction !== other.transaction) {
      return false;
    }
    return false;
  }
}
