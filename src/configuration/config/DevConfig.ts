import { EnvConfigInterface } from './Config';

const config: EnvConfigInterface = {
    nodeEnv: 'dev',
    host: '0.0.0.0',
    logger: {
        level: 'info',
    },
    sentry: {
        hasSentry: true,
    },
    docs: {
        hasDocs: true,
        user: process.env.DOCS_USER || '',
        password: process.env.DOCS_PASSWORD || '',
    },
};

module.exports = { ...config };

