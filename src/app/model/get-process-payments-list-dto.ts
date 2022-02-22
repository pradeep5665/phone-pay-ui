export class GetProcessPaymentsListDto {
    paymentId: number;
	loanNumber: number;
	monthlyAmount: number;
	additionalPrincipal: number;
    additionalEscrow: number;
	lateFee: number;
	nsfFee: number;

	createDate: string
	confirmationNumber: string;
	nameOnAccount: string;
	accountNumber: string;
	routingNumber: string;
	accountType: string;
	phonePayFee: number;
	corporateAdvance: number;
	otherTypePayments: number;
	advice: boolean;
	adviceType: number;
	adviceNote: string;
	sendLetter: boolean;
	emails: string;
}
