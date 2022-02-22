import { PaymentsInProcessDto } from "./payments-in-process-dto";

export class PaymentsInProcessResponse {
    isSuccessful: boolean;
	message: string;
	paymentInProcessList: PaymentsInProcessDto[] = [];
}
