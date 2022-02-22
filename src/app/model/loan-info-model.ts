import { LoanInfoDto } from './loan-info-dto';

export class LoanInfoModel {
    isSuccessful: boolean;
    message: string;
    loanInfoList: LoanInfoDto[];
}
