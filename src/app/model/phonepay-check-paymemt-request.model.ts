import { ScheduledCheckPaymentRequest } from './scheduled-check-payment-request';
import { PhonePayBankDetailsDto } from './phone-pay-bank-details-dto';

export class PhonepayCheckPaymemtRequest {
    loanNumber: number;
    pay: boolean;
    printedConfirmation: boolean;
    scheduledPayments: ScheduledCheckPaymentRequest[] = [];
    schedulingPayment: ScheduledCheckPaymentRequest;
    emailAddressList: string[] = [];
}
