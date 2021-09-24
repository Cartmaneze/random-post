/* tslint:disable:no-console */
import { Client } from 'pg';

import config from '../../../src/configuration/config/Config';
import { sleep } from './base';
import { TestContainer } from './TestContainer';

interface PgConnectionOptions {
    user: string;
    password: string;
    database: string;
    host: string;
    port: number;
}

export class PgContainer extends TestContainer {

    private readonly options: PgConnectionOptions;

    constructor() {
        super();
        console.log(config.nodeEnv);
        this.options = {
            user: config.db.username,
            password: config.db.password,
            database: config.db.database,
            port: config.db.port,
            host: config.db.host,
        };
    }

    public async runContainer(): Promise<void> {
        try {
            this.container = await this.dockerode.createContainer({
                Image: 'postgres:11.2',
                name: 'nest-js-template-pgtest',
                ExposedPorts: {
                    [`${this.options.port}/tcp`]: { },
                },
                Env: [
                    `POSTGRES_USER=${this.options.user}`,
                    `POSTGRES_PASSWORD=${this.options.password}`,
                    `POSTGRES_DB=${this.options.database}`,
                ],
                HostConfig: {
                    PortBindings: {
                        ['5432/tcp']: [ { HostPort: `${this.options.port}` } ],
                    },
                },
            });
        } catch (e) {
          const res = await this.dockerode.getEvents({
              filters: {
                  type: [ 'container' ],
              },
          });
          console.log('res', res);
          console.log(e);
        }
        console.log('Container built.. starting..');
        await this.container.start();
        console.log('Container started... waiting for boot...');
        await this.waitPostgresStarted();
        console.log('Container booted!');
    }

    private async waitPostgresStarted() {
        const waitTime = 30000;
        const timeout = setTimeout(
            async () => {
                console.log(`Was not able to connect to Postgres container in ${waitTime} ms. Exiting..`);
                await this.stopAndRemoveContainer();
                process.exit(1);
            },
            waitTime,
        );
        let connecting = true;
        console.log('Attempting connection... ');
        while (connecting) {
            try {
                const pgClient = new Client(this.options);
                await pgClient.connect();
                await pgClient.end();
                clearTimeout(timeout);
                connecting = false;
            } catch (e) {
                console.log(e.message);
            }
            await sleep(500);
        }
    }
}
