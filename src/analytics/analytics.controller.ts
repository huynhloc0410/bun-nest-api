import { Controller, Get, Post, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('login/:userId')
  trackLogin(@Param('userId') userId: string) {
    return this.analyticsService.trackLogin(userId);
  }

  @Post('logout/:userId')
  trackLogout(@Param('userId') userId: string) {
    return this.analyticsService.trackLogout(userId);
  }

  @Get('logins/daily')
  getDailyLogins() {
    return this.analyticsService.getDailyLogins();
  }

  @Get('logins/monthly')
  getMonthlyLogins() {
    return this.analyticsService.getMonthlyLogins();
  }

  @Get('logins/yearly')
  getYearlyLogins() {
    return this.analyticsService.getYearlyLogins();
  }

  @Get('sessions/duration')
  getSessionDurations() {
    return this.analyticsService.getSessionDurations();
  }
}
