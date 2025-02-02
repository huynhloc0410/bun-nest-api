import { Module } from '@nestjs/common';
import { CallsModule } from './calls/calls.module';

@Module({
    imports: [CallsModule],
})
export class AppModule {}
