import { Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository, Not, MoreThanOrEqual } from 'typeorm';
import { Analytics } from '../entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
  ) {}

  async trackLogin(userId: string): Promise<{ userId: string; status: string }> {
    const existingLogin = await this.analyticsRepository.findOne({
      where: { userId },
      order: { loginTime: 'DESC' },
    });
  
    if (existingLogin && !existingLogin.logoutTime) {
      return { userId, status: 'User is already logged in' };
    }
  
    const newLogin = this.analyticsRepository.create({
      userId,
      loginTime: new Date(),
    });
  
    await this.analyticsRepository.save(newLogin);
  
    return { userId, status: 'Login recorded' };
  }
  
  

  async trackLogout(userId: string): Promise<{userId: string; status: string}> {
    const lastLogin = await this.analyticsRepository.findOne({
      where: { userId },
      order: { loginTime: 'DESC' },
    });

    if (lastLogin) {
      lastLogin.logoutTime = new Date();
      await this.analyticsRepository.save(lastLogin);
      return { userId, status: 'Log Out recorded' };
    }else{
      return  { userId, status: 'Can not found this user id: ' + userId };
    }
  }

  async getDailyLogins(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight

    return this.analyticsRepository.count({
      where: { loginTime: MoreThanOrEqual(today) },
    });
  }

  async getMonthlyLogins(): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1); // First day of the month
    startOfMonth.setHours(0, 0, 0, 0);

    return this.analyticsRepository.count({
      where: { loginTime: MoreThanOrEqual(startOfMonth) }, 
    });
  }

  async getYearlyLogins(): Promise<number> {
    const startOfYear = new Date();
    startOfYear.setMonth(0, 1); // January 1st
    startOfYear.setHours(0, 0, 0, 0);

    return this.analyticsRepository.count({
      where: { loginTime: MoreThanOrEqual(startOfYear) }, 
    });
  }


  async getSessionDurations() {
    const sessions = await this.analyticsRepository
      .createQueryBuilder('session')
      .where('session.logoutTime IS NOT NULL AND session.loginTime IS NOT NULL')
      .getMany();
      if (sessions.length === 0) {
        return { shortest: null, longest: null, average: null };
      }
      
      const durations = sessions.map((session) => {
        if (!session.loginTime || !session.logoutTime) return null; 
        return (session.logoutTime.getTime() - session.loginTime.getTime()) / 1000;
      }).filter((duration) => duration !== null); 
    
      if (durations.length === 0) {
        return { shortest: null, longest: null, average: null };
      }
      
      return {
        shortest: Math.min(...durations),
        longest: Math.max(...durations),
        average: durations.reduce((a, b) => a + b, 0) / durations.length,
      };
    }      
}
