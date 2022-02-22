import { GetStatisticDetailsDto } from "./get-statistic-details-dto";

export class GetStatisticDetailsResponse {
    isSuccessful: boolean;
    message: string;
    
   statisticPaymentList: GetStatisticDetailsDto[] = [];
}
