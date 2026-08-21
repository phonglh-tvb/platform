import { Controller, Get } from '@nestjs/common';
import type { HealthResponse, MessageResponse } from '@platform/shared-types';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): MessageResponse {
    return this.appService.getData();
  }

  @Get('health')
  getHealth(): HealthResponse {
    return this.appService.getHealth();
  }
}
