
import {Operation} from './operation';

export class OperationConflict {
  fromOperation: Operation;
  toOperation: Operation;

  constructor(fromOperation: Operation, toOperation: Operation) {
    this.fromOperation = fromOperation;
    this.toOperation = toOperation;
  }

  getFromOperation(): Operation {
    return this.fromOperation;
  }

  setFromOperation(fromOperation: Operation): void {
    this.fromOperation = fromOperation;
  }

  getToOperation(): Operation {
    return this.toOperation;
  }

  setToOperation(toOperation: Operation): void {
    this.toOperation = toOperation;
  }
}
