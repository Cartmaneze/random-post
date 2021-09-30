import * as assert from 'assert';
import * as DotEnv from 'dotenv';
import { Level } from 'pino';

import { capitalize } from '../../core/sharedKernel/capitalize';

export const ALLOWED_NODE_ENV = [
    'local',
    'test',
    'ci',
    'dev',
    'staging',
    'qa',
    'prod',
];

export interface EnvConfigInterface {
    nodeEnv: string;
    host: string;
    logger: {
        level: Level;
    };
    sentry: {
        hasSentry: boolean;
    };
    docs: {
        hasDocs: false;
    } | {
        hasDocs: true;
        user: string;
        password: string;
    };
}

export interface ConfigInterface extends EnvConfigInterface {
    sentry: EnvConfigInterface['sentry'] & {
        dsn: string;
    };
    statsd: {
        host: string;
        port: number;
    };
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
    };
    googleSearch: {
        apiKey: string;
        cseId: string;
    };
}

let config: ConfigInterface;

function configure(): ConfigInterface {
    const nodeEnv = process.env.NODE_ENV || 'local';
    assert(ALLOWED_NODE_ENV.indexOf(nodeEnv) > -1);
    const path = `env/.env.${nodeEnv}`;
    DotEnv.config({ path });
    const envConfig = require(`./${capitalize(nodeEnv)}Config`);
    return {
        nodeEnv,
        logger: {
            level: 'info',
        },
        sentry: {
            dsn: process.env.SENTRY_DSN || '',
            hasSentry: true,
        },
        docs: {
            hasDocs: true,
            user: process.env.DOCS_USER || '',
            password: process.env.DOCS_PASSWORD || '',
        },
        statsd: {
            host: process.env.GRAPHITE_HOST || '',
            port: Number(process.env.GRAPHITE_PORT) || 8125,
        },
        db: {
            type: 'postgres',
            host: process.env.TYPEORM_HOST || 'localhost',
            port: process.env.TYPEORM_PORT ? Number(process.env.TYPEORM_PORT) : 5432,
            username: process.env.TYPEORM_USERNAME || 'postgres',
            password: process.env.TYPEORM_PASSWORD || '',
            database: process.env.TYPEORM_DATABASE || 'postgres',
        },
        googleSearch: {
            apiKey: process.env.SEARCH_GOOGLE_API_KEY,
            cseId: process.env.SEARCH_GOOGLE_CSE_ID,
        },
        ...envConfig,
    };
}

config = configure();

export default config;
