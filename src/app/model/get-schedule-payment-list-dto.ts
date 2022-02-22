import { OtherFeeDto } from "./other-fee-dto";
import { PhonePayBankDetailsDto } from "./phone-pay-bank-details-dto";
import { GetPaymentAdviceListDto } from "./get-payment-advice-list-dto";
import { PaymentAdviceDto } from "./payment-advice-dto";

export class GetSchedulePaymentListDto {

    paymentId: number;
	//userId: number;
	loanNumber: number;
	//scheduledType: string;
	processedDate: string;
	scheduledDate: string;
	confNum: string;
	totalPayment: string;

	accountNumber:string;
	routingNumber: string;
	accountType: string;
	emails: string;
	payorName: string;
	payorType: string;
	payorAddress: string;
	payorState: string;
	payorCity: string;
	payorZip: string
	payorPhone: string;
	enteredBy: string;
  canceledBy: string;
  canceledDate: string;

	otherFeeList: OtherFeeDto[];
  bankDetails: PhonePayBankDetailsDto;
	paymentAdvice: PaymentAdviceDto;
	printConfirmation:boolean;
}
