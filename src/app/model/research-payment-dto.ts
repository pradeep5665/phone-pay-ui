export class ResearchPaymentDto {
    paymentId: number
	userId: number
	loanNumber: number;
	borrowerName: string;
	coBorrowerName: string;
	paymentDate: string;
	totalAmount: string;
	paymentStatus: string;
	monthlyPayment: string;
	phonePayFee : number;
	lateProcess  : boolean
}
