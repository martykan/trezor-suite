import type { Params, Response } from '../params';
import type {
    CardanoSignTransaction,
    CardanoSignTransactionExtended,
    CardanoSignedTxData,
} from './cardano';

export declare function cardanoSignTransaction(
    params: Params<CardanoSignTransaction>,
): Response<CardanoSignedTxData>;

export declare function cardanoSignTransaction(
    params: Params<CardanoSignTransactionExtended>,
): Response<CardanoSignedTxData & { serializedTx: string }>;
