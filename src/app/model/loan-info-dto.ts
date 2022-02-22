export class LoanInfoDto {

    loanNumber: number;
    unpaidPrincipalBalance: number;
    interestRate: number;
    monthlyPayment: number;
    escrow: number;
    principalAndInterest: number;
    nextDue: string;
    totalPrincipalAmount: number;
    lateFees: number;
    nsfFees: number;
    escrowBalance: number;
    escrowAdvance: number;
    stopPayment: boolean;
    stopDesc: string;
    confirmationNumber: string;

}
