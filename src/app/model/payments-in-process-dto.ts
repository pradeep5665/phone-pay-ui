export class PaymentsInProcessDto {
	loanNumber: number;
	associatedLoanAccounts: number[] = [];
    advice: boolean;
    payorName: string;
	payorType: string
	adviceCompleted: boolean;
	cancelled: boolean;
	payorLastName: string;
	dateTime: string;
	totalPayment: number;
	collector: string;
	totalTransactionPayment: number = 0;
	transactionAdvice: boolean;
	isTransactionTotalCalculated: boolean;
	isVisible:boolean;
}
