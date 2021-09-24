import { StatsD } from 'hot-shots';
import config from '../config/Config';
import logger from '../Logger';

export function initStatsdClient(): StatsD {
    return new StatsD({
        host: config.statsd.host,
        port: config.statsd.port,
        prefix: `nomad.api.${config.nodeEnv}.`,
        errorHandler(error) {
            return logger.warn('Statsd error. Error in socket: ', error);
        },
    });
}
