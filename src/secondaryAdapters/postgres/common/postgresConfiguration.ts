import { join } from 'path';
import { getConnectionOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from '../../../configuration/config/Config';

export default async () => {
    let options = { };
    try {
        options = await getConnectionOptions();
    } catch (e) { }

    return {
        ...options,
        ...config.db as PostgresConnectionOptions,
        synchronize: false,
        logging: true,
        entities: [ join(__dirname, '../**/*Entity{.ts,.js}') ],
        migrations: [ join(__dirname, '../../../migrations/*{.ts,.js}') ],
        migrationsRun: true,
    };
};
