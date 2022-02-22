import { FailedProcessPaymentsDto } from "./failed-process-payments-dto";

export class ProcessingPaymentsResponse {
    successfulPayments: number[];
    failedPayments: FailedProcessPaymentsDto[];
    //failedPayments: number[];

    status: string;
	paymentBatchId: number;

    numOfSuccessfulPayments: number;
    totalSuccessfulPayments: number;
    numNonAdvicePayments: number;
    totalNonAdvicePayments: number;
    numCashiering: number;
    totalCashiering: number;
    numCollections: number;
    totalCollections: number;
    numBankruptcy: number;
    totalBankruptcy: number;
    numLossMit: number;
    totalLossMit: number;
    numZionsTel: number;
    totalZionsTel: number;
    numZionsTad: number;
    totalZionsTad: number;
    numBk071: number;
    totalBk071: number;
    numBk073: number;
    totalBk073: number;
}
