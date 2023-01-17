export enum SnodeNamespaces {
  /**
   * This is the namespace anyone can deposit a message for us
   */
  UserMessages = 0,

  /**
   * This is the namespace used to sync our profile
   */
  UserProfile = 2,
  /**
   * This is the namespace used to sync our contacts
   */
  UserContacts = 3,

  /**
   * The messages sent to a closed group are sent and polled from this namespace
   */
  ClosedGroupMessage = -10,

  /**
   * This is the namespace used to sync the closed group details for each of the closed groups we are polling
   */
  ClosedGroupInfo = 1,
}

type PickEnum<T, K extends T> = {
  [P in keyof K]: P extends K ? P : never;
};

export type SnodeNamespacesGroup = PickEnum<
  SnodeNamespaces,
  SnodeNamespaces.ClosedGroupInfo | SnodeNamespaces.ClosedGroupMessage
>;

export type SnodeNamespacesUser = PickEnum<
  SnodeNamespaces,
  SnodeNamespaces.UserContacts | SnodeNamespaces.UserProfile | SnodeNamespaces.UserMessages
>;

/**
 * Returns true if that namespace is associated with the config of a user (not his messages, only configs)
 */
function isUserConfigNamespace(namespace: SnodeNamespaces) {
  return namespace === SnodeNamespaces.UserContacts || namespace === SnodeNamespaces.UserProfile;
}

/**
 * Returns true if that namespace is associated with the config of a closed group (not its messages, only configs)
 */
function isGroupConfigNamespace(namespace: SnodeNamespaces) {
  return namespace === SnodeNamespaces.ClosedGroupInfo;
}

export const SnodeNamespace = {
  isUserConfigNamespace,
  isGroupConfigNamespace,
};
