import { Mapper } from '../../../../../sharedKernel/interfaces/Mapper';
import { Welcome } from '../../../domain/data/Welcome';
import { WelcomeResponse } from '../../data/output/WelcomeResponse';

export class WelcomeResponseMapper implements Mapper<Welcome, WelcomeResponse> {
    map(from: Welcome): WelcomeResponse {
        return WelcomeResponse.fromObject({
            ...from,
        });
    }
}

const WelcomeResponseMapperType = Symbol.for('WelcomeResponseMapper');
export { WelcomeResponseMapperType };
