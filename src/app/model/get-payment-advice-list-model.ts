import { GetPaymentAdviceListDto } from "./get-payment-advice-list-dto";

export class GetPaymentAdviceListModel {
   isSuccessful: boolean;
   message: string;
   paymentAdviceDetailsDto: GetPaymentAdviceListDto[]=[];
}
