import { EnvConfigInterface } from './Config';

const config: EnvConfigInterface = {
    nodeEnv: 'local',
    host: 'localhost',
    logger: {
        level: 'debug',
    },
    sentry: {
        hasSentry: false,
    },
    docs: {
        hasDocs: true,
        user: process.env.DOCS_USER || '',
        password: process.env.DOCS_PASSWORD || '',
    },
};

module.exports = { ...config };
