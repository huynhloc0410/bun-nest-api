import { Module } from '@nestjs/common';
import { CallsModule } from './calls/calls.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
    imports: [CallsModule,
        TypeOrmModule.forRoot({
          type: 'mysql', // Change to 'postgres' if using PostgreSQL
          host: '192.168.0.236',
          port: 3306, // Change to 5432 for PostgreSQL
          username: 'root',
          password: 'Appliance@123',
          database: 'capstone',
          autoLoadEntities: true,
          synchronize: true,
        }),
        AnalyticsModule,
      ],
})
export class AppModule {}
