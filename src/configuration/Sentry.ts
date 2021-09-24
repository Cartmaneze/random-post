import * as Sentry from '@sentry/node';
import config from './config/Config';

export function isInitSentry() {
    return [ 'dev', 'staging', 'prod' ].includes(config.nodeEnv);
}

if (isInitSentry()) {
    Sentry.init({
        dsn: config.sentry.dsn,
        environment: config.nodeEnv,
    });
}

export default Sentry;
