import { EnvConfigInterface } from './Config';

const config: EnvConfigInterface = {
    nodeEnv: 'prod',
    host: '0.0.0.0',
    logger: {
        level: 'info',
    },
    sentry: {
        hasSentry: true,
    },
    docs: {
        hasDocs: false,
    },
};

module.exports = { ...config };
