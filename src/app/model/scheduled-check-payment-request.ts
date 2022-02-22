import { OtherFeeDto } from "./other-fee-dto";

export class ScheduledCheckPaymentRequest {
    paymentId: number;
    loanNumber: number;
    confirmationNumber: string;
    phonePayServiceFee: number;
    feeList: OtherFeeDto[] = [];
    deleteFeeList: number[] = [];
    paymentAdviceType: string;
    paymentAdviceNotes: string;

     
    accountNumber:string;
    routingNumber: string;
    accountType: string;
    emails: string;
    payorName: string;
    payorType: string;
    payorStreetAddress: string;
    payorCity: string;
	payorState: string;
	payorZip: string;
    payorPhone: string;
    enteredBy: string;
}
