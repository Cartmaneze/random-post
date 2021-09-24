import { Controller, Get } from '@nestjs/common';
import { HealthResponse } from '../../../core/components/health/application/data/output/HealthResponse';

@Controller('health')
export class HealthCheckController {
    @Get()
    isHealthy(): HealthResponse {
        return new HealthResponse(true);
    }
}
