import { Injectable } from "@nestjs/common";
import { CreateCallDto } from "./dto/create-call.dto";

@Injectable()
export class CallService {

    private staticResponses = {
        appointment: {
            time: '9:00 AM',
            location: 'Phoenix',
        },
        support: {
            technician:[
                {id: '1', name: 'ba'},
                {id: '2', name: 'json'}
        ],
            duration: '10 minutes',
            type: 'order'
        },
        reminder: 'You have appointment at 9:00 AM'
    }

    getCallsType(callType: string): any {
        return this.staticResponses[callType] || 'Unknow type';
    }

    createCall(createCallDto: CreateCallDto){
        const {message, callType} = createCallDto;
        return {
            clientMessage: message,
            response: this.getCallsType(callType),
        };
    }
}