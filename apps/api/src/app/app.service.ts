import { Injectable } from '@nestjs/common';
import type { HealthResponse, MessageResponse } from '@platform/shared-types';

@Injectable()
export class AppService {
  getData(): MessageResponse {
    return { message: 'Hello API' };
  }

  getHealth(): HealthResponse {
    return { status: 'ok', uptime: process.uptime() };
  }
}
