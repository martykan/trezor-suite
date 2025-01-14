import { PROTO } from '../../../constants';
import { AbstractMethod } from '../../../core/AbstractMethod';
import { validateParams, getFirmwareRange } from '../../common/paramsValidator';
import { getMiscNetwork } from '../../../data/coinInfo';
import { validatePath } from '../../../utils/pathUtils';
import { transformAdditionalInfo } from '../additionalInfo';

export default class SolanaSignTransaction extends AbstractMethod<
    'solanaSignTransaction',
    PROTO.SolanaSignTx
> {
    init() {
        this.requiredPermissions = ['read', 'write'];
        this.firmwareRange = getFirmwareRange(
            this.name,
            getMiscNetwork('Solana'),
            this.firmwareRange,
        );

        const { payload } = this;

        // validate bundle type
        validateParams(payload, [
            { name: 'path', required: true },
            { name: 'serializedTx', type: 'string', required: true },
        ]);

        const path = validatePath(payload.path, 2);

        this.params = {
            address_n: path,
            serialized_tx: payload.serializedTx,
            additional_info: transformAdditionalInfo(payload.additionalInfo),
        };
    }

    get info() {
        return 'Sign Solana transaction';
    }

    async run() {
        const cmd = this.device.getCommands();
        const { message } = await cmd.typedCall('SolanaSignTx', 'SolanaTxSignature', this.params);
        return { signature: message.signature };
    }
}
