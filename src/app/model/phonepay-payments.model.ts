import { PropertyDto } from './property-dto';
import { LoanAccounts } from './loan-accounts';
import { LoanInfoDto } from './loan-info-dto';
import { PhonePayFeeDto } from './phone-pay-fee-dto';
import { MailingAddressDto } from './mailing-address-dto';
import { GetSchedulePaymentListDto } from './get-schedule-payment-list-dto';

export class PhonepayPayments {
  constructor() {
    this.propertyInfo =  new PropertyDto();
    this.mailingAddress = new MailingAddressDto();
    this.schedulePaymentList = new Array();
    this.loanInfoList = new Array();
    this.phonePayFeeList = new Array();
  }
  isSucessfull: boolean;
  isPaymentScheduled: boolean;
  isStopFile: boolean;
  message: string;
  borrowerName: string;
  borrowerLastName: string;
  borrowerEmail: string;
  coBorrower: string;
  coBorrowerLastName: string;
  coBorrowerEmail: string;
  loanInfoList: LoanInfoDto[];
  phonePayFeeList: PhonePayFeeDto[];
  schedulePaymentList: GetSchedulePaymentListDto[];
  propertyInfo: PropertyDto;
  mailingAddress: MailingAddressDto;
  phoneNumber: string;
}
