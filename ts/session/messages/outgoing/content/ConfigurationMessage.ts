// this is not a very good name, but a configuration message is a message sent to our other devices so sync our current public and closed groups

import { ContentMessage } from './ContentMessage';
import { SignalService } from '../../../../protobuf';
import { MessageParams } from '../Message';
import { Constants } from '../../..';
import { ECKeyPair } from '../../../../receiver/keypairs';
import { fromHexToArray } from '../../../utils/String';
import { PubKey } from '../../../types';

interface ConfigurationMessageParams extends MessageParams {
  activeClosedGroups: Array<ConfigurationMessageClosedGroup>;
  activeOpenGroups: Array<string>;
  displayName: string;
  profilePicture?: string;
  profileKey?: Uint8Array;
}

export class ConfigurationMessage extends ContentMessage {
  public readonly activeClosedGroups: Array<ConfigurationMessageClosedGroup>;
  public readonly activeOpenGroups: Array<string>;
  public readonly displayName: string;
  public readonly profilePicture?: string;
  public readonly profileKey?: Uint8Array;

  constructor(params: ConfigurationMessageParams) {
    super({ timestamp: params.timestamp, identifier: params.identifier });
    this.activeClosedGroups = params.activeClosedGroups;
    this.activeOpenGroups = params.activeOpenGroups;
    this.displayName = params.displayName;
    this.profilePicture = params.profilePicture;
    this.profileKey = params.profileKey;

    if (!this.activeClosedGroups) {
      throw new Error('closed group must be set');
    }

    if (!this.activeOpenGroups) {
      throw new Error('open group must be set');
    }

    if (!this.displayName || !this.displayName?.length) {
      throw new Error('displayName must be set');
    }

    if (this.profilePicture && typeof this.profilePicture !== 'string') {
      throw new Error('profilePicture set but not an Uin8Array');
    }

    if (this.profileKey && !(this.profileKey instanceof Uint8Array)) {
      throw new Error('profileKey set but not an Uin8Array');
    }
  }

  public ttl(): number {
    return Constants.TTL_DEFAULT.CONFIGURATION_MESSAGE;
  }

  public contentProto(): SignalService.Content {
    return new SignalService.Content({
      configurationMessage: this.configurationProto(),
    });
  }

  protected configurationProto(): SignalService.ConfigurationMessage {
    return new SignalService.ConfigurationMessage({
      closedGroups: this.mapClosedGroupsObjectToProto(this.activeClosedGroups),
      openGroups: this.activeOpenGroups,
      displayName: this.displayName,
      profilePicture: this.profilePicture,
      profileKey: this.profileKey,
    });
  }

  private mapClosedGroupsObjectToProto(
    closedGroups: Array<ConfigurationMessageClosedGroup>
  ): Array<SignalService.ConfigurationMessage.ClosedGroup> {
    return (closedGroups || []).map(m =>
      new ConfigurationMessageClosedGroup(m).toProto()
    );
  }
}

export class ConfigurationMessageClosedGroup {
  public publicKey: string;
  public name: string;
  public encryptionKeyPair: ECKeyPair;
  public members: Array<string>;
  public admins: Array<string>;

  public constructor({
    publicKey,
    name,
    encryptionKeyPair,
    members,
    admins,
  }: {
    publicKey: string;
    name: string;
    encryptionKeyPair: ECKeyPair;
    members: Array<string>;
    admins: Array<string>;
  }) {
    this.publicKey = publicKey;
    this.name = name;
    this.encryptionKeyPair = encryptionKeyPair;
    this.members = members;
    this.admins = admins;

    // will throw if publik key is invalid
    PubKey.cast(publicKey);

    if (
      !encryptionKeyPair?.privateKeyData?.byteLength ||
      !encryptionKeyPair?.publicKeyData?.byteLength
    ) {
      throw new Error('Encryption key pair looks invalid');
    }

    if (!this.name?.length) {
      throw new Error('name must be set');
    }

    if (!this.members?.length) {
      throw new Error('members must be set');
    }
    if (!this.admins?.length) {
      throw new Error('admins must be set');
    }

    if (this.admins.some(a => !this.members.includes(a))) {
      throw new Error('some admins are not members');
    }
  }

  public toProto(): SignalService.ConfigurationMessage.ClosedGroup {
    return new SignalService.ConfigurationMessage.ClosedGroup({
      publicKey: fromHexToArray(this.publicKey),
      name: this.name,
      encryptionKeyPair: {
        publicKey: this.encryptionKeyPair.publicKeyData,
        privateKey: this.encryptionKeyPair.privateKeyData,
      },
      members: this.members.map(fromHexToArray),
      admins: this.admins.map(fromHexToArray),
    });
  }
}
