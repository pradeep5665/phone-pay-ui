import { ResearchPaymentDto } from "./research-payment-dto";

export class ResearchPaymentResposne {
    isSuccessful: boolean;
	message: string;
	researchPaymentDto: ResearchPaymentDto[] = [];
}
