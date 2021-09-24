/* tslint:disable:no-console */
export default async function() {
    const containers = (global as any).containers;
    if (containers && containers.length > 0) {
        await Promise.all(containers.map(container => container.stopAndRemoveContainer()));
    }
}
