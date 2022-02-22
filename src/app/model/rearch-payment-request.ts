import { SortingList } from "./sorting-list";

export class RearchPaymentRequest {
    fromDate: string;
    toDate: string;
    fromAmount: string;
    toAmount: string;
    loanNumbers: number[] =[];
    servicingAgents: string[] = [];
    firstName: string;
    lastName: string;
    sortingList: SortingList[]=[];
}
