import { Injectable } from '@nestjs/common';

import { Welcome } from '../../../../core/components/welcome/domain/data/Welcome';
import { Converter } from '../../../../core/sharedKernel/interfaces/Converter';
import { WelcomeEntity } from '../data/WelcomeEntity';

@Injectable()
export class WelcomeEntityConverter implements Converter<Welcome, WelcomeEntity> {

    from(from: Welcome): WelcomeEntity {
        return WelcomeEntity.fromObject({ ...from });
    }

    to(to: WelcomeEntity): Welcome {
        return Welcome.fromObject({ ...to });
    }
}

const WelcomeEntityConverterType = Symbol.for('WelcomeEntityConverter');
export { WelcomeEntityConverterType };
