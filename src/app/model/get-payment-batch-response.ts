import { ProcessingPaymentsResponse } from "./processing-payments-response";

export class GetPaymentBatchResponse {
    isSuccessful: boolean;
	message: string;
    
    ppsResponse: ProcessingPaymentsResponse;
}
 