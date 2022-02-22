import { GetProcessPaymentsListDto } from "./get-process-payments-list-dto";
import { ProcessingPaymentsResponse } from "./processing-payments-response";

export class ProcessPaymentsResponse {

    isSuccessful: boolean;
	message: string;
    ppsResponse: ProcessingPaymentsResponse;
    successfulIds : number[] = [];
    updatedForNoti : boolean;
    processPaymentsList : GetProcessPaymentsListDto[]=[];
}
