import { GroupPubkeyType } from 'libsession_util_nodejs';
import { SharedUserConfigMessage } from '../../messages/outgoing/controlMessage/SharedConfigMessage';
import { SnodeNamespaces, SnodeNamespacesGroup } from './namespaces';

export type SwarmForSubRequest = { method: 'get_swarm'; params: { pubkey: string } };

type WithRetrieveMethod = { method: 'retrieve' };
type WithMaxCountSize = { max_count?: number; max_size?: number };
type WithPubkeyAsString = { pubkey: string };
type WithPubkeyAsGroupPubkey = { pubkey: GroupPubkeyType };

type RetrieveAlwaysNeeded = {
  namespace: number;
  last_hash: string;
  timestamp?: number;
};

export type RetrievePubkeySubRequestType = WithRetrieveMethod & {
  params: {
    signature: string;
    pubkey_ed25519: string;
    namespace: number;
  } & RetrieveAlwaysNeeded &
    WithMaxCountSize &
    WithPubkeyAsString;
};

/** Those namespaces do not require to be authenticated for storing messages.
 *  -> 0 is used for our swarm, and anyone needs to be able to send message to us.
 *  -> -10 is used for legacy closed group and we do not have authentication for them yet (but we will with the new closed groups)
 *  -> others are currently unused
 *
 */
// type UnauthenticatedStoreNamespaces = -30 | -20 | -10 | 0 | 10 | 20 | 30;

export type RetrieveLegacyClosedGroupSubRequestType = WithRetrieveMethod & {
  params: {
    namespace: SnodeNamespaces.LegacyClosedGroup; // legacy closed groups retrieve are not authenticated because the clients do not have a shared key
  } & RetrieveAlwaysNeeded &
    WithMaxCountSize &
    WithPubkeyAsString;
};

export type RetrieveGroupAdminSubRequestType = WithRetrieveMethod & {
  params: {
    signature: string;
    namespace: SnodeNamespacesGroup;
  } & RetrieveAlwaysNeeded &
    WithMaxCountSize &
    WithPubkeyAsGroupPubkey;
};

export type RetrieveSubRequestType =
  | RetrieveLegacyClosedGroupSubRequestType
  | RetrievePubkeySubRequestType
  | RetrieveGroupAdminSubRequestType
  | UpdateExpiryOnNodeSubRequest;

/**
 * OXEND_REQUESTS
 */
export type OnsResolveSubRequest = {
  method: 'oxend_request';
  params: {
    endpoint: 'ons_resolve';
    params: {
      type: 0;
      name_hash: string; // base64EncodedNameHash
    };
  };
};

export type GetServiceNodesSubRequest = {
  method: 'oxend_request';
  params: {
    endpoint: 'get_service_nodes';
    params: {
      active_only: true;
      fields: {
        public_ip: true;
        storage_port: true;
        pubkey_x25519: true;
        pubkey_ed25519: true;
      };
    };
  };
};

export type StoreOnNodeParams = {
  pubkey: string;
  ttl: number;
  timestamp: number;
  data: string;
  namespace: number;
  // sig_timestamp?: number;
  signature?: string;
  pubkey_ed25519?: string;
};

export type StoreOnNodeParamsNoSig = Pick<
  StoreOnNodeParams,
  'pubkey' | 'ttl' | 'timestamp' | 'ttl' | 'namespace'
> & { data64: string };

export type DeleteFromNodeWithTimestampParams = {
  timestamp: string | number;
  namespace: number | null | 'all';
} & DeleteSigParameters;
export type DeleteByHashesFromNodeParams = { messages: Array<string> } & DeleteSigParameters;

export type StoreOnNodeMessage = {
  pubkey: string;
  timestamp: number;
  namespace: number;
  message: SharedUserConfigMessage;
};

export type StoreOnNodeData = {
  pubkey: GroupPubkeyType;
  networkTimestamp: number;
  namespace: number;
  data: Uint8Array;
  ttl: number;
};

export type StoreOnNodeSubRequest = { method: 'store'; params: StoreOnNodeParams };
export type NetworkTimeSubRequest = { method: 'info'; params: object };

type DeleteSigParameters = {
  pubkey: string;
  pubkey_ed25519: string;
  signature: string;
};

export type DeleteAllFromNodeSubRequest = {
  method: 'delete_all';
  params: DeleteFromNodeWithTimestampParams;
};

export type DeleteFromNodeSubRequest = {
  method: 'delete';
  params: DeleteByHashesFromNodeParams;
};

export type UpdateExpireNodeParams = {
  pubkey: string;
  pubkey_ed25519: string;
  messages: Array<string>;
  expiry: number;
  signature: string;
  extend?: boolean;
  shorten?: boolean;
};

export type UpdateExpiryOnNodeSubRequest = {
  method: 'expire';
  params: UpdateExpireNodeParams;
};

export type OxendSubRequest = OnsResolveSubRequest | GetServiceNodesSubRequest;

export type SnodeApiSubRequests =
  | RetrieveSubRequestType
  | SwarmForSubRequest
  | OxendSubRequest
  | StoreOnNodeSubRequest
  | NetworkTimeSubRequest
  | DeleteFromNodeSubRequest
  | DeleteAllFromNodeSubRequest
  | UpdateExpiryOnNodeSubRequest;

// eslint-disable-next-line @typescript-eslint/array-type
export type NonEmptyArray<T> = [T, ...T[]];

export type NotEmptyArrayOfBatchResults = NonEmptyArray<{
  code: number;
  body: Record<string, any>;
}>;
