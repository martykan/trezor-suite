import { Type, Static } from '@trezor/schema-utils';
import { PROTO } from '../../../constants';
import { GetPublicKey, PublicKey, DerivationPath } from '../../params';

// cardanoGetAddress

export type CardanoCertificatePointer = Static<typeof CardanoCertificatePointer>;
export const CardanoCertificatePointer = Type.Object({
    blockIndex: Type.Number(),
    txIndex: Type.Number(),
    certificateIndex: Type.Number(),
});

export type CardanoAddressParameters = Static<typeof CardanoAddressParameters>;
export const CardanoAddressParameters = Type.Object({
    addressType: PROTO.EnumCardanoAddressType,
    path: Type.Optional(DerivationPath),
    stakingPath: Type.Optional(DerivationPath),
    stakingKeyHash: Type.Optional(Type.String()),
    certificatePointer: Type.Optional(CardanoCertificatePointer),
    paymentScriptHash: Type.Optional(Type.String()),
    stakingScriptHash: Type.Optional(Type.String()),
});

export type CardanoGetAddress = Static<typeof CardanoGetAddress>;
export const CardanoGetAddress = Type.Object({
    addressParameters: CardanoAddressParameters,
    protocolMagic: Type.Number(),
    networkId: Type.Number(),
    address: Type.Optional(Type.String()),
    showOnTrezor: Type.Optional(Type.Boolean()),
    derivationType: Type.Optional(PROTO.EnumCardanoDerivationType),
    chunkify: Type.Optional(Type.Boolean()),
});

export interface CardanoAddress {
    addressParameters: CardanoAddressParameters;
    protocolMagic: number;
    networkId: number;
    serializedPath: string;
    serializedStakingPath: string;
    address: string;
}

// cardanoGetNativeScriptHash

export interface CardanoNativeScript {
    type: PROTO.CardanoNativeScriptType;
    scripts?: CardanoNativeScript[];
    keyHash?: string;
    keyPath?: DerivationPath;
    requiredSignaturesCount?: number;
    invalidBefore?: string;
    invalidHereafter?: string;
}

export interface CardanoGetNativeScriptHash {
    script: CardanoNativeScript;
    displayFormat: PROTO.CardanoNativeScriptHashDisplayFormat;
    derivationType?: PROTO.CardanoDerivationType;
}

export interface CardanoNativeScriptHash {
    scriptHash: string;
}

// cardanoGetPublicKey

export type CardanoGetPublicKey = Static<typeof CardanoGetPublicKey>;
export const CardanoGetPublicKey = Type.Intersect([
    GetPublicKey,
    Type.Object({
        derivationType: Type.Optional(PROTO.EnumCardanoDerivationType),
    }),
]);

export interface CardanoPublicKey extends PublicKey {
    node: PROTO.HDNodeType;
}

// cardanoSignTransaction

export interface CardanoInput {
    path?: DerivationPath;
    prev_hash: string;
    prev_index: number;
}

export interface CardanoToken {
    assetNameBytes: string;
    amount?: string;
    mintAmount?: string;
}

export interface CardanoAssetGroup {
    policyId: string;
    tokenAmounts: CardanoToken[];
}

export type CardanoOutput = (
    | {
          addressParameters: CardanoAddressParameters;
      }
    | {
          address: string;
      }
) & {
    amount: string;
    tokenBundle?: CardanoAssetGroup[];
    datumHash?: string;
    format?: PROTO.CardanoTxOutputSerializationFormat;
    inlineDatum?: string;
    referenceScript?: string;
};

export interface CardanoPoolOwner {
    stakingKeyPath?: DerivationPath;
    stakingKeyHash?: string;
}

export interface CardanoPoolRelay {
    type: PROTO.CardanoPoolRelayType;
    ipv4Address?: string;
    ipv6Address?: string;
    port?: number;
    hostName?: string;
}

export interface CardanoPoolMetadata {
    url: string;
    hash: string;
}

export interface CardanoPoolMargin {
    numerator: string;
    denominator: string;
}

export interface CardanoPoolParameters {
    poolId: string;
    vrfKeyHash: string;
    pledge: string;
    cost: string;
    margin: CardanoPoolMargin;
    rewardAccount: string;
    owners: CardanoPoolOwner[];
    relays: CardanoPoolRelay[];
    metadata: CardanoPoolMetadata;
}

export interface CardanoCertificate {
    type: PROTO.CardanoCertificateType;
    path?: DerivationPath;
    pool?: string;
    poolParameters?: CardanoPoolParameters;
    scriptHash?: string;
    keyHash?: string;
}

export interface CardanoWithdrawal {
    path?: DerivationPath;
    amount: string;
    scriptHash?: string;
    keyHash?: string;
}

export type CardanoMint = CardanoAssetGroup[];

export interface CardanoCollateralInput {
    path?: DerivationPath;
    prev_hash: string;
    prev_index: number;
}

export interface CardanoRequiredSigner {
    keyPath?: DerivationPath;
    keyHash?: string;
}

export interface CardanoReferenceInput {
    prev_hash: string;
    prev_index: number;
}

export interface CardanoCVoteRegistrationDelegation {
    votePublicKey: string;
    weight: number;
}

export interface CardanoCVoteRegistrationParameters {
    votePublicKey?: string;
    stakingPath: DerivationPath;
    paymentAddressParameters?: CardanoAddressParameters;
    nonce: string;
    format?: PROTO.CardanoCVoteRegistrationFormat;
    delegations?: CardanoCVoteRegistrationDelegation[];
    votingPurpose?: number;
    paymentAddress?: string;
}

export interface CardanoAuxiliaryData {
    hash?: string;
    cVoteRegistrationParameters?: CardanoCVoteRegistrationParameters;
}

export interface CardanoSignTransaction {
    inputs: CardanoInput[];
    outputs: CardanoOutput[];
    fee: string;
    ttl?: string;
    certificates?: CardanoCertificate[];
    withdrawals?: CardanoWithdrawal[];
    validityIntervalStart?: string;
    auxiliaryData?: CardanoAuxiliaryData;
    mint?: CardanoMint;
    scriptDataHash?: string;
    collateralInputs?: CardanoCollateralInput[];
    requiredSigners?: CardanoRequiredSigner[];
    collateralReturn?: CardanoOutput;
    totalCollateral?: string;
    referenceInputs?: CardanoReferenceInput[];
    additionalWitnessRequests?: DerivationPath[];
    protocolMagic: number;
    networkId: number;
    signingMode: PROTO.CardanoTxSigningMode;
    derivationType?: PROTO.CardanoDerivationType;
    includeNetworkId?: boolean;
    chunkify?: boolean;
}

export interface CardanoSignedTxWitness {
    type: PROTO.CardanoTxWitnessType;
    pubKey: string;
    signature: string;
    chainCode?: string;
}

export interface CardanoAuxiliaryDataSupplement {
    type: PROTO.CardanoTxAuxiliaryDataSupplementType;
    auxiliaryDataHash: string;
    cVoteRegistrationSignature?: string;
}

export interface CardanoSignedTxData {
    hash: string;
    witnesses: CardanoSignedTxWitness[];
    auxiliaryDataSupplement?: CardanoAuxiliaryDataSupplement;
}
