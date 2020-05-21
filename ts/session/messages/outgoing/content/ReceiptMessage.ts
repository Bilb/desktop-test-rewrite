import { ContentMessage } from './ContentMessage';
import { SignalService } from '../../../../protobuf';

export class ReceiptMessage extends ContentMessage {

  protected contentProto(): SignalService.Content {
    return new SignalService.Content({
      receiptMessage: this.receiptProto(),
    });
  }

  protected receiptProto(): SignalService.ReceiptMessage {
    throw new Error('Not implemented');
  }
}
