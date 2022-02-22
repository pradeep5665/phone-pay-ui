import { StatisticPaymentDto } from "./statistic-payment-dto";

export class GetStatisticDetailsDto {
    date: string;
    monthName: string;
	paymentCount: number;
    
    totalPayment: number;
    paymentDto: StatisticPaymentDto[] = [];
    dateAgent : string;
}
