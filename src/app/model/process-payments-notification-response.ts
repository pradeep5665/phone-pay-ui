import { FailedEmailsDto } from "./failed-emails-dto";
import { FailedPrintsDto } from "./failed-prints-dto";
import { GetProcessPaymentsListDto } from "./get-process-payments-list-dto";

export class ProcessPaymentsNotificationResponse {

    isSuccessful: boolean;
	message: string;
    emailSentSuccessfully : number;
	emailFailedToSend : number;
	letterPrintedSuccessfully : number;
	letterFailedToPrint : number;
	successfulIds : number[] = [];
    updatedForNoti : boolean;
    processPaymentsList : GetProcessPaymentsListDto[]=[];
	emailResStatus : string;
	printResStatus : string;
	failedEmailsListDtos : FailedEmailsDto[]=[];
	failedPrintsListDtos : FailedPrintsDto[]=[];
	failedEmailsList : FailedEmailsDto[][]=[];
	failedPrintsList : FailedPrintsDto[][]=[];		
}
