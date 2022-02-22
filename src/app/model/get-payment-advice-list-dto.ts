import { OtherFeeDto } from "./other-fee-dto";

export class GetPaymentAdviceListDto {
	borrowerName: string;
	borrowerLastName: string;
	coBorrowerName: string;
	coBorrowerLastName: string;
	payorName: string;
	payorType: string;

	batchCode: string;
	paymentId: number;
	loanNumber: number;
	processedDate: string;
	scheduledDate: string;
	confirmationNumber: string;
	paymentAdviceType: string;
	paymentAdviceMessage: string;
	paymentAdviceStatus: boolean;
	totalPayment: number;
	otherFeeList: OtherFeeDto [];
	enteredBy: string;
	processedBy: string;
	dateCalcelled: boolean;
	removedFromBK:boolean;
	adviceDeletedBy:string;
}
