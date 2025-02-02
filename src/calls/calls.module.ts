import { Module } from "@nestjs/common";
import { CallsController } from "./calls.controllder";
import { CallService } from "./calls.service";

@Module({
    controllers: [CallsController],
    providers: [CallService],
})
export class CallsModule {}