import { GetResearchPaymentDto } from "./get-research-payment-dto";

export class GetResearchPaymentResponse {
    isSuccessful: boolean;
	message: string;
	researchPaymentDto: GetResearchPaymentDto;
}
