import { createConnection, getConnection } from 'typeorm';

import postgresConfiguration from '../../../src/secondaryAdapters/postgres/common/postgresConfiguration';

export const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms));

export const setupSchema = async () => {
    const existingOptions = await postgresConfiguration();
    return await createConnection({
        ...existingOptions,
    });
};

export const shutdownConnection = async () => {
    await getConnection().close();
};
