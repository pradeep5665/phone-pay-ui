import { StatisticPaymentDto } from "./statistic-payment-dto";

export class GetStatisticAgentDetailsDto {

    date: string;
    monthName: string;
	paymentCount: number;
    agentName : string;
    dateAgent : string;
    adviceName : string;
    waiveFee : number;
}
