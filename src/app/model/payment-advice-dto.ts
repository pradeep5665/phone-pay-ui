export class PaymentAdviceDto {
	id: number
	schedulePaymentId: number;
	adviceId: number;
	completed: number;
	adviceNotes: string;
	processedBy: string;
	batchCode: string;
}
