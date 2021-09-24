import * as appmetrics from 'appmetrics';
import { initStatsdClient } from './statsd';

export function startServerMonitoring() {
    appmetrics.setConfig(
        'http', {
            filters: [
                {
                    pattern: 'GET /favicon.ico$',
                    to: '',
                }, {
                    pattern: 'GET /api/health$',
                    to: '',
                },
            ],
        },
    );

    const monitor = appmetrics.monitor();
    const statsdClient = initStatsdClient();

    monitor.on('cpu', function handleCPU(cpu) {
        statsdClient.gauge('cpu.process', cpu.process);
        statsdClient.gauge('cpu.system', cpu.system);
    });

    monitor.on('memory', function handleMem(memory) {
        statsdClient.gauge('memory.process.private', memory.private);
        statsdClient.gauge('memory.process.physical', memory.physical);
        statsdClient.gauge('memory.process.virtual', memory.virtual);
        statsdClient.gauge('memory.system.used', memory.physical_used);
        statsdClient.gauge('memory.system.total', memory.physical_total);
    });

    monitor.on('eventloop', function handleEL(eventloop) {
        statsdClient.gauge('eventloop.latency.min', eventloop.latency.min);
        statsdClient.gauge('eventloop.latency.max', eventloop.latency.max);
        statsdClient.gauge('eventloop.latency.avg', eventloop.latency.avg);
    });

    monitor.on('gc', function handleGC(gc) {
        statsdClient.gauge('gc.size', gc.size);
        statsdClient.gauge('gc.used', gc.used);
        statsdClient.timing('gc.duration', gc.duration);
    });

    monitor.on('http', function handleHTTP(http) {
        const statsdFormaterUrl = http.url.substr(1).replace(/\//, '_');
        statsdClient.timing(`http.${http.method}.${statsdFormaterUrl}.${http.statusCode}`, http.duration);
        statsdClient.increment(`http.${http.method}.${statsdFormaterUrl}.${http.statusCode}`);
    });
}
