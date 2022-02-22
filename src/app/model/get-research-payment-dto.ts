import { OtherFeeDto } from "./other-fee-dto";
import { PropertyDto } from "./property-dto";
import { GetSchedulePaymentListDto } from "./get-schedule-payment-list-dto";

export class GetResearchPaymentDto {
	propertyInfo: PropertyDto;
	loanNumbers: number[]=[];
    borrowerName: string;
	borrowerLastName: string;
	coBorrowerName: string;
	coBorrowerLastName: string;
	paymentList: GetSchedulePaymentListDto[]=[];
}
