import _ from 'lodash';
import { PrimaryPubKey, PubKey } from '../types';
import { MultiDeviceProtocol } from '../protocols';

export async function getGroupMembers(
  groupId: PubKey
): Promise<Array<PrimaryPubKey>> {
  const groupConversation = window.ConversationController.get(groupId.key);
  const groupMembers = groupConversation
    ? groupConversation.attributes.members
    : undefined;

  if (!groupMembers) {
    return [];
  }

  const promises = (groupMembers as Array<string>).map(async (member: string) =>
    MultiDeviceProtocol.getPrimaryDevice(member)
  );
  const primaryDevices = await Promise.all(promises);

  return _.uniqWith(primaryDevices, (a, b) => a.isEqual(b));
}

export function isMediumGroup(groupId: PubKey): boolean {
  const conversation = window.ConversationController.get(groupId.key);

  if (!conversation) {
    return false;
  }

  return Boolean(conversation.isMediumGroup());
}
