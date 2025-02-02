import { Controller, Get, Query, Post, Body } from "@nestjs/common";
import { CallService } from "./calls.service";
import { CreateCallDto } from "./dto/create-call.dto";

@Controller('calls')
export class CallsController{
    constructor(private readonly callService: CallService){}

    @Get()
    getCallType(@Query('type') type : string){
        return {type, response: this.callService.getCallsType(type)};
    }

    @Post()
    createCall(@Body() createCallDto : CreateCallDto){
        return this.callService.createCall(createCallDto);
    }
}