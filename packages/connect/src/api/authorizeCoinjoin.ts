import { AbstractMethod } from '../core/AbstractMethod';
import { getFirmwareRange } from './common/paramsValidator';
import { validatePath, getScriptType } from '../utils/pathUtils';
import { getBitcoinNetwork } from '../data/coinInfo';
import { PROTO } from '../constants';
import { Validate } from '@trezor/schema-utils';

export default class AuthorizeCoinjoin extends AbstractMethod<
    'authorizeCoinjoin',
    PROTO.AuthorizeCoinJoin
> {
    init() {
        const { payload } = this;

        Validate(PROTO.AuthorizeCoinJoin, payload);
        const address_n = validatePath(payload.path, 3);
        const script_type = payload.scriptType || getScriptType(address_n);
        const coinInfo = getBitcoinNetwork(payload.coin || address_n);
        this.firmwareRange = getFirmwareRange(this.name, coinInfo, this.firmwareRange);
        this.preauthorized = payload.preauthorized;

        this.params = {
            coordinator: payload.coordinator,
            max_rounds: payload.maxRounds,
            max_coordinator_fee_rate: payload.maxCoordinatorFeeRate,
            max_fee_per_kvbyte: payload.maxFeePerKvbyte,
            address_n,
            coin_name: coinInfo?.name,
            script_type,
            amount_unit: payload.amountUnit,
        };
    }

    async run() {
        const cmd = this.device.getCommands();

        if (this.preauthorized) {
            if (await cmd.preauthorize(false)) {
                // device is already preauthorized
                return { message: 'Success' };
            }
        }

        const response = await cmd.typedCallV2('AuthorizeCoinJoin', 'Success', this.params);
        return response.message;
    }
}
