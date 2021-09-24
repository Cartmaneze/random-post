/* tslint:disable:no-console */
import * as Dockerode from 'dockerode';

export abstract class TestContainer {
    protected dockerode: Dockerode;
    protected container: Dockerode.Container;

    constructor() {
        this.dockerode = new Dockerode();
    }

    abstract runContainer();

    async stopAndRemoveContainer(): Promise<void> {
        if (!this.container) {
            throw new Error('No container running');
        }
        await this.container.stop();
        await this.container.remove();
        console.log('Container stopped');
    }

}
