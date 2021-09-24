import { PgContainer } from './PgContainer';
import { TestContainer } from './TestContainer';

/* tslint:disable:no-console */
export default async function() {
    const containers: TestContainer[] = [ new PgContainer() ];
    await Promise.all(containers.map(container => container.runContainer()));
    (global as any).containers = containers;
}
