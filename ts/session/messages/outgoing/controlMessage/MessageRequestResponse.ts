import { SignalService } from '../../../../protobuf';
import { fromHexToArray } from '../../../utils/String';
import { ContentMessage } from '../ContentMessage';
import { MessageParams } from '../Message';

interface MessageRequestResponseParams extends MessageParams {
  publicKey: string;
  isApproved: boolean;
}

export class MessageRequestResponse extends ContentMessage {
  private readonly publicKey: Uint8Array;
  private readonly isApproved: boolean;

  constructor(params: MessageRequestResponseParams) {
    super({
      timestamp: params.timestamp,
      publicKey: params.publicKey,
      isApproved: params.isApproved,
    } as MessageRequestResponseParams);
    this.publicKey = fromHexToArray(params.publicKey);
    this.isApproved = params.isApproved;
  }

  public contentProto(): SignalService.Content {
    return new SignalService.Content({
      messageRequestResponse: this.messageRequestResponseProto(),
    });
  }

  public messageRequestResponseProto(): SignalService.MessageRequestResponse {
    return new SignalService.MessageRequestResponse({
      publicKey: this.publicKey,
      isApproved: this.isApproved,
    });
  }
}
