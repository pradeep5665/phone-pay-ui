import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PhonepayPayments } from '../model/phonepay-payments.model';
import { BankingInfo } from '../model/banking-info';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhonepayPaymentsService } from '../service/phonepay-payments.service';
import { AppComponent } from '../app.component';
import { LoanInfoDto } from '../model/loan-info-dto';
import { formatDate } from '@angular/common';
import { PhonepayCheckPaymemtRequest } from '../model/phonepay-check-paymemt-request.model';
import { PhonepayCheckPaymentResponse } from '../model/phonepay-check-payment-response.model';
import { ScheduledCheckPaymentRequest } from '../model/scheduled-check-payment-request';
import { SchedulePhonePayPaymentsService } from '../service/schedule-phone-pay-payments.service';
import { PhonePayFeeDto } from '../model/phone-pay-fee-dto';
import { DialogObj } from '../dialogBoxModel';
import { OtherFeeDto } from '../model/other-fee-dto';
import { CancelPaymentService } from '../service/cancel-payment.service';
import { CancelPaymentResponse } from '../model/cancel-payment-response';
import { ChekStopFileExistanceService } from '../service/chek-stop-file-existance.service';
import { CheckStopFileExistanceResponse } from '../model/check-stop-file-existance-response';
import { PaymentAdviceDto } from '../model/payment-advice-dto';
import { AutocompleteDirective } from '../autocomplete-off.directive'
@Component({
  selector: 'app-phonepay-check-payment',
  templateUrl: './phonepay-check-payment.component.html',
  styleUrls: ['./phonepay-check-payment.component.css']
})

export class PhonepayCheckPaymentComponent implements OnInit {

  itemDetails : [];
  additionalPrin1: boolean;
  additionalPrin2: boolean;
  additionalEsc1: boolean;
  nsfst: boolean;
  nsfnd: boolean;
  lateFe1: boolean;
  lateFe2: boolean;
  amtName:String;
  otherPmt1: boolean;
  otherPmt2: boolean;
  isLoanFirstChecked : boolean;
  messagetdg : string;
  inputIndex : number;
  otherfee1 : boolean;
  inputIndex1 :number;
  corporatefee1 : boolean;

  schduledPaymentEx : boolean;
  email : boolean;
  email1 : boolean;
  email2 : boolean;
  otherfee : boolean;
  corporatefee : boolean;
  emailValidateMsg : string;
  borrowerType : string;
  tabindex9  : string;
  tabindex10  : string;
  tabindex11  : string;
  tabindex12  : string;
  tabindex13  : string;
  tabindex14  : string;
  tabindex15  : string;

  tabindex19  : string;
  tabindex20  : string;
  tabindex21  : string;
  tabindex22  : string;
  tabindex23  : string;
  tabindex24  : string;
  tabindex25  : string;
  tabindex26  : string;
  tabindex27  : string;
  tabindex28  : string;

  tabindex29  : string;
  tabindex30  : string;
  tabindex31  : string;
  tabindex32  : string;
  tabindex33  : string;
  tabindex34  : string;
  tabindex35  : string;
  tabindex36  : string;
  schedulePaymentListSize: number;
  coBorrowerEmailVal : string;
  checkedBorrowerType : boolean;
  borrowerTypeName:string;
  isRoutingNumMountainAmerica : boolean;
  inputCityValidate = true;
  inputStateValidate =true;
  inputZipValidate =true;
  inputAccountValidate =true;
  accDisplayMsg = false;
  accountnumLen = 0;
  isOtherPayment = false;
  isOtherPayment1 = false;
  otherFeeCount = 0;
  isValidateEmailPrint=false;


  updateTwoDgtMsg(isLoanFirstCheckedChk){
    if(!isLoanFirstCheckedChk){
      this.messagetdg ="";
    }
  }
  updateTwoDgtMsgForSecondLoan(isLoanSecondCheckedChk){
    if(!isLoanSecondCheckedChk){
      this.messagetdg ="";
    }
  }

  getRadioVal(inputVal){
    this.borrowerType = '';

      this.tabindex9 = '';
      this.tabindex10 = '';
      this.tabindex11 = '';
      this.tabindex12 = '';
      this.tabindex13 = '';
      this.tabindex14 = '';
      this.tabindex15 = '';

    if(inputVal === 'borrower'){
      console.log("****inputVal******** : "+inputVal);

      this.tabindex9 = "-1";
      this.tabindex10 = "-1";
      this.tabindex11 = "-1";
      this.tabindex12 = "-1";
      this.tabindex13 = "-1";
      this.tabindex14 = "-1";
      this.tabindex15 = "15";
    }
    if(inputVal === 'coBorrower'){
      console.log("****inputVal******** : "+inputVal+"*********"+this.phonpayForm.get('payorName').value);
      this.tabindex9 = "-1";
      this.tabindex10 = "-1";
      this.tabindex11 = "-1";
      this.tabindex12 = "-1";
      this.tabindex13 = "-1";
      this.tabindex14 = "-1";
      this.tabindex15 = "15";
      this.checkedBorrowerType=true;
    }
    if(inputVal === 'otherBorrower'){
      console.log("****inputVal******** : "+inputVal);
      this.tabindex9 = "9";
      this.tabindex10 = "10";
      this.tabindex11 = "11";
      this.tabindex12 = "12";
      this.tabindex13 = "13";
      this.tabindex14 = "14";
      this.tabindex15 = "15";
      this.checkedBorrowerType=true;
     console.log("oth : "+this.tabindex15);
    }
  }

  firstLoanCheckValue(firstLoanVal,loanCheck1){
      console.log("firstLoanVal : "+firstLoanVal+"  :::::::::::: "+loanCheck1);
      console.log("nsfFirst : "+this.nsfFirst);
      console.log("lateFee1 : "+this.lateFee1);

      this.tabindex19 = '';
      this.tabindex20 = '';
      this.tabindex21 = '';
      this.tabindex22 = '';
      this.tabindex23 = '';
      this.tabindex24 = '';
      this.tabindex25 = '';
      this.tabindex26 = '';
      this.tabindex27 = '';

      if(firstLoanVal === 'firstLoan' && loanCheck1){
        this.tabindex19 = "19";
        this.tabindex20 = "-1";
        this.tabindex21 = "21";
        this.tabindex22 = "22";
        if(this.nsfFirst==="0.00"){
        this.tabindex23 = "-1";
        }else{
          this.tabindex23 = "23";
        }
        if(this.lateFee1==="0.00"){
          this.tabindex24 = "-1";
          }else{
            this.tabindex23 = "24";
          }
        this.tabindex25 = "25";
        this.tabindex26 = "26";
        this.tabindex27 = "27";

      }else{
      this.tabindex19 = "-1";
      this.tabindex20 = "-1";
      this.tabindex21 = "-1";
      this.tabindex22 = "-1";
      this.tabindex23 = "-1";
      this.tabindex24 = "-1";
      this.tabindex25 = "-1";
      this.tabindex26 = "-1";
      this.tabindex27 = "-1";
  }
}

  isOtherPaymentAmount(inputVal){
    console.log("checked :::::: "+inputVal);
    this.firstLoanFeesArray = [];
    if(inputVal){
      this.tabindex20 = "20";
      this.tabindex21 = "-1";
      this.tabindex22 = "-1";
      this.tabindex23 = "-1";
      this.tabindex24 = "-1";
      this.tabindex25 = "-1";
      this.tabindex26 = "26";
      this.tabindex27 = "27";
    }else{
      console.log("checked :::::: "+inputVal);
      this.tabindex20 = "-1";
      this.tabindex21 = "21";
      this.tabindex22 = "22";
      if(this.nsfFirst==="0.00"){
        this.tabindex23 = "-1";
        }else{
          this.tabindex23 = "23";
        }
        if(this.lateFee1==="0.00"){
          this.tabindex24 = "-1";
          }else{
            this.tabindex23 = "24";
          }

      this.tabindex25 = "25";
      this.tabindex26 = "26";
      this.tabindex27 = "27";
    }
  }

  secondLoanCheckValue(secondLoanVal,loanCheck2){
    console.log("secondLoanVal : "+secondLoanVal+"  :::::::::::: "+loanCheck2);
    console.log("nsfFirst : "+this.nsfFirst);
    console.log("lateFee1 : "+this.lateFee1);


    this.tabindex29  = '';
    this.tabindex30  = '';
    this.tabindex31  = '';
    this.tabindex32  = '';
    this.tabindex33  = '';
    this.tabindex34  = '';
    this.tabindex35  = '';
    this.tabindex36  = '';
    if(secondLoanVal === 'secondLoan' && loanCheck2){
      this.tabindex29 = "29";
      this.tabindex30 = "-1";
      this.tabindex31 = "31";
      if(this.nsfSecond==="0.00"){
      this.tabindex32 = "-1";
      }else{
        this.tabindex32 = "32";
      }
      if(this.lateFee2==="0.00"){
        this.tabindex33 = "-1";
        }else{
          this.tabindex33 = "33";
        }
      this.tabindex34 = "34";
      this.tabindex35 = "35";
      this.tabindex36 = "36";

    }else{
    this.tabindex29 = "-1";
    this.tabindex30 = "-1";
    this.tabindex31 = "-1";
    this.tabindex32 = "-1";
    this.tabindex33 = "-1";
    this.tabindex34 = "-1";
    this.tabindex35 = "-1";
    this.tabindex36 = "-1";
    }
 }

 isOtherPaymentAmount2(inputVal){
  console.log("checked :::::: "+inputVal);
   this.secondLoanFeesArray = [];

  if(inputVal){
    // this.tabindex29 = "29";
    this.tabindex30 = "30";
    this.tabindex31 = "-1";
    this.tabindex32 = "-1";
    this.tabindex33 = "-1";
    this.tabindex34 = "-1";
    this.tabindex35 = "35";
    this.tabindex36 = "36";
  }else{
    console.log("checked :::::: "+inputVal);
    this.tabindex30 = "-1";
    this.tabindex31 = "31";
    if(this.nsfSecond==="0.00"){
      this.tabindex32 = "-1";
      }else{
        this.tabindex32 = "32";
      }
      if(this.lateFee2==="0.00"){
        this.tabindex33 = "-1";
        }else{
          this.tabindex33 = "33";
        }
      this.tabindex34 = "34";
      this.tabindex35 = "35";
      this.tabindex36 = "36";
  }
}

  getValue(inputVal,amtName, isLoanInfoFirstChecked,index) {

  if(inputVal==='' && amtName ==='otherPayment1'){
    this.isOtherPayment = true;
  }else{
    this.isOtherPayment = false;
  }

  if(inputVal==='' && amtName ==='otherPayment2'){
    this.isOtherPayment1 = true;
  }else{
    this.isOtherPayment1 = false;
  }

    this.additionalPrin1=false;
    this.additionalPrin2=false;
    this.additionalEsc1=false;
    this.nsfst=false;
    this.nsfnd=false;
    this.lateFe1=false;
    this.lateFe2=false;
    this.otherPmt1=false;
    this.otherPmt2=false;
    this.otherfee=false;
    this.corporatefee=false;
    this.otherfee1=false;
    this.corporatefee1=false;
    this.messagetdg='';
    this.isLoanFirstChecked = isLoanInfoFirstChecked;

    if(amtName==="additionalPrincipal1" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.additionalPrin1=true;
      this.messagetdg = "Please enter two digit decimal places.";
    }else{
      this.additionalPrin1=false;
    }
    if(amtName==="additionalPrincipal2" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.additionalPrin2=true;
      this.messagetdg = "Please enter two digit decimal places.";
    }else{
      this.additionalPrin2=false;
    }
  if(amtName==="additionalEscrow1" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.additionalEsc1=true;
      this.messagetdg = "Please enter two digit decimal places.";
    }else{
      this.additionalEsc1=false;
    }
    if(amtName==="nsfFirst" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.nsfst=true;
      this.messagetdg = "Please enter two digit decimal places.";
    }else{
      this.nsfst=false;
    }
    if(amtName==="nsfSecond" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.nsfnd=true;
      this.messagetdg = "Please enter two digit decimal places.";
    }else{
      this.nsfnd=false;
    }
    if(amtName==="lateFee1" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.lateFe1=true;
      this.messagetdg = "Please enter two digit decimal places.";
    }else{
      this.lateFe1=false;
    }
    if(amtName==="lateFee2" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.lateFe2=true;
      this.messagetdg = "Please enter two digit decimal places.";
    }else{
      this.lateFe2=false;
    }
    if(amtName==="otherPayment1" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.otherPmt1=true;
      this.messagetdg = "Please enter two digit decimal places.";
    }else{
      this.otherPmt1=false;
    }
    if(amtName==="otherPayment2" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.otherPmt2=true;
      this.messagetdg = "Please enter two digit decimal places.";
    }else{
      this.otherPmt2=false;
    }
   // this.otherfee=false;
   // this.corporatefee=false;
    if(amtName==="Other Fee" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.otherfee=true;
      this.messagetdg = "Please enter two digit decimal places.";
      this.inputIndex = index;
    }else{
      this.inputIndex = index;
      this.otherfee=false;
    }
    if(amtName==="Corporate Advance" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.corporatefee=true;
      this.messagetdg = "Please enter two digit decimal places.";
      this.inputIndex = index;
    }else{
      this.corporatefee=false;
      this.inputIndex = index;
    }

    if(amtName==="Other Fee1" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.otherfee1=true;
      this.messagetdg = "Please enter two digit decimal places.";
      this.inputIndex1 = index;
    }else{
      this.inputIndex1 = index;
      this.otherfee1=false;
    }
    if(amtName==="Corporate Advance1" && String(inputVal).match(/^\d\d\d\d$/g)!=null){
      this.corporatefee1=true;
      this.messagetdg = "Please enter two digit decimal places.";
      this.inputIndex1 = index;
    }else{
      this.corporatefee1=false;
      this.inputIndex1 = index;
    }
  }
  validateEmail(inputEmail,emailName){
    this.email = false;
    this.email1 =false;
    this.email2 = false;
    this.emailValidateMsg = '';

    if(emailName==="brwemail" && inputEmail){
      if(String(inputEmail).match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)!=null){
          this.email=false;
          this.emailValidateMsg ='';
        }else{
          this.email=true;
          this.emailValidateMsg = "Please enter a valid email"

        }
    }else{}


    if(emailName==="emailOne" && inputEmail){
      if(String(inputEmail).match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)!=null){
          this.email1=false;
          this.emailValidateMsg ='';
        }else{
          this.email1=true;
          this.emailValidateMsg = "Please enter a valid email"

        }
    }else{}

    if(emailName==="emailTwo" && inputEmail){
      if(String(inputEmail).match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)!=null){
          this.email2=false;
          this.emailValidateMsg ='';
        }else{
          this.email2=true;
          this.emailValidateMsg = "Please enter a valid email"

        }
    }else{}

  }

  phonepayPayment = new PhonepayPayments();
  bankingInfo = new BankingInfo();
  invalidRouting: boolean;
  isVerifyBankingInfo: boolean;
  isSuccessful: boolean;
  message: string;
  loanNumber: number;
  routingNum: string;
  accountNum: string;
  bankName: string;
  submitted: boolean;
  mapForFirstLoanFees: Map<string, any>;
  mapForSecondLoanFees: Map<string, any>;
  firstLoanFeesArray = [];
  deleteLoanFeesArray = [];
  deleteLoanFeesArraySecond = [];
  secondLoanFeesArray = [];
  defaultFee: string;
  defaultFee1: string;
  readOnlyPaymentModeForLoan1 = false;
  readOnlyPaymentModeForLoan2 = false;
  borrowerName: string;
  borrowerAddr: string;
  borrowerCity: string;
  borrowerState: string;
  borrowerZip: string;
  borrowerPhone: string;
  borrowerEmail: string;

  bankCity: string;
  feeSummary: PhonePayFeeDto[];

  loanNumbers: number[] = new Array;
  emailList: string[] = new Array;
  phonpayForm: FormGroup;
  otherFeeList: FormArray;
  otherFeeList1: FormArray;
  borrowerInfo: boolean;
  isStopFileForFirstLoan: boolean;
  isStopFileForSecondLoan: boolean;
  loanInfoFirst = new LoanInfoDto();
  loanInfoSecond = new LoanInfoDto();
  checkStopFileExistanceRes = new CheckStopFileExistanceResponse();
  cancelPaymentRes = new CancelPaymentResponse();
  sumOfAmount: any;
  phonePayServicefee: any;
  isLoanInfoFirstChecked: boolean;
  isLoanInfoSecondChecked: boolean;
  nsfFirst: any;
  nsfSecond: any;
  regPayment1: any;
  regPayment2: any;
  additionalEscrow1: any;
  additionalPrincipal1: any;
  additionalPrincipal2: any;
  lateFee1: any;
  lateFee2: any;
  isPay: boolean;
  today = formatDate(new Date().toLocaleString(), 'MM/dd/yyyy', 'en');
  dateNow : Date = new Date();
  updateFeeForFirstLoan = false;
  updateFeeForSecondLoan = false;
  isWaveOffChecked: boolean;
  listOfFeesSelectedforFirstLoan: PhonePayFeeDto[] = [];
  listOfFeesSelectedforSecondLoan: PhonePayFeeDto[] = [];
  feeValues: PhonePayFeeDto[] = [];
  feeValueObj: PhonePayFeeDto;
  isFeeSelected: boolean;

  feeListForFirstLoan: OtherFeeDto[] = [];
  feeListForSecondLoan: OtherFeeDto[] = [];
  otherFeeObj = new OtherFeeDto();

  phonepayCheckRequest = new PhonepayCheckPaymemtRequest();
  scheduledPayment = null;
  phonepayCheckPaymentResponse: PhonepayCheckPaymentResponse;

  dialogObj = new DialogObj();
  schedulePaymentFailureMessage: boolean;
  progressBar: boolean;
  paymentAdviceValue: string;
  paymentAdviceValue1: string;
  isEmailSelceted = true;
  isPrintConfirmation = false;
  isAdviceTypeClicked: boolean;
  isAdviceTypeClicked1: boolean;
  userDetails: any;
  feeAmount: any;
  feeAmount1: any;
  isUserNotAdmin: boolean;
  isDisabledState: boolean;
  isOtherFeesSelected: boolean;
  isOtherFeesSelected1: boolean;
  paymentIdList: string[] = new Array;
  requireOneCheckboxToBeChecked: boolean;
  firstDigitOfLoanNumber = 0;
  payorType: string;
  isEmailSelceted1 = true;
  isBankInfoEmpty : boolean;
  focuMe=false;
  enteredBy : string;
  confNum1 : string;
  confNum2 : string;
  isCancelPayment:boolean;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private appComp: AppComponent, private phonepayPaymentsService: PhonepayPaymentsService,
    private schedulePhonePayPaymentService: SchedulePhonePayPaymentsService, private cdr: ChangeDetectorRef,
    private cancelPaymentService: CancelPaymentService,
    private chekStopFileExistanceService: ChekStopFileExistanceService) {
  }
  sub: any;
  isRequestFromPaymentScreen: string;
  ngOnInit() {
    this.phonpayForm = this.formBuilder.group({
      feeValue: new FormControl(),
      feeValue1: new FormControl(),
      payorName: new FormControl('', [Validators.required]),
      payorAddress: new FormControl('', [Validators.required]),
      payorCity: new FormControl('', [Validators.required]),
      payorState: new FormControl('', [Validators.required , Validators.maxLength(2)]),
      payorZip: new FormControl(''),
      enteredBy: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(4)]),
      routingNumber: ['', [Validators.required, Validators.minLength(9)]],
      accountType: new FormControl('Checking'),
      monthlyPayment1: new FormControl(),
      checkBoxValue: new FormControl(),
      checkBoxValue2: new FormControl(),
      monthlyPayment2: new FormControl(),
      otherPayment1: new FormControl(),
      otherPayment2: new FormControl(),
      addAmount1: new FormControl(),
      addAmount2: new FormControl(),
      addEscrow1: new FormControl(),
      nsf1: new FormControl(),
      nsf2: new FormControl(),
      latecharge1: new FormControl(),
      latecharge2: new FormControl(),
      confNumber1: new FormControl(),
      confNumber2: new FormControl(),
      date: new FormControl(),
      serviceFee: new FormControl(),
      paymentAdviceNote: new FormControl(),
      paymentAdviceNote1: new FormControl(),
      totalAmount: new FormControl(),
      myCheckboxGroup: new FormGroup({
        email: new FormControl(''),
        email1: new FormControl(''),
        email2: new FormControl(''),
        emailCheckbox: new FormControl(false),
        emailCheckbox1: new FormControl(false),
        emailCheckbox2: new FormControl(false),
        printCheckbox3: new FormControl(false),
      }, requireCheckboxesToBeCheckedValidator(1)),
      otherFeeList: this.formBuilder.array([]),
      otherFeeList1: this.formBuilder.array([])
    });

    this.firstLoanFeesArray = [];
    this.secondLoanFeesArray = [];
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    this.sub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.isRequestFromPaymentScreen = params['isRequestFromPaymentScreen'];
      });

    this.phonepayPayment = JSON.parse(localStorage.getItem('phonepayInfo'));
    console.log("Info", this.phonepayPayment);
    if (this.phonepayPayment.loanInfoList.length) {
      this.phonepayPayment.loanInfoList.forEach((data, index) =>
        this.loanNumbers.push(this.phonepayPayment.loanInfoList[index].loanNumber)
      )
    } else {
      this.closeForm('','','','');
      this.appComp.showErrorMessage("The loan is not available to schedule payment", null, true);
      return;
    }

    if (this.phonepayPayment.borrowerEmail != null) {
      this.emailList.push(this.phonepayPayment.borrowerEmail);
      this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').setValue(true);
      console.log('Email List initial = ', this.emailList);
    }
    this.feeSummary = this.phonepayPayment.phonePayFeeList.filter(fees => fees.feeName !== 'PhonePay Fee');
    this.phonePayServicefee = 10;
    this.phonePayServicefee = parseFloat(this.phonePayServicefee).toFixed(2);
    console.log('this.phonpayForm **************',this.phonpayForm);

    if (this.phonepayPayment.isPaymentScheduled) {
      this.appComp.showProgressBar(true);
      this.schduledPaymentEx = true;
      this.showSchedulePaymentErrorMessage(this.phonepayPayment.message, null, false);
      if (this.phonepayPayment.schedulePaymentList.length) {
        this.enteredBy = this.phonepayPayment.schedulePaymentList[0].enteredBy;
        this.routingNum = this.phonepayPayment.schedulePaymentList[0].routingNumber;
        this.accountNum = this.phonepayPayment.schedulePaymentList[0].accountNumber;
        this.confNum1 = this.phonepayPayment.schedulePaymentList[0].confNum;
        if (this.phonepayPayment.schedulePaymentList[0].accountType === 'S') {
          this.phonpayForm.get('accountType').setValue('Saving');
          this.isSaving = true;
        } else {
          this.phonpayForm.get('accountType').setValue('Checking');
          this.isSaving = false;
        }

        this.isVerifyBankingInfo = true;
        this.borrowerInfo = true;
        this.phonepayPaymentsService.bankingInfo(this.phonepayPayment.schedulePaymentList[0].routingNumber).subscribe(
          bankingInfo => {
            this.bankingInfo = bankingInfo;
            this.bankCity = this.bankingInfo.bankingInfo.bankCity + ', ' + this.bankingInfo.bankingInfo.bankCountry + '  ' + this.bankingInfo.bankingInfo.bankZip

          }
        );
      }

      if (this.phonepayPayment.schedulePaymentList[0].emails) {
        var emails = this.phonepayPayment.schedulePaymentList[0].emails;
        emails = emails.replace(/;\s*$/, "");
        this.emailList = emails.split(';');
        console.log("this.emailList  ****************** : "+this.emailList );
        if (this.emailList.length === 1) {
          this.phonepayPayment.borrowerEmail = this.emailList[0];
          this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').setValue(true);
        } else if (this.emailList.length > 1) {
          this.phonepayPayment.borrowerEmail = this.emailList[0];
          this.phonepayPayment.coBorrowerEmail = this.emailList[1];
          this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').setValue(true);
          this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox1').setValue(true);
          if (this.emailList.length === 3 && this.emailList[2] != '') {
            this.phonpayForm.controls.myCheckboxGroup.get('email2').setValue(this.emailList[2]);
            this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox2').setValue(true);
          }
        }
      }

      this.showPaymentBorrowerInfo(this.phonepayPayment.schedulePaymentList[0].payorType);
      this.cdr.detectChanges();
      if (this.phonepayPayment.schedulePaymentList.length === 1) {

        this.phonepayPayment.schedulePaymentList.forEach(schedulePayment => {
          this.firstDigitOfLoanNumber = parseInt(schedulePayment.loanNumber.toString().substring(0, 1));
          if (this.firstDigitOfLoanNumber === 9) {
            this.chekStopFileExistanceService.isLoanAccountInStopFile(schedulePayment.loanNumber).subscribe(
              checkStopFileExistanceRes => {
                this.checkStopFileExistanceRes = checkStopFileExistanceRes;
                if (this.checkStopFileExistanceRes.isStopFile) {
                  this.isStopFileForSecondLoan = true;
                }
              })
              if(this.phonepayPayment.schedulePaymentList[0].printConfirmation){
                this.phonpayForm.controls.myCheckboxGroup.get('printCheckbox3').setValue(this.phonepayPayment.schedulePaymentList[0].printConfirmation);
              }
            this.readOnlyPaymentModeForLoan2 = true;
            if (this.phonepayPayment.schedulePaymentList[0].paymentAdvice) {
              this.isAdviceTypeClicked1 = true;
              this.phonpayForm.get('paymentAdviceNote1').setValidators([Validators.required]);
              switch (this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceId) {
                case 1: {
                  this.paymentAdviceValue1 = 'Cashiering';
                  this.phonpayForm.get('paymentAdviceNote1').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
                  break;
                }
                case 2: {
                  this.paymentAdviceValue1 = 'Bankruptcy';
                  this.phonpayForm.get('paymentAdviceNote1').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
                  break;
                }
                case 3: {
                  this.paymentAdviceValue1 = 'Collections';
                  this.phonpayForm.get('paymentAdviceNote1').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
                  break;
                }
                case 4: {
                  this.paymentAdviceValue1 = 'Loss Mit';
                  this.phonpayForm.get('paymentAdviceNote1').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
                  break;
                }
                default: {
                  //statements;
                  break;
                }
              }
            }
            this.isLoanInfoSecondChecked = true;
            this.loanInfoSecond = this.phonepayPayment.loanInfoList[1];
            this.phonepayPayment.schedulePaymentList[0].otherFeeList.forEach(fee => {
              if (fee.feeName === 'Monthly Payment') {
                this.regPayment2 = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              } else if (fee.feeName === 'Additional Principal') {
                this.additionalPrincipal2 = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              } else if (fee.feeName === 'Late Fee') {
                this.lateFee2 = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              } else if (fee.feeName === 'NSF Fee') {
                this.nsfSecond = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              } else if (fee.feeName === 'PhonePay Fee') {
                if (fee.feeAmount === 0) {
                  this.isWaveOffChecked = true;
                }
                this.phonePayServicefee = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              }
            });
            this.loanInfoSecond.confirmationNumber = this.phonepayPayment.schedulePaymentList[0].confNum;
            if (this.phonepayPayment.schedulePaymentList[0].otherFeeList.length) {
              this.setOtherFeesForSecondLoan();
            }
            this.getTotalAmount();
            this.scheduledPayment = new ScheduledCheckPaymentRequest();
            this.scheduledPayment.paymentId = this.phonepayPayment.schedulePaymentList[0].paymentId;
            this.scheduledPayment.loanNumber = this.loanInfoSecond.loanNumber;
            this.scheduledPayment.confirmationNumber = this.loanInfoSecond.confirmationNumber.replace(/-/g, '').trim();
            this.phonepayCheckRequest.scheduledPayments.push(this.scheduledPayment);
          } else {
            this.chekStopFileExistanceService.isLoanAccountInStopFile(schedulePayment.loanNumber).subscribe(
              checkStopFileExistanceRes => {
                this.checkStopFileExistanceRes = checkStopFileExistanceRes;
                if (this.checkStopFileExistanceRes.isStopFile) {
                  this.isStopFileForFirstLoan = true;
                }
              })
              if(this.phonepayPayment.schedulePaymentList[0].printConfirmation){
                this.phonpayForm.controls.myCheckboxGroup.get('printCheckbox3').setValue(this.phonepayPayment.schedulePaymentList[0].printConfirmation);
              }
            this.readOnlyPaymentModeForLoan1 = true;
            if (this.phonepayPayment.schedulePaymentList[0].paymentAdvice) {
              this.isAdviceTypeClicked = true;
              this.phonpayForm.get('paymentAdviceNote').setValidators([Validators.required]);
              switch (this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceId) {
                case 1: {
                  this.paymentAdviceValue = 'Cashiering';
                  this.phonpayForm.get('paymentAdviceNote').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
                  break;
                }
                case 2: {
                  this.paymentAdviceValue = 'Bankruptcy';
                  this.phonpayForm.get('paymentAdviceNote').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
                  break;
                }
                case 3: {
                  this.paymentAdviceValue = 'Collections';
                  this.phonpayForm.get('paymentAdviceNote').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
                  break;
                }
                case 4: {
                  this.paymentAdviceValue = 'Loss Mit';
                  this.phonpayForm.get('paymentAdviceNote').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
                  break;
                }
                default: {
                  break;
                }
              }
            }
            this.isLoanInfoFirstChecked = true;
            this.loanInfoFirst = this.phonepayPayment.loanInfoList[0];

            this.phonepayPayment.schedulePaymentList[0].otherFeeList.forEach(fee => {
              if (fee.feeName === 'Monthly Payment') {
                this.regPayment1 = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              } else if (fee.feeName === 'Additional Principal') {
                this.additionalPrincipal1 = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              } else if (fee.feeName === 'Late Fee') {
                this.lateFee1 = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              } else if (fee.feeName === 'NSF Fee') {
                this.nsfFirst = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              } else if (fee.feeName === 'Additional Escrow') {
                this.additionalEscrow1 = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              } else if (fee.feeName === 'PhonePay Fee') {
                if (fee.feeAmount === 0) {
                  this.isWaveOffChecked = true;
                }
                this.phonePayServicefee = parseFloat(fee.feeAmount.toString()).toFixed(2);
                this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
              }
            });
            this.loanInfoFirst.confirmationNumber = this.phonepayPayment.schedulePaymentList[0].confNum;
            if (this.phonepayPayment.schedulePaymentList[0].otherFeeList && this.phonepayPayment.schedulePaymentList[0].otherFeeList.length) {
              this.setOtherFeesForFirstLoan();
            }
            this.getTotalAmount();
            this.scheduledPayment = new ScheduledCheckPaymentRequest();
            this.scheduledPayment.paymentId = this.phonepayPayment.schedulePaymentList[0].paymentId;
            this.scheduledPayment.loanNumber = this.loanInfoFirst.loanNumber;
            this.scheduledPayment.confirmationNumber = this.loanInfoFirst.confirmationNumber.replace(/-/g, '').trim();
            this.phonepayCheckRequest.scheduledPayments.push(this.scheduledPayment);
          }
        })
        this.today = this.phonepayPayment.schedulePaymentList[0].scheduledDate;
      } else if (this.phonepayPayment.schedulePaymentList.length > 1) {

        this.chekStopFileExistanceService.isLoanAccountInStopFile(this.phonepayPayment.schedulePaymentList[0].loanNumber).subscribe(
          checkStopFileExistanceRes => {
            this.checkStopFileExistanceRes = checkStopFileExistanceRes;
            if (this.checkStopFileExistanceRes.isStopFile) {
              this.isStopFileForFirstLoan = true;
            }
          });
          this.readOnlyPaymentModeForLoan1 = true;
          this.readOnlyPaymentModeForLoan2 = true;
          if(this.phonepayPayment.schedulePaymentList[0].printConfirmation){
            this.phonpayForm.controls.myCheckboxGroup.get('printCheckbox3').setValue(this.phonepayPayment.schedulePaymentList[0].printConfirmation);
          }
          this.chekStopFileExistanceService.isLoanAccountInStopFile(this.phonepayPayment.schedulePaymentList[1].loanNumber).subscribe(
            checkStopFileExistanceRes => {
              this.checkStopFileExistanceRes = new CheckStopFileExistanceResponse();
              this.checkStopFileExistanceRes = checkStopFileExistanceRes;
              if (this.checkStopFileExistanceRes.isStopFile) {
                this.isStopFileForSecondLoan = true;
              }
            })

        if (this.phonepayPayment.schedulePaymentList[0].paymentAdvice) {
          this.isAdviceTypeClicked = true;
          this.phonpayForm.get('paymentAdviceNote').setValidators([Validators.required]);
          switch (this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceId) {
            case 1: {
              this.paymentAdviceValue = 'Cashiering';
              this.phonpayForm.get('paymentAdviceNote').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            case 2: {
              this.paymentAdviceValue = 'Bankruptcy';
              this.phonpayForm.get('paymentAdviceNote').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            case 3: {
              this.paymentAdviceValue = 'Collections';
              this.phonpayForm.get('paymentAdviceNote').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            case 4: {
              this.paymentAdviceValue = 'Loss Mit';
              this.phonpayForm.get('paymentAdviceNote').setValue(this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            default: {
              break;
            }
          }
        }

        if (this.phonepayPayment.schedulePaymentList[1].paymentAdvice) {
          this.isAdviceTypeClicked1 = true;
          this.phonpayForm.get('paymentAdviceNote1').setValidators([Validators.required]);
          switch (this.phonepayPayment.schedulePaymentList[1].paymentAdvice.adviceId) {
            case 1: {
              this.paymentAdviceValue1 = 'Cashiering';
              this.phonpayForm.get('paymentAdviceNote1').setValue(this.phonepayPayment.schedulePaymentList[1].paymentAdvice.adviceNotes);
              break;
            }
            case 2: {
              this.paymentAdviceValue1 = 'Bankruptcy';
              this.phonpayForm.get('paymentAdviceNote1').setValue(this.phonepayPayment.schedulePaymentList[1].paymentAdvice.adviceNotes);
              break;
            }
            case 3: {
              this.paymentAdviceValue1 = 'Collections';
              this.phonpayForm.get('paymentAdviceNote1').setValue(this.phonepayPayment.schedulePaymentList[1].paymentAdvice.adviceNotes);
              break;
            }
            case 4: {
              this.paymentAdviceValue1 = 'Loss Mit';
              this.phonpayForm.get('paymentAdviceNote1').setValue(this.phonepayPayment.schedulePaymentList[1].paymentAdvice.adviceNotes);
              break;
            }
            default: {
              break;
            }
          }
        }
        this.isLoanInfoFirstChecked = true;
        this.phonpayForm.get('paymentAdviceNote').setValidators([Validators.required]);
        this.isLoanInfoSecondChecked = true;
        this.loanInfoFirst = this.phonepayPayment.loanInfoList[0];

        this.phonepayPayment.schedulePaymentList[0].otherFeeList.forEach(fee => {
          if (fee.feeName === 'Monthly Payment') {
            this.regPayment1 = parseFloat(fee.feeAmount.toString()).toFixed(2);
            this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
          } else if (fee.feeName === 'Additional Principal') {
            this.additionalPrincipal1 = parseFloat(fee.feeAmount.toString()).toFixed(2);
            this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
          } else if (fee.feeName === 'Late Fee') {
            this.lateFee1 = parseFloat(fee.feeAmount.toString()).toFixed(2);
            this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
          } else if (fee.feeName === 'NSF Fee') {
            this.nsfFirst = parseFloat(fee.feeAmount.toString()).toFixed(2);
            this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
          } else if (fee.feeName === 'Additional Escrow') {
            this.additionalEscrow1 = parseFloat(fee.feeAmount.toString()).toFixed(2);
            this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
          } else if (fee.feeName === 'PhonePay Fee') {
            if (fee.feeAmount === 0) {
              this.isWaveOffChecked = true;
            }
            this.phonePayServicefee = parseFloat(fee.feeAmount.toString()).toFixed(2);
            this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
          }
        });

        this.loanInfoFirst.confirmationNumber = this.phonepayPayment.schedulePaymentList[0].confNum;
        if (this.phonepayPayment.schedulePaymentList[0].otherFeeList.length) {
          this.setOtherFeesForFirstLoan();
        }
        this.scheduledPayment = new ScheduledCheckPaymentRequest();
        this.scheduledPayment.paymentId = this.phonepayPayment.schedulePaymentList[0].paymentId;
        this.scheduledPayment.loanNumber = this.loanInfoFirst.loanNumber;
        this.scheduledPayment.confirmationNumber = this.loanInfoFirst.confirmationNumber.replace(/-/g, '').trim();
        this.phonepayCheckRequest.scheduledPayments.push(this.scheduledPayment);
        this.loanInfoSecond = this.phonepayPayment.loanInfoList[1];
        this.confNum2 = this.phonepayPayment.schedulePaymentList[1].confNum;

        this.phonepayPayment.schedulePaymentList[1].otherFeeList.forEach(fee => {
          if (fee.feeName === 'Monthly Payment') {
            this.regPayment2 = parseFloat(fee.feeAmount.toString()).toFixed(2);
            this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
          } else if (fee.feeName === 'Additional Principal') {
            this.additionalPrincipal2 = parseFloat(fee.feeAmount.toString()).toFixed(2);
            this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
          } else if (fee.feeName === 'Late Fee') {
            this.lateFee2 = parseFloat(fee.feeAmount.toString()).toFixed(2);
            this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
          } else if (fee.feeName === 'NSF Fee') {
            this.nsfSecond = parseFloat(fee.feeAmount.toString()).toFixed(2);
            this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
          }
        });
        this.loanInfoSecond.confirmationNumber = this.phonepayPayment.schedulePaymentList[1].confNum;
        if (this.phonepayPayment.schedulePaymentList[1].otherFeeList.length) {
          this.setOtherFeesForSecondLoan();
        }
        this.getTotalAmount();
        this.scheduledPayment = new ScheduledCheckPaymentRequest();
        this.scheduledPayment.paymentId = this.phonepayPayment.schedulePaymentList[1].paymentId;
        this.scheduledPayment.loanNumber = this.loanInfoSecond.loanNumber;
        this.scheduledPayment.confirmationNumber = this.loanInfoSecond.confirmationNumber.replace(/-/g, '').trim();
        this.phonepayCheckRequest.scheduledPayments.push(this.scheduledPayment);
        this.today = this.phonepayPayment.schedulePaymentList[0].scheduledDate;
      }
    }else{
      this.showBorrowerInfo('borrower');
    }
    this.checkBankingInfoFields();
    this.checkBankingInfoFieldsWithMountainAmerica('');

      // this.payorType = 'Borrower'
      // this.borrowerName = this.phonepayPayment.schedulePaymentList[0].payorName;
      // this.borrowerAddr = this.phonepayPayment.schedulePaymentList[0].payorAddress;
      // if(this.borrowerAddr!=null){
      //   this.borrowerAddr.toUpperCase();
      // }
      // this.borrowerCity = this.phonepayPayment.schedulePaymentList[0].payorCity;
      // this.borrowerState = this.phonepayPayment.schedulePaymentList[0].payorState;
      // this.borrowerZip = this.phonepayPayment.schedulePaymentList[0].payorZip;
      // this.borrowerPhone = this.phonepayPayment.schedulePaymentList[0].payorPhone.replace(/([0-9]{1,3})([0-9]{3})([0-9]{4}$)/gi, "$1-$2-$3");
      this.isCancelPayment = false;
  }

  setOtherFeesForFirstLoan() {
    let control = <FormArray>this.phonpayForm.controls.otherFeeList;
    this.phonepayPayment.schedulePaymentList[0].otherFeeList.forEach(fee => {
      if (fee.feeName !== 'PhonePay Fee' && fee.feeName !== 'Monthly Payment' && fee.feeName !== 'Late Fee' && fee.feeName !== 'NSF Fee'
        && fee.feeName !== 'Additional Principal' && fee.feeName !== 'Additional Escrow') {
        control.push(this.formBuilder.group({
          id: new FormControl(fee.id),
          feeId: new FormControl(fee.feeCode),
          feeName: new FormControl(fee.feeName),
          feeAmount: new FormControl(fee.feeAmount)
        }));
        this.cdr.detectChanges();
        this.updateFeeForFirstLoan = true;
        this.firstLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
      }
    })
    if (control.length) {
      this.isOtherFeesSelected = true;
    }

  }

  setOtherFeesForSecondLoan() {
    let control = <FormArray>this.phonpayForm.controls.otherFeeList1;
    if (this.phonepayPayment.schedulePaymentList.length > 1) {
      this.phonepayPayment.schedulePaymentList[1].otherFeeList.forEach(fee => {
        if (fee.feeName !== 'PhonePay Fee' && fee.feeName !== 'Monthly Payment' && fee.feeName !== 'Late Fee' && fee.feeName !== 'NSF Fee'
          && fee.feeName !== 'Additional Principal') {
          control.push(this.formBuilder.group({
            id: new FormControl(fee.id),
            feeId: new FormControl(fee.feeCode),
            feeName: new FormControl(fee.feeName),
            feeAmount1: new FormControl(fee.feeAmount)
          }));
          this.cdr.detectChanges();
          this.updateFeeForSecondLoan = true;
          this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
        }
      });
    } else if (this.phonepayPayment.schedulePaymentList.length === 1) {
      this.phonepayPayment.schedulePaymentList[0].otherFeeList.forEach(fee => {
        if (fee.feeName !== 'PhonePay Fee' && fee.feeName !== 'Monthly Payment' && fee.feeName !== 'Late Fee' && fee.feeName !== 'NSF Fee'
          && fee.feeName !== 'Additional Principal') {
          control.push(this.formBuilder.group({
            id: new FormControl(fee.id),
            feeId: new FormControl(fee.feeCode),
            feeName: new FormControl(fee.feeName),
            feeAmount1: new FormControl(fee.feeAmount)
          }));
          this.cdr.detectChanges();
          this.updateFeeForSecondLoan = true;
          this.secondLoanFeesArray.push({ id: fee.id, feeCode: fee.feeCode, feeAmount: fee.feeAmount })
        }
      });
    }


    if (control.length) {
      this.isOtherFeesSelected1 = true;
    }
  }

  getEmail(e, email: string, emailType: string) {

    //alert(e.target.checked+" : "+email+" : "+emailType);

    if(e.target.checked && this.phonpayForm.controls.myCheckboxGroup.get('email').value ==="" && emailType=="email"){
      this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').setValue(false);
    }
    if(e.target.checked && this.phonpayForm.controls.myCheckboxGroup.get('email1').value==="" && emailType=="email1"){
      this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox1').setValue(false);
    }
    if(e.target.checked && this.phonpayForm.controls.myCheckboxGroup.get('email2').value==="" && emailType=="email2"){
      this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox2').setValue(false);
    }

    if(!e.target.checked && this.phonpayForm.controls.myCheckboxGroup.get('email').value !=="" && emailType=="email"){
      this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').setValue(false);
    }
    if(!e.target.checked && this.phonpayForm.controls.myCheckboxGroup.get('email1').value!=="" && emailType=="email1"){
      this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox1').setValue(false);
    }
    if(!e.target.checked && this.phonpayForm.controls.myCheckboxGroup.get('email2').value!=="" && emailType=="email2"){
      this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox2').setValue(false);
    }
    if((this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').value && this.phonpayForm.controls.myCheckboxGroup.get('email').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox1').value && this.phonpayForm.controls.myCheckboxGroup.get('email1').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox2').value && this.phonpayForm.controls.myCheckboxGroup.get('email2').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('printCheckbox3').value))
    {
    this.isValidateEmailPrint=false;
    }else{
      this.isValidateEmailPrint=true;
    }
/*
    console.log('this.phonpayForm **************',this.phonpayForm);
    console.log('email list', this.emailList);
    this.isEmailSelceted = e.target.checked;
    console.log("e.target : " + e.target.id);
    console.log("e.target.checked : **** "+e.target.checked);
    console.log("emailGroup:"+ email);
    console.log("Selected Emails: " + this.isEmailSelceted);
    if(email===null || email===""){
      console.log('email list ****', this.phonpayForm['controls'].myCheckboxGroup['controls']);

      e.target.checked = false;
      console.log("e.target.checked : **** "+e.target.checked);
    }

  //  e.target.checked = false;
    if (email != '' && this.isEmailSelceted && email !=null) {
      this.borrowerEmail = email;
      this.emailList.push(this.borrowerEmail);
      this.emailList.indexOf(this.borrowerEmail);
      console.log("Array length: " + this.emailList.length);
      console.log("Element Index: " + this.emailList.indexOf(this.borrowerEmail));
    } else if (email != '' && email !=null && !this.isEmailSelceted) {
      this.emailList.splice(this.emailList.indexOf(email), 1);
    }
    console.log('email list ****', this.phonpayForm['controls'].myCheckboxGroup['controls']);
    console.log("Email List: " + this.emailList);
    console.log("Email List: " + this.emailList);
*/
    console.log('email list ****', this.phonpayForm['controls'].myCheckboxGroup['controls']);
    console.log(e.target);
    if (e.target.checked) {
      if(e.target.id == "email" || e.target.id == "emailCheckbox"){
        if(this.emailList[0] != email){
          this.emailList.unshift(email);
          this.emailList.splice(1, 1);
        }
      }else if(e.target.id == "email1" || e.target.id == "emailCheckbox1"){
        this.emailList[1] = email
      }if(e.target.id == "email2" || e.target.id == "emailCheckbox2"){
        this.emailList[2] = email
      }

    } else {
      let i: number = 0;
      this.emailList.forEach((recipient) => {
        if (recipient == email) {
          this.emailList.splice(i, 1);
          return;
        }
        i++;
      });
    }
    console.log("Email List: " + this.emailList);

  }

  sendPaymentConfirmationLetter(e) {
  if(e.target.checked){
  this.isValidateEmailPrint=false;
  }else{
    if((this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').value && this.phonpayForm.controls.myCheckboxGroup.get('email').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox1').value && this.phonpayForm.controls.myCheckboxGroup.get('email1').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox2').value && this.phonpayForm.controls.myCheckboxGroup.get('email2').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('printCheckbox3').value))
    {
    this.isValidateEmailPrint=false;
    }else{
      this.isValidateEmailPrint=true;
    }
  }
    this.isPrintConfirmation = e.target.checked;

  }

  verifyBankingInfo(routingNum: string) {
    this.isVerifyBankingInfo = true;
    if (routingNum.length === 9) {
      this.routingNum = routingNum;
      if(routingNum === '324079555'){
        this.isRoutingNumMountainAmerica = true;
      }else{
        this.isRoutingNumMountainAmerica = false;
      }
      this.appComp.showProgressBar(true);
      this.phonepayPaymentsService.bankingInfo(this.routingNum).subscribe(
        bankingInfo => {
          this.bankingInfo = bankingInfo;
          if (this.bankingInfo.isSuccessful) {
            this.bankCity = this.bankingInfo.bankingInfo.bankCity + ', ' + this.bankingInfo.bankingInfo.bankCountry + ' ' + this.bankingInfo.bankingInfo.bankZip
            this.appComp.showProgressBar(false);
          } else {
            this.phonpayForm.get('routingNumber').setValue('');
            this.appComp.showErrorMessage(this.bankingInfo.message, null, true);
          }
        });
      this.checkBankingInfoFields();
      this.checkBankingInfoFieldsWithMountainAmerica('');
    } else {
      this.invalidRouting = true;
    }
  }

  showBorrowerInfo(borrower: string) {
    if (borrower === 'borrower') {
      this.payorType = 'Borrower'
      this.borrowerName = this.phonepayPayment.borrowerName + ' ' + this.phonepayPayment.borrowerLastName;
      this.borrowerAddr = this.phonepayPayment.propertyInfo.address;
      if(this.borrowerAddr!=null){
        this.borrowerAddr.toUpperCase();
      }
      this.borrowerCity = this.phonepayPayment.propertyInfo.city;
      this.borrowerState = this.phonepayPayment.propertyInfo.state;
      this.borrowerZip = this.phonepayPayment.propertyInfo.zip;
      this.borrowerPhone = this.phonepayPayment.phoneNumber.replace(/([0-9]{1,3})([0-9]{3})([0-9]{4}$)/gi, "$1-$2-$3");
    } else if (borrower === 'coBorrower') {
      this.payorType = 'Co-Borrower'
      this.borrowerName = this.phonepayPayment.coBorrower + ' ' + this.phonepayPayment.coBorrowerLastName;
      this.borrowerAddr = this.phonepayPayment.propertyInfo.address;
      if(this.borrowerAddr!=null){
        this.borrowerAddr.toUpperCase();
      }
      this.borrowerCity = this.phonepayPayment.propertyInfo.city;
      this.borrowerState = this.phonepayPayment.propertyInfo.state;
      this.borrowerZip = this.phonepayPayment.propertyInfo.zip;
      this.borrowerPhone = this.phonepayPayment.phoneNumber.replace(/([0-9]{1,3})([0-9]{3})([0-9]{4}$)/gi, "$1-$2-$3");
    } else if (borrower === 'occupantNonBorrower') {
      this.payorType = 'Occupant'
      this.borrowerName = null;
      this.borrowerAddr = this.phonepayPayment.propertyInfo.address;
      if(this.borrowerAddr!=null){
        this.borrowerAddr.toUpperCase();
      }
      this.borrowerCity = this.phonepayPayment.propertyInfo.city;
      this.borrowerState = this.phonepayPayment.propertyInfo.state;
      this.borrowerZip = this.phonepayPayment.propertyInfo.zip;
      this.borrowerPhone = null;
    } else if (borrower === 'otherBorrower') {
      this.payorType = 'Other'
      this.borrowerName = null;
      this.borrowerAddr = null;
      this.borrowerCity = null;
      this.borrowerState = null;
      this.borrowerZip = null;
      this.borrowerPhone = null;
      this.routingNum = null;
      this.accountNum = null;
      this.bankingInfo = new BankingInfo();
    }
  }

  showPaymentBorrowerInfo(borrower: string) {
    if (borrower === 'Borrower') {
      this.payorType = 'Borrower'
      this.borrowerName = this.phonepayPayment.schedulePaymentList[0].payorName;
      this.borrowerAddr = this.phonepayPayment.schedulePaymentList[0].payorAddress;
      if(this.borrowerAddr!=null){
        this.borrowerAddr.toUpperCase();
      }
      this.borrowerCity = this.phonepayPayment.schedulePaymentList[0].payorCity;
      this.borrowerState = this.phonepayPayment.schedulePaymentList[0].payorState;
      this.borrowerZip = this.phonepayPayment.schedulePaymentList[0].payorZip;
      this.borrowerPhone = this.phonepayPayment.schedulePaymentList[0].payorPhone.replace(/([0-9]{1,3})([0-9]{3})([0-9]{4}$)/gi, "$1-$2-$3");
    } else if (borrower === 'Co-Borrower') {
      this.payorType = 'Co-Borrower'
      this.borrowerName = this.phonepayPayment.schedulePaymentList[0].payorName;
      this.borrowerAddr = this.phonepayPayment.schedulePaymentList[0].payorAddress;
      if(this.borrowerAddr!=null){
        this.borrowerAddr.toUpperCase();
      }
      this.borrowerCity = this.phonepayPayment.schedulePaymentList[0].payorCity;
      this.borrowerState = this.phonepayPayment.schedulePaymentList[0].payorState;
      this.borrowerZip =  this.phonepayPayment.schedulePaymentList[0].payorZip;
      this.borrowerPhone = this.phonepayPayment.schedulePaymentList[0].payorPhone.replace(/([0-9]{1,3})([0-9]{3})([0-9]{4}$)/gi, "$1-$2-$3");
    } else if (borrower === 'Occupant') {
      this.payorType = 'Occupant'
      this.borrowerName = this.phonepayPayment.schedulePaymentList[0].payorName;
      this.borrowerAddr = this.phonepayPayment.schedulePaymentList[0].payorAddress;
      if(this.borrowerAddr!=null){
        this.borrowerAddr.toUpperCase();
      }
      this.borrowerCity = this.phonepayPayment.schedulePaymentList[0].payorCity;
      this.borrowerState = this.phonepayPayment.schedulePaymentList[0].payorState;
      this.borrowerZip = this.phonepayPayment.schedulePaymentList[0].payorZip;
      this.borrowerPhone = this.phonepayPayment.schedulePaymentList[0].payorPhone.replace(/([0-9]{1,3})([0-9]{3})([0-9]{4}$)/gi, "$1-$2-$3");
  
    } else if (borrower === 'Other') {
      this.payorType = 'Other'
      this.borrowerName = this.phonepayPayment.schedulePaymentList[0].payorName;
      this.borrowerAddr = this.phonepayPayment.schedulePaymentList[0].payorAddress;
      if(this.borrowerAddr!=null){
        this.borrowerAddr.toUpperCase();
      }
      this.borrowerCity = this.phonepayPayment.schedulePaymentList[0].payorCity;
      this.borrowerState = this.phonepayPayment.schedulePaymentList[0].payorState;
      this.borrowerZip = this.phonepayPayment.schedulePaymentList[0].payorZip;
      this.borrowerPhone = this.phonepayPayment.schedulePaymentList[0].payorPhone.replace(/([0-9]{1,3})([0-9]{3})([0-9]{4}$)/gi, "$1-$2-$3");
    }
  }

  isPaymentAmountMismatch1: boolean;
  isPaymentAmountMismatch2: boolean;

  getCurrentRegularAmount(amount: any) {
    if(amount){
    this.regPayment1 = amount;
    this.getTotalAmount();
    }
  }

  getCurrentRegularAmountForSecondLoan(amount: any) {
    if(amount){
    this.regPayment2 = amount;
    this.getTotalAmount();
    }
  }

  getTotalAmount() {
    if ((this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked) && this.loanInfoFirst.monthlyPayment != this.regPayment1) {
      this.phonpayForm.controls['otherPayment1'].setValue(this.regPayment1);
      this.isPaymentAmountMismatch1 = true;
      this.isOtherPaymentSelected = true;
    } else if ((this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked) && this.loanInfoFirst.monthlyPayment == this.regPayment1) {
      this.isPaymentAmountMismatch1 = false;
    } else if ((!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) && this.loanInfoSecond.monthlyPayment != this.regPayment2) {
      this.phonpayForm.controls['otherPayment2'].setValue(this.regPayment2);
      this.isPaymentAmountMismatch2 = true;
      this.isOtherPaymentSelected2 = true;
    } else if ((!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) && this.loanInfoSecond.monthlyPayment == this.regPayment2) {
      this.isPaymentAmountMismatch2 = false;
    } else if ((this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) && (this.loanInfoFirst.monthlyPayment == this.regPayment1 && this.loanInfoSecond.monthlyPayment != this.regPayment2)) {
      this.phonpayForm.controls['otherPayment2'].setValue(this.regPayment2);
      this.isPaymentAmountMismatch1 = false;
      this.isPaymentAmountMismatch2 = true;
      this.isOtherPaymentSelected2 = true;
    } else if ((this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) && (this.loanInfoFirst.monthlyPayment != this.regPayment1 && this.loanInfoSecond.monthlyPayment == this.regPayment2)) {
      this.phonpayForm.controls['otherPayment1'].setValue(this.regPayment1);
      this.isPaymentAmountMismatch1 = true;
      this.isOtherPaymentSelected = true;
      this.isPaymentAmountMismatch2 = false;
    } else if ((this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) && (this.loanInfoFirst.monthlyPayment == this.regPayment1 && this.loanInfoSecond.monthlyPayment == this.regPayment2)) {
      this.isPaymentAmountMismatch1 = false;
      this.isPaymentAmountMismatch2 = false;
    } else if ((this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) && (this.loanInfoFirst.monthlyPayment != this.regPayment1 && this.loanInfoSecond.monthlyPayment != this.regPayment2)) {
      this.phonpayForm.controls['otherPayment1'].setValue(this.regPayment1);
      this.phonpayForm.controls['otherPayment2'].setValue(this.regPayment2);
      this.isPaymentAmountMismatch1 = true;
      this.isOtherPaymentSelected = true;
      this.isPaymentAmountMismatch2 = true;
      this.isOtherPaymentSelected2 = true;
    }

    this.sumOfAmount = (this.phonePayServicefee * 1 || 0) + (+this.regPayment1 || 0)
      + (+this.nsfFirst || 0)
      + (+this.lateFee1 || 0) + (+this.additionalPrincipal1 || 0)
      + (+this.additionalEscrow1 || 0) + (+this.regPayment2 || 0)
      + (+this.additionalPrincipal2 || 0)
      + (+this.nsfSecond || 0)
      + (+this.lateFee2 || 0);
    this.sumOfAmount = parseFloat(this.sumOfAmount).toFixed(2);
    if (this.phonpayForm.controls.otherFeeList.value.length && !this.phonpayForm.controls.otherFeeList1.value.length) {
      let i = 0;
      this.phonpayForm.controls.otherFeeList.value.forEach(element => {
        let itemDetails = this.phonpayForm.controls['otherFeeList'].value[i];
        this.getTotalAmountIncludingFees(itemDetails.feeAmount);
        i++
      });
    } else if (!this.phonpayForm.controls.otherFeeList.value.length && this.phonpayForm.controls.otherFeeList1.value.length) {
      let i = 0;
      this.phonpayForm.controls.otherFeeList1.value.forEach(element => {
        let itemDetails = this.phonpayForm.controls['otherFeeList1'].value[i];
        this.getTotalAmountIncludingFeesForSecondLoan(itemDetails.feeAmount1);
        i++
      });
    } else if (this.phonpayForm.controls.otherFeeList.value.length && this.phonpayForm.controls.otherFeeList1.value.length) {
      let i = 0;
      this.phonpayForm.controls.otherFeeList.value.forEach(element => {
        let itemDetails = this.phonpayForm.controls['otherFeeList'].value[i];
        this.getTotalAmountIncludingFees(itemDetails.feeAmount);
        i++
      });
      let j = 0;
      this.phonpayForm.controls.otherFeeList1.value.forEach(element => {
        let itemDetails1 = this.phonpayForm.controls['otherFeeList1'].value[j];
        this.getTotalAmountIncludingFeesForSecondLoan(itemDetails1.feeAmount1);
        j++
      });
    }
  }

  showFirstLoanDetails() {

    if((this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').value && this.phonpayForm.controls.myCheckboxGroup.get('email').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox1').value && this.phonpayForm.controls.myCheckboxGroup.get('email1').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox2').value && this.phonpayForm.controls.myCheckboxGroup.get('email2').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('printCheckbox3').value))
    {
    this.isValidateEmailPrint=false;
    }else{
      this.isValidateEmailPrint=true;
    }
    if(this.phonpayForm.controls.myCheckboxGroup.get('email').value ==="" && !this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox')){
      this.phonpayForm.controls.myCheckboxGroup.get('email1').setValue("");
      this.phonpayForm.controls.myCheckboxGroup.get('email2').setValue("");
      this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').setValue(false);
    }


    this.isLoanInfoFirstChecked = !this.isLoanInfoFirstChecked
    this.scheduledPayment = new ScheduledCheckPaymentRequest();
    if (this.isLoanInfoFirstChecked) {
        this.phonpayForm.get('paymentAdviceNote').setValidators([Validators.required]);
        this.loanInfoFirst = this.phonepayPayment.loanInfoList[0];
        this.regPayment1 = this.phonepayPayment.loanInfoList[0].monthlyPayment;
        this.nsfFirst = 0.00;
        this.lateFee1 = 0.00;
        this.additionalPrincipal1 = parseFloat('0').toFixed(2);
        this.additionalEscrow1 = parseFloat('0').toFixed(2);
        this.nsfFirst = parseFloat(this.nsfFirst).toFixed(2);
        this.lateFee1 = parseFloat(this.lateFee1).toFixed(2);
        this.regPayment1 = parseFloat(this.regPayment1).toFixed(2);
        this.chekStopFileExistanceService.isLoanAccountInStopFile(this.phonepayPayment.loanInfoList[0].loanNumber).subscribe(
          checkStopFileExistanceRes => {
            this.checkStopFileExistanceRes = checkStopFileExistanceRes;
            if (this.checkStopFileExistanceRes.isStopFile) {
              this.isStopFileForFirstLoan = true;
            }
          })
        if (!this.phonepayPayment.schedulePaymentList.length) {
          this.scheduledPayment = new ScheduledCheckPaymentRequest();
        } else if (this.phonepayPayment.schedulePaymentList.length === 1 && this.firstDigitOfLoanNumber !== 9) {
          this.scheduledPayment.paymentId = this.phonepayPayment.schedulePaymentList[0].paymentId;
        } else if (this.phonepayPayment.schedulePaymentList.length > 1) {
          this.scheduledPayment.paymentId = this.phonepayPayment.schedulePaymentList[0].paymentId;
        }
        this.scheduledPayment.loanNumber = this.loanInfoFirst.loanNumber;
        this.scheduledPayment.confirmationNumber = this.loanInfoFirst.confirmationNumber.replace(/-/g, '').trim();
        this.phonepayCheckRequest.scheduledPayments.splice(0, 0, this.scheduledPayment);
        // this.phonepayCheckRequest.scheduledPayments.push(this.scheduledPayment);
        this.getTotalAmount();
    } else {
      this.loanInfoFirst = new LoanInfoDto();
      this.nsfFirst = '';
      this.lateFee1 = '';
      this.regPayment1 = '';
      this.additionalPrincipal1 = '';
      this.additionalEscrow1 = '';
      this.isOtherPaymentSelected=false;
      this.phonpayForm.get('otherPayment1').setValue('');
      this.phonpayForm.get('paymentAdviceNote').setValidators(null);
      if (this.phonepayPayment.schedulePaymentList.length && this.phonepayPayment.schedulePaymentList[0].paymentAdvice != null) {
        this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceId = 0;
        this.phonepayPayment.schedulePaymentList[0].paymentAdvice = null;
      }
      this.isStopFileForFirstLoan = false;
      this.isAdviceTypeClicked = false;
      this.paymentAdviceValue = '';
      this.phonpayForm.get('paymentAdviceNote').setValue('');
      this.listOfFeesSelectedforFirstLoan = [];
      const control = <FormArray>this.phonpayForm.controls['otherFeeList'];
      control.value.forEach(element => {
        if (this.firstLoanFeesArray.findIndex(fee => fee.id === element.id) > -1) {
          if (element.id != undefined) {
            this.deleteLoanFeesArray.push(element.id)
          }
          this.firstLoanFeesArray.splice(this.firstLoanFeesArray.findIndex(fee => fee.id === element.id), 1)
        }
      });
      while (control.length > 0) {
        control.removeAt(0)
      }
      this.phonepayCheckRequest.scheduledPayments.splice(this.phonepayCheckRequest.scheduledPayments.indexOf(this.phonepayCheckRequest.scheduledPayments[0]), 1);
      console.log('this.deleteLoanFeesArray', this.deleteLoanFeesArray)
      this.getTotalAmount();
    }
    console.log('phonepay check request : ' + JSON.stringify(this.phonepayCheckRequest.scheduledPayments));
    this.updateTwoDgtMsg(this.isLoanInfoFirstChecked );
    this.firstLoanCheckValue('firstLoan',this.isLoanInfoFirstChecked)
  }

  showSecondLoanDetails() {

    if((this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').value && this.phonpayForm.controls.myCheckboxGroup.get('email').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox1').value && this.phonpayForm.controls.myCheckboxGroup.get('email1').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox2').value && this.phonpayForm.controls.myCheckboxGroup.get('email2').value!=="") ||
    (this.phonpayForm.controls.myCheckboxGroup.get('printCheckbox3').value))
    {
    this.isValidateEmailPrint=false;
    }else{
      this.isValidateEmailPrint=true;
    }
    if(this.phonpayForm.controls.myCheckboxGroup.get('email').value ==="" && !this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox')){
      this.phonpayForm.controls.myCheckboxGroup.get('email1').setValue("");
      this.phonpayForm.controls.myCheckboxGroup.get('email2').setValue("");
      this.phonpayForm.controls.myCheckboxGroup.get('emailCheckbox').setValue(false);
    }

    this.scheduledPayment = new ScheduledCheckPaymentRequest();
    this.isLoanInfoSecondChecked = !this.isLoanInfoSecondChecked;
    if (this.isLoanInfoSecondChecked) {
      this.phonpayForm.get('paymentAdviceNote1').setValidators([Validators.required]);
      if (this.isVerifyBankingInfo) {
        this.loanInfoSecond = this.phonepayPayment.loanInfoList[1];
        this.regPayment2 = this.phonepayPayment.loanInfoList[1].monthlyPayment;
        this.nsfSecond = 0.00;
        this.lateFee2 = 0.00;
        this.nsfSecond = parseFloat(this.nsfSecond).toFixed(2);
        this.lateFee2 = parseFloat(this.lateFee2).toFixed(2);
        this.regPayment2 = parseFloat(this.regPayment2).toFixed(2);
        this.additionalPrincipal2 = parseFloat('0').toFixed(2);
        this.chekStopFileExistanceService.isLoanAccountInStopFile(this.phonepayPayment.loanInfoList[1].loanNumber).subscribe(
          checkStopFileExistanceRes => {
            this.checkStopFileExistanceRes = checkStopFileExistanceRes;
            if (this.checkStopFileExistanceRes.isStopFile) {
              this.isStopFileForSecondLoan = true;
            }
          })
        if (!this.phonepayPayment.schedulePaymentList.length) {
          this.scheduledPayment = new ScheduledCheckPaymentRequest();
        } else if (this.phonepayPayment.schedulePaymentList.length === 1 && this.firstDigitOfLoanNumber === 9) {
          this.scheduledPayment.paymentId = this.phonepayPayment.schedulePaymentList[0].paymentId;
        } else if (this.phonepayPayment.schedulePaymentList.length > 1) {
          this.scheduledPayment.paymentId = this.phonepayPayment.schedulePaymentList[1].paymentId;
        }
        this.scheduledPayment.loanNumber = this.loanInfoSecond.loanNumber;
        this.scheduledPayment.confirmationNumber = this.loanInfoSecond.confirmationNumber.replace(/-/g, '').trim();
        this.phonepayCheckRequest.scheduledPayments.push(this.scheduledPayment);
        this.getTotalAmount();
      } else {
        alert('Please verify banking info 1st');
      }
    } else {
      this.phonpayForm.get('paymentAdviceNote1').setValidators(null);
      this.loanInfoSecond = new LoanInfoDto();
      this.nsfSecond = '';
      this.lateFee2 = '';
      // this.phonepayPayment.loanInfoList[1].nsfFees = this.nsfSecond;
      // this.phonepayPayment.loanInfoList[1].lateFees = this.lateFee2;
      this.regPayment2 = '';
      this.additionalPrincipal2 = '';
      this.isStopFileForSecondLoan = false;
      this.isOtherPaymentSelected2=false;
      this.phonpayForm.get('otherPayment2').setValue('');
      if (this.phonepayPayment.schedulePaymentList.length > 1 && this.phonepayPayment.schedulePaymentList[1].paymentAdvice != null) {
        this.phonepayPayment.schedulePaymentList[1].paymentAdvice.adviceId = 0;
        this.phonepayPayment.schedulePaymentList[1].paymentAdvice = null;
      }
      this.isAdviceTypeClicked1 = false;
      this.phonpayForm.get('paymentAdviceNote1').setValue('');
      this.paymentAdviceValue1 = '';
      const control = <FormArray>this.phonpayForm.controls['otherFeeList1'];
      control.value.forEach(element => {
        if (this.secondLoanFeesArray.findIndex(fee => fee.id === element.id) > -1) {
          if (element.id != undefined) {
            this.deleteLoanFeesArraySecond.push(element.id)
          }
          this.secondLoanFeesArray.splice(this.secondLoanFeesArray.findIndex(fee => fee.id === element.id), 1)
        }
      });
      while (control.length > 0) {
        control.removeAt(0)
      }
      this.listOfFeesSelectedforSecondLoan = [];
      console.log('this.deleteLoanFeesArraySecond', this.deleteLoanFeesArraySecond)
      // this.secondLoanFeesArray = [];
      this.phonepayCheckRequest.scheduledPayments.splice(this.phonepayCheckRequest.scheduledPayments.indexOf(this.phonepayCheckRequest.scheduledPayments[1]), 1);
      this.getTotalAmount();
    }
    console.log('phonepay check request : ' + JSON.stringify(this.phonepayCheckRequest.scheduledPayments));
    this.updateTwoDgtMsgForSecondLoan(this.isLoanInfoSecondChecked);
    this.secondLoanCheckValue('secondLoan',this.isLoanInfoSecondChecked)
  }

  addSelectedFee(event: any) {
    this.isFeeSelected = true;
    this.defaultFee = '0';

    this.feeValues = (this.feeSummary.filter(fees => fees.feeName === this.phonpayForm.get('feeValue').value));
    const otherFeeListFormArray = this.phonpayForm.controls.otherFeeList as FormArray;
    this.feeValues.map(fees => {
      return {
        feeId: fees.feeId,
        feeName: fees.feeName,
        feeAmount: new FormControl('')
      }
    }).forEach(fees => {
      otherFeeListFormArray.push(this.formBuilder.group({
        feeId: new FormControl(fees.feeId),
        feeName: new FormControl(fees.feeName),
        feeAmount: new FormControl('')
      }));
    });
    this.phonpayForm.controls['feeValue'].setValue(this.defaultFee);
    this.otherFeeCount++;
  }

  addSelectedFeeForSecondLoan(event: any) {
    this.isFeeSelected = true;
    this.defaultFee1 = '0';
    this.feeValues = (this.feeSummary.filter(fees => fees.feeName === this.phonpayForm.get('feeValue1').value));
    const otherFeeListFormArrayForSecondLoan = this.phonpayForm.controls.otherFeeList1 as FormArray;
    this.feeValues.map(fees => {
      return {
        feeId: fees.feeId,
        feeName: fees.feeName,
        feeAmount1: new FormControl('')
      }
    }).forEach(fees => {
      otherFeeListFormArrayForSecondLoan.push(this.formBuilder.group({
        feeId: new FormControl(fees.feeId),
        feeName: new FormControl(fees.feeName),
        feeAmount1: new FormControl('')
      }));
    });
    this.cdr.detectChanges();
    this.phonpayForm.controls['feeValue1'].setValue(this.defaultFee1);
  }

  isOtherPaymentSelected:boolean;
  isOtherPaymentSelected2:boolean;

  disablePaymentAmount(event){
    this.stopFileInfo(event, 'clearAdvice' );

    console.log('this.isOtherPaymentSelected', this.isOtherPaymentSelected)
    console.log('email list ****', this.phonpayForm['controls'].stopFile);
    this.isOtherPaymentSelected = !this.isOtherPaymentSelected;
   // alert(this.isOtherPaymentSelected);
    if(this.isOtherPaymentSelected) {
        this.isOtherPayment = true;
        this.firstLoanFeesArray = [];
        this.nsfFirst = 0.00;
        this.lateFee1 = 0.00;
        this.additionalPrincipal1 = parseFloat('0').toFixed(2);
        this.additionalEscrow1 = parseFloat('0').toFixed(2);
        this.nsfFirst = parseFloat(this.nsfFirst).toFixed(2);
        this.lateFee1 = parseFloat(this.lateFee1).toFixed(2);
        this.isWaveOffChecked = false;
       // this.phonpayForm.get('paymentAdviceNote').setValue('');
       /// alert("hhhh : "+this.phonpayForm.controls['otherFeeList'].value[0].feeName);

        if(this.isWaveOffChecked){
          this.sumOfAmount = this.loanInfoFirst.monthlyPayment;
        }else{
           this.sumOfAmount = (+this.loanInfoFirst.monthlyPayment)+10;
        }

        if(this.phonpayForm.controls['otherPayment1'].value === null){
          this.isOtherPayment = true;
        }
     const control = <FormArray>this.phonpayForm.get('otherFeeList');
    for(let i = control.length-1; i>=0; i--){
      control.removeAt(i);
     }
      this.phonpayForm.controls['monthlyPayment1'].disable();
     } else {
      this.isOtherPayment = false;
      this.phonpayForm.controls['feeValue'].enable();
      this.phonpayForm.get('paymentAdviceNote').setValue('');
        this.regPayment1 = this.phonepayPayment.loanInfoList[0].monthlyPayment;
        this.phonpayForm.controls['otherPayment1'].setValue('');
        this.phonpayForm.controls['monthlyPayment1'].enable();
        this.getCurrentRegularAmount(this.regPayment1);
        this.isOtherPayment = false;
        this.isAdviceTypeClicked = false;
      }
      this.updateTwoDgtMsg(this.isOtherPaymentSelected );
  }

  disablePaymentAmountForSecondPayment(event){
    console.log('this.isOtherPaymentSelected2', this.isOtherPaymentSelected2)
    this.stopFileInfoForSecondLoan(event, 'clearAdvice1' );
    this.isOtherPaymentSelected2 = !this.isOtherPaymentSelected2;
    if(this.isOtherPaymentSelected2) {
      this.secondLoanFeesArray = [];
      this.isOtherPayment1 = true;
      this.nsfSecond = 0.00;
      this.lateFee2 = 0.00;
      this.nsfSecond = parseFloat(this.nsfSecond).toFixed(2);
      this.lateFee2 = parseFloat(this.lateFee2).toFixed(2);
      this.additionalPrincipal2 = parseFloat('0').toFixed(2);
      this.isWaveOffChecked = false;
      if(this.isWaveOffChecked  && !this.isLoanInfoFirstChecked){
        this.sumOfAmount = this.loanInfoSecond.monthlyPayment;
      }else{
         this.sumOfAmount = (+this.loanInfoSecond.monthlyPayment)+10;
      }
      if(this.phonpayForm.controls['otherPayment2'].value === null){
        this.isOtherPayment1 = true;
      }
      this.phonpayForm.controls['monthlyPayment2'].disable();

      const control = <FormArray>this.phonpayForm.get('otherFeeList1');
     for(let i = control.length-1; i>=0; i--){
      control.removeAt(i);
     }
     } else {
        if(this.phonepayPayment.loanInfoList.length>1){
          this.regPayment2 = this.phonepayPayment.loanInfoList[1].monthlyPayment;
        }else{
          this.regPayment2 = this.phonepayPayment.loanInfoList[0].monthlyPayment;
        }
        this.phonpayForm.controls['otherPayment2'].setValue('');
        this.phonpayForm.controls['monthlyPayment2'].enable();
        this.phonpayForm.controls['feeValue1'].enable();
        this.getCurrentRegularAmountForSecondLoan(this.regPayment2);
        this.isOtherPayment1 = false;
        this.isAdviceTypeClicked1 = false;
      }
      this.updateTwoDgtMsgForSecondLoan(this.isOtherPaymentSelected2 );

  }

  setServiceFees(event) {
    this.isWaveOffChecked = !this.isWaveOffChecked
    if (this.isWaveOffChecked) {
      this.phonePayServicefee = 0;
      this.phonePayServicefee = parseFloat(this.phonePayServicefee).toFixed(2);

      if (this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
        let itemIndex = this.firstLoanFeesArray.findIndex(item => item.feeCode === 17);
        if (itemIndex > -1) {
          this.firstLoanFeesArray[itemIndex].feeAmount = this.phonePayServicefee;
        }
      } else if (this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked) {
        let itemIndex = this.firstLoanFeesArray.findIndex(item => item.feeCode === 17);
        if (itemIndex > -1) {
          this.firstLoanFeesArray[itemIndex].feeAmount = this.phonePayServicefee;
        }
      } else if (!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
        let itemIndex = this.secondLoanFeesArray.findIndex(item => item.feeCode === 17);
        if (itemIndex > -1) {
          this.secondLoanFeesArray[itemIndex].feeAmount = this.phonePayServicefee;
        }
      }
      this.getTotalAmount();
    } else {
      this.phonePayServicefee = 10;
      this.phonePayServicefee = parseFloat(this.phonePayServicefee).toFixed(2);

      if (this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
        let itemIndex = this.firstLoanFeesArray.findIndex(item => item.feeCode === 17);
        if (itemIndex > -1) {
          this.firstLoanFeesArray[itemIndex].feeAmount = this.phonePayServicefee;
        }
      } else if (this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked) {
        let itemIndex = this.firstLoanFeesArray.findIndex(item => item.feeCode === 17);
        if (itemIndex > -1) {
          this.firstLoanFeesArray[itemIndex].feeAmount = this.phonePayServicefee;
        }
      } else if (!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
        let itemIndex = this.secondLoanFeesArray.findIndex(item => item.feeCode === 17);
        if (itemIndex > -1) {
          this.secondLoanFeesArray[itemIndex].feeAmount = this.phonePayServicefee;
        }
      }
      this.getTotalAmount();
    }

  }

  onSubmit() {
    this.isPay = true;
    this.submitted = true;

    if (this.phonpayForm.invalid) {
      const invalid = [];
      const controls = this.phonpayForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
         console.log(controls[name]);
        }
      }
      console.log('this.phonpayForm.invalid++++', invalid)
      return;
    }

    let arr1 = [];
    let arr2 = [];

    if (this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
      this.phonepayCheckRequest.scheduledPayments[0].accountNumber = this.phonpayForm.get('accountNumber').value;
      this.phonepayCheckRequest.scheduledPayments[0].routingNumber = this.routingNum;
      this.phonepayCheckRequest.scheduledPayments[0].accountType = (this.phonpayForm.get('accountType').value).toString().charAt(0);
      this.phonepayCheckRequest.scheduledPayments[0].payorName = this.phonpayForm.get('payorName').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorStreetAddress = this.phonpayForm.get('payorAddress').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorState = this.phonpayForm.get('payorState').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorCity = this.phonpayForm.get('payorCity').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorZip = this.phonpayForm.get('payorZip').value;
      this.phonepayCheckRequest.scheduledPayments[0].enteredBy = this.phonpayForm.get('enteredBy').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorPhone = this.borrowerPhone;
      this.phonepayCheckRequest.scheduledPayments[0].payorType = this.payorType;

      this.phonepayCheckRequest.scheduledPayments[1].accountNumber = this.phonpayForm.get('accountNumber').value;
      this.phonepayCheckRequest.scheduledPayments[1].routingNumber = this.routingNum;
      this.phonepayCheckRequest.scheduledPayments[1].accountType = (this.phonpayForm.get('accountType').value).toString().charAt(0);
      this.phonepayCheckRequest.scheduledPayments[1].payorName = this.phonpayForm.get('payorName').value;
      this.phonepayCheckRequest.scheduledPayments[1].payorStreetAddress = this.phonpayForm.get('payorAddress').value;
      this.phonepayCheckRequest.scheduledPayments[1].payorState = this.phonpayForm.get('payorState').value;
      this.phonepayCheckRequest.scheduledPayments[1].payorCity = this.phonpayForm.get('payorCity').value;
      this.phonepayCheckRequest.scheduledPayments[1].payorZip = this.phonpayForm.get('payorZip').value;
      this.phonepayCheckRequest.scheduledPayments[1].enteredBy = this.phonpayForm.get('enteredBy').value;
      this.phonepayCheckRequest.scheduledPayments[1].payorPhone = this.borrowerPhone;
      this.phonepayCheckRequest.scheduledPayments[1].payorType = this.payorType;

      if (this.phonepayCheckRequest.scheduledPayments[0].paymentId === undefined && this.phonepayCheckRequest.scheduledPayments[1].paymentId === undefined) {

        arr1.push({ feeCode: 10, feeAmount: this.regPayment1 });
        arr1.push({ feeCode: 14, feeAmount: this.lateFee1 });
        arr1.push({ feeCode: 13, feeAmount: this.nsfFirst });
        arr1.push({ feeCode: 12, feeAmount: +this.additionalEscrow1 || 0 });
        arr1.push({ feeCode: 11, feeAmount: +this.additionalPrincipal1 || 0 });
        arr1.push({ feeCode: 17, feeAmount: +this.phonePayServicefee });

        arr2.push({ feeCode: 10, feeAmount: this.regPayment2 });
        arr2.push({ feeCode: 14, feeAmount: this.lateFee2 });
        arr2.push({ feeCode: 13, feeAmount: this.nsfSecond });
        arr2.push({ feeCode: 11, feeAmount: +this.additionalPrincipal2 || 0 });


        if (this.firstLoanFeesArray.length != 0) {
          this.firstLoanFeesArray.forEach(fees => {
            arr1.push({ feeCode: fees.feeCode, feeAmount: fees.feeAmount });
          });
        }
        this.feeListForFirstLoan = <OtherFeeDto[]>arr1;
        this.phonepayCheckRequest.scheduledPayments[0].feeList = this.feeListForFirstLoan;

        //getting feelist for second loan
        if (this.secondLoanFeesArray.length != 0) {
          this.secondLoanFeesArray.forEach(fees => {
            arr2.push({ feeCode: fees.feeCode, feeAmount: fees.feeAmount });
          });
        }
        this.feeListForSecondLoan = <OtherFeeDto[]>arr2;
      } else if (this.phonepayCheckRequest.scheduledPayments[0].paymentId > 0 && this.phonepayCheckRequest.scheduledPayments[1].paymentId > 0) {
        this.firstLoanFeesArray.forEach(fee => {
          if (fee.feeCode === 10) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 10)
            this.firstLoanFeesArray[index].feeAmount = this.regPayment1
          } else if (fee.feeCode === 11) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 11)
            this.firstLoanFeesArray[index].feeAmount = +this.additionalPrincipal1
          } else if (fee.feeCode === 12) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 12)
            this.firstLoanFeesArray[index].feeAmount = +this.additionalEscrow1
          } else if (fee.feeCode === 13) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 13)
            this.firstLoanFeesArray[index].feeAmount = this.nsfFirst
          } else if (fee.feeCode === 14) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 14)
            this.firstLoanFeesArray[index].feeAmount = this.lateFee1
          }
        })
        if (this.deleteLoanFeesArray.length) {
          this.phonepayCheckRequest.scheduledPayments[0].deleteFeeList = this.deleteLoanFeesArray;
        }
        this.feeListForFirstLoan = <OtherFeeDto[]>this.firstLoanFeesArray;

        this.secondLoanFeesArray.forEach(fee => {
          if (fee.feeCode === 10) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 10)
            this.secondLoanFeesArray[index].feeAmount = this.regPayment2
          } else if (fee.feeCode === 11) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 11)
            this.secondLoanFeesArray[index].feeAmount = +this.additionalPrincipal2
          } else if (fee.feeCode === 13) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 13)
            this.secondLoanFeesArray[index].feeAmount = this.nsfSecond
          } else if (fee.feeCode === 14) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 14)
            this.secondLoanFeesArray[index].feeAmount = this.lateFee2
          }
        })
        if (this.deleteLoanFeesArraySecond.length) {
          this.phonepayCheckRequest.scheduledPayments[0].deleteFeeList = this.deleteLoanFeesArraySecond;
        }
        this.feeListForSecondLoan = <OtherFeeDto[]>this.secondLoanFeesArray;
      } else if (this.phonepayCheckRequest.scheduledPayments[0].paymentId === undefined && this.phonepayCheckRequest.scheduledPayments[1].paymentId > 0) {
        console.log('inserting first loan fees')
        arr1.push({ feeCode: 10, feeAmount: this.regPayment1 });
        arr1.push({ feeCode: 14, feeAmount: this.lateFee1 });
        arr1.push({ feeCode: 13, feeAmount: this.nsfFirst });
        arr1.push({ feeCode: 12, feeAmount: +this.additionalEscrow1 || 0 });
        arr1.push({ feeCode: 11, feeAmount: +this.additionalPrincipal1 || 0 });
        arr1.push({ feeCode: 17, feeAmount: +this.phonePayServicefee });

        if (this.firstLoanFeesArray.length != 0) {
          this.firstLoanFeesArray.forEach(fees => {
            arr1.push({ feeCode: fees.feeCode, feeAmount: fees.feeAmount });
          });
        }
        this.feeListForFirstLoan = <OtherFeeDto[]>arr1;

        console.log('updating second fees')
        this.secondLoanFeesArray.forEach(fee => {
          if (fee.feeCode === 10) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 10)
            this.secondLoanFeesArray[index].feeAmount = this.regPayment2
          } else if (fee.feeCode === 11) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 11)
            this.secondLoanFeesArray[index].feeAmount = +this.additionalPrincipal2
          } else if (fee.feeCode === 13) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 13)
            this.secondLoanFeesArray[index].feeAmount = this.nsfSecond
          } else if (fee.feeCode === 14) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 14)
            this.secondLoanFeesArray[index].feeAmount = this.lateFee2
          }
        })
        if (this.deleteLoanFeesArraySecond.length) {
          this.phonepayCheckRequest.scheduledPayments[0].deleteFeeList = this.deleteLoanFeesArraySecond;
        }
        this.feeListForSecondLoan = <OtherFeeDto[]>this.secondLoanFeesArray;
      } else if (this.phonepayCheckRequest.scheduledPayments[0].paymentId > 0 && this.phonepayCheckRequest.scheduledPayments[1].paymentId === undefined) {
        console.log('updating first loan fees')
        this.firstLoanFeesArray.forEach(fee => {
          if (fee.feeCode === 10) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 10)
            this.firstLoanFeesArray[index].feeAmount = this.regPayment1
          } else if (fee.feeCode === 11) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 11)
            this.firstLoanFeesArray[index].feeAmount = +this.additionalPrincipal1
          } else if (fee.feeCode === 12) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 12)
            this.firstLoanFeesArray[index].feeAmount = +this.additionalEscrow1
          } else if (fee.feeCode === 13) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 13)
            this.firstLoanFeesArray[index].feeAmount = this.nsfFirst
          } else if (fee.feeCode === 14) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 14)
            this.firstLoanFeesArray[index].feeAmount = this.lateFee1
          } else if (fee.feeCode === 17) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 17)
            this.firstLoanFeesArray[index].feeAmount = this.phonePayServicefee
          }
        })
        if (this.deleteLoanFeesArray.length) {
          this.phonepayCheckRequest.scheduledPayments[0].deleteFeeList = this.deleteLoanFeesArray;
        }
        this.feeListForFirstLoan = <OtherFeeDto[]>this.firstLoanFeesArray;

        console.log('inserting second loan fees')
        arr2.push({ feeCode: 10, feeAmount: this.regPayment2 });
        arr2.push({ feeCode: 14, feeAmount: this.lateFee2 });
        arr2.push({ feeCode: 13, feeAmount: this.nsfSecond });
        arr2.push({ feeCode: 11, feeAmount: +this.additionalPrincipal2 || 0 });

        if (this.secondLoanFeesArray.length != 0) {
          this.secondLoanFeesArray.forEach(fees => {
            arr2.push({ feeCode: fees.feeCode, feeAmount: fees.feeAmount });
          });
        }
        this.feeListForSecondLoan = <OtherFeeDto[]>arr2;
      }

      this.phonepayCheckRequest.scheduledPayments[0].feeList = this.feeListForFirstLoan;

      this.phonepayCheckRequest.scheduledPayments[1].feeList = this.feeListForSecondLoan;

    } else if (this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked) {
      this.phonepayCheckRequest.scheduledPayments[0].accountNumber = this.phonpayForm.get('accountNumber').value;
      this.phonepayCheckRequest.scheduledPayments[0].routingNumber = this.routingNum;
      this.phonepayCheckRequest.scheduledPayments[0].accountType = (this.phonpayForm.get('accountType').value).toString().charAt(0);
      this.phonepayCheckRequest.scheduledPayments[0].payorName = this.phonpayForm.get('payorName').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorStreetAddress = this.phonpayForm.get('payorAddress').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorState = this.phonpayForm.get('payorState').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorCity = this.phonpayForm.get('payorCity').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorZip = this.phonpayForm.get('payorZip').value;
      this.phonepayCheckRequest.scheduledPayments[0].enteredBy = this.phonpayForm.get('enteredBy').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorPhone = this.borrowerPhone;
      this.phonepayCheckRequest.scheduledPayments[0].payorType = this.payorType;

      if (this.phonepayCheckRequest.scheduledPayments[0].paymentId === undefined) {
        console.log('inserting fees')
        arr1.push({ feeCode: 10, feeAmount: this.regPayment1 });
        arr1.push({ feeCode: 14, feeAmount: this.lateFee1 });
        arr1.push({ feeCode: 13, feeAmount: this.nsfFirst });
        arr1.push({ feeCode: 12, feeAmount: +this.additionalEscrow1 || 0 });
        arr1.push({ feeCode: 11, feeAmount: +this.additionalPrincipal1 || 0 });
        arr1.push({ feeCode: 17, feeAmount: +this.phonePayServicefee || 0 });

        if (this.firstLoanFeesArray.length != 0) {
          this.firstLoanFeesArray.forEach(fees => {
            arr1.push({ feeCode: fees.feeCode, feeAmount: fees.feeAmount });
          });
        }
        this.feeListForFirstLoan = <OtherFeeDto[]>arr1;
      } else {
        console.log('updating fees')
        this.firstLoanFeesArray.forEach(fee => {
          if (fee.feeCode === 10) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 10)
            this.firstLoanFeesArray[index].feeAmount = this.regPayment1
          } else if (fee.feeCode === 11) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 11)
            this.firstLoanFeesArray[index].feeAmount = +this.additionalPrincipal1
          } else if (fee.feeCode === 12) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 12)
            this.firstLoanFeesArray[index].feeAmount = +this.additionalEscrow1
          } else if (fee.feeCode === 13) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 13)
            this.firstLoanFeesArray[index].feeAmount = this.nsfFirst
          } else if (fee.feeCode === 14) {
            let index = this.firstLoanFeesArray.findIndex(item => item.feeCode === 14)
            this.firstLoanFeesArray[index].feeAmount = this.lateFee1
          }
        })
        if (this.deleteLoanFeesArray.length) {
          this.phonepayCheckRequest.scheduledPayments[0].deleteFeeList = this.deleteLoanFeesArray;
        }
        this.feeListForFirstLoan = <OtherFeeDto[]>this.firstLoanFeesArray;
      }

      this.phonepayCheckRequest.scheduledPayments[0].feeList = this.feeListForFirstLoan;
    } else if (this.isLoanInfoSecondChecked && !this.isLoanInfoFirstChecked) {
      this.phonepayCheckRequest.scheduledPayments[0].accountNumber = this.phonpayForm.get('accountNumber').value;
      this.phonepayCheckRequest.scheduledPayments[0].routingNumber = this.routingNum;
      this.phonepayCheckRequest.scheduledPayments[0].accountType = (this.phonpayForm.get('accountType').value).toString().charAt(0);
      this.phonepayCheckRequest.scheduledPayments[0].payorName = this.phonpayForm.get('payorName').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorStreetAddress = this.phonpayForm.get('payorAddress').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorState = this.phonpayForm.get('payorState').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorCity = this.phonpayForm.get('payorCity').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorZip = this.phonpayForm.get('payorZip').value;
      this.phonepayCheckRequest.scheduledPayments[0].enteredBy = this.phonpayForm.get('enteredBy').value;
      this.phonepayCheckRequest.scheduledPayments[0].payorPhone = this.borrowerPhone;
      this.phonepayCheckRequest.scheduledPayments[0].payorType = this.payorType;

      if (this.phonepayCheckRequest.scheduledPayments[0].paymentId === undefined) {
        console.log('inserting fees')
        arr2.push({ feeCode: 10, feeAmount: this.regPayment2 });
        arr2.push({ feeCode: 14, feeAmount: this.lateFee2 });
        arr2.push({ feeCode: 13, feeAmount: this.nsfSecond });
        arr2.push({ feeCode: 11, feeAmount: +this.additionalPrincipal2 || 0 });
        arr2.push({ feeCode: 17, feeAmount: +this.phonePayServicefee });

        if (this.secondLoanFeesArray.length != 0) {
          this.secondLoanFeesArray.forEach(fees => {
            arr2.push({ feeCode: fees.feeCode, feeAmount: fees.feeAmount });
          });
        }
        this.feeListForSecondLoan = <OtherFeeDto[]>arr2;
        // this.phonepayCheckRequest.scheduledPayments[0].phonePayServiceFee = (+this.phonePayServicefee);
      } else {
        console.log('updating fees')
        this.secondLoanFeesArray.forEach(fee => {
          if (fee.feeCode === 10) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 10)
            this.secondLoanFeesArray[index].feeAmount = this.regPayment2
          } else if (fee.feeCode === 11) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 11)
            this.secondLoanFeesArray[index].feeAmount = +this.additionalPrincipal2
          } else if (fee.feeCode === 13) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 13)
            this.secondLoanFeesArray[index].feeAmount = this.nsfSecond
          } else if (fee.feeCode === 14) {
            let index = this.secondLoanFeesArray.findIndex(item => item.feeCode === 14)
            this.secondLoanFeesArray[index].feeAmount = this.lateFee2
          }
        })
        if (this.deleteLoanFeesArraySecond.length) {
          this.phonepayCheckRequest.scheduledPayments[0].deleteFeeList = this.deleteLoanFeesArraySecond;
        }
        this.feeListForSecondLoan = <OtherFeeDto[]>this.secondLoanFeesArray;
      }

      this.phonepayCheckRequest.scheduledPayments[0].feeList = this.feeListForSecondLoan;
    }
    this.phonepayCheckRequest.pay = this.isPay;
    this.phonepayCheckRequest.loanNumber = this.phonepayPayment.loanInfoList[0].loanNumber;
    this.phonepayCheckRequest.emailAddressList = this.emailList;
    this.phonepayCheckRequest.printedConfirmation = this.isPrintConfirmation;

    if ((this.isLoanInfoFirstChecked && this.isAdviceTypeClicked) && !(this.isLoanInfoSecondChecked && this.isAdviceTypeClicked1)) {
      this.phonepayCheckRequest.scheduledPayments[0].paymentAdviceType = this.paymentAdviceValue;
      this.phonepayCheckRequest.scheduledPayments[0].paymentAdviceNotes = this.phonpayForm.get('paymentAdviceNote').value;
    } else if ((this.isLoanInfoFirstChecked && !this.isAdviceTypeClicked) && (this.isLoanInfoSecondChecked && this.isAdviceTypeClicked1)) {
      this.phonepayCheckRequest.scheduledPayments[1].paymentAdviceType = this.paymentAdviceValue1;
      this.phonepayCheckRequest.scheduledPayments[1].paymentAdviceNotes = this.phonpayForm.get('paymentAdviceNote1').value;
    }
    else if (!(this.isLoanInfoFirstChecked && this.isAdviceTypeClicked) && (this.isLoanInfoSecondChecked && this.isAdviceTypeClicked1)) {
      this.phonepayCheckRequest.scheduledPayments[0].paymentAdviceType = this.paymentAdviceValue1;
      this.phonepayCheckRequest.scheduledPayments[0].paymentAdviceNotes = this.phonpayForm.get('paymentAdviceNote1').value;
    }
    if ((this.isLoanInfoFirstChecked && this.isAdviceTypeClicked) && (this.isLoanInfoSecondChecked && this.isAdviceTypeClicked1)) {
      this.phonepayCheckRequest.scheduledPayments[0].paymentAdviceType = this.paymentAdviceValue;
      this.phonepayCheckRequest.scheduledPayments[0].paymentAdviceNotes = this.phonpayForm.get('paymentAdviceNote').value;
      this.phonepayCheckRequest.scheduledPayments[1].paymentAdviceType = this.paymentAdviceValue1;
      this.phonepayCheckRequest.scheduledPayments[1].paymentAdviceNotes = this.phonpayForm.get('paymentAdviceNote1').value;
    }

    console.log('this.phonepayCheckRequest **********', this.phonepayCheckRequest);

    this.appComp.showProgressBar(true);
    this.schedulePhonePayPaymentService.scheduleCheckPayment(this.phonepayCheckRequest).subscribe(
      phonepayCheckPaymentResponse => {
        this.phonepayCheckPaymentResponse = phonepayCheckPaymentResponse;
        if (this.phonepayCheckPaymentResponse.isSuccessful) {
          if (this.userDetails.authorities === 'ServicingAdmin') {
            if (this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
              this.appComp.showSuccessMessage(this.phonepayCheckPaymentResponse.message + "<br><b>Confirmation Number:</b>" + this.loanInfoFirst.confirmationNumber, null, true);
              this.router.navigate(['/app-admin-dashboard'], { replaceUrl: true });
            } else if (this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked) {
              this.appComp.showSuccessMessage(this.phonepayCheckPaymentResponse.message + "<br><b>Confirmation Number:</b>" + this.loanInfoFirst.confirmationNumber, null, true);
              this.router.navigate(['/app-admin-dashboard'], { replaceUrl: true });
            } else if (!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
              this.appComp.showSuccessMessage(this.phonepayCheckPaymentResponse.message + "<br><b>Confirmation Number:</b>" + this.loanInfoSecond.confirmationNumber, null, true);
              this.router.navigate(['/app-admin-dashboard'], { replaceUrl: true });
            }

          } else {
            if (this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
              this.appComp.showSuccessMessage(this.phonepayCheckPaymentResponse.message + "<br><b>Confirmation Number:</b>" + this.loanInfoFirst.confirmationNumber, null, true);
              this.router.navigate(['/check-request'], { replaceUrl: true });
            } else if (this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked) {
              this.appComp.showSuccessMessage(this.phonepayCheckPaymentResponse.message + "<br><b>Confirmation Number:</b>" + this.loanInfoFirst.confirmationNumber, null, true);
              this.router.navigate(['/check-request'], { replaceUrl: true });
            } else if (!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
              this.appComp.showSuccessMessage(this.phonepayCheckPaymentResponse.message + "<br><b>Confirmation Number:</b>" + this.loanInfoSecond.confirmationNumber, null, true);
              this.router.navigate(['/check-request'], { replaceUrl: true });
            }
          }
        } else {
          this.appComp.showErrorMessage(this.phonepayCheckPaymentResponse.message, null, true);
        }
      }
    );
  }

  schedulePaymentAlertMessageForBatchPayment: boolean;

  showSchedulePaymentErrorMessage(msgContent: string, routerLink: string, isBack: boolean) {
    this.schedulePaymentAlertMessageForBatchPayment = false;
    this.schedulePaymentAlertMessage = false;
    this.schedulePaymentFailureMessage = true;
    this.dialogObj.msgHeader = 'Information!';
    this.populateMessage(msgContent, routerLink, isBack);
  }

  showSchedulePaymentAlertMessageForBatchPayment(msgContent: string, routerLink: string, isBack: boolean) {
    this.schedulePaymentAlertMessageForBatchPayment = true;
    this.schedulePaymentAlertMessage = false;
    this.schedulePaymentFailureMessage = false;
    this.dialogObj.msgHeader = 'Alert!';
    this.populateMessage(msgContent, routerLink, isBack);
  }

  schedulePaymentAlertMessage: boolean;

  showSchedulePaymentAlertMessage(msgContent: string, routerLink: string, isBack: boolean) {
    this.schedulePaymentAlertMessageForBatchPayment = false;
    this.schedulePaymentFailureMessage = false;
    //this.showCancelPaymentPopUp = false;
    this.schedulePaymentAlertMessage = true;
    this.dialogObj.msgHeader = 'Alert!';
    this.populateMessage(msgContent, routerLink, isBack);
  }

  scheduleIncompletePaymentAlertMessage: boolean;
  showIncompleteSchedulePaymentCloseAlertMessage(msgContent: string, routerLink: string, isBack: boolean) {
    this.schedulePaymentAlertMessageForBatchPayment = false;
    this.schedulePaymentFailureMessage = false;
    this.schedulePaymentAlertMessage = false;
    this.scheduleIncompletePaymentAlertMessage = true;
    this.dialogObj.msgHeader = 'Alert!';
    this.populateMessage(msgContent, routerLink, isBack);
  }

  populateMessage(msgContent: string, routerLink: string, isBack: boolean) {
    this.dialogObj.msgContent = msgContent;
    this.dialogObj.routeUrl = routerLink;
    this.dialogObj.isDialogBox = true;
    this.dialogObj.isBack = isBack;
    this.progressBar = true;
    this.cdr.detectChanges();
  }

  closeDialogBox() {
    this.dialogObj.isDialogBox = false;
    if (this.dialogObj.isBack) {
    } else if (this.dialogObj.routeUrl) {
      this.router.navigate([this.dialogObj.routeUrl]);
    }
    this.cdr.detectChanges();
    this.appComp.showProgressBar(false);
  }

  borrowerUncheck(isBorrowerType){
   this.checkedBorrowerType = isBorrowerType;
   //this.borrowerTypeName = 'borrower';
  }


  closeForm(schedulePaymentListSize, coBorrowerEmail,otherEmail, isBorrowerTypeChecked) {
  this.appComp.showProgressBar(true);
  //alert(schedulePaymentListSize+" : "+coBorrowerEmail+" : "+otherEmail+" : "+isBorrowerTypeChecked);
    // this.showCancelPaymentPopUp = false;
    // if (this.isLoanInfoFirstChecked || this.isLoanInfoSecondChecked) {
    //   this.showSchedulePaymentAlertMessage('Any changes you made will be lost. Do you wish to continue?', null, true);
    // } else {
      if(schedulePaymentListSize===0){
        if(coBorrowerEmail || otherEmail || isBorrowerTypeChecked){
      this.showIncompleteSchedulePaymentCloseAlertMessage('Any changes you made will be lost. Do you wish to continue?', null, true);
        }else{
          this.exitForm();
        }
    }else{
      this.exitForm();
      }
    //}
  }

  exitForm() {
    if (this.isRequestFromPaymentScreen === 'true') {
      if (this.userDetails.authorities === 'ServicingAdmin') {
        this.router.navigate(['/app-admin-dashboard'], { replaceUrl: true });
        this.appComp.showProgressBar(false);
        localStorage.clear();
      } else {
        this.router.navigate(['/check-request'], { replaceUrl: true });
        this.appComp.showProgressBar(false);
        localStorage.clear();
      }
    } else {
      this.router.navigate(['/app-payments-in-process'], { replaceUrl: true });
      this.appComp.showProgressBar(false);
      localStorage.clear();
    }
  }

  delInput(input: number) {
    console.log("del11    "+input);
 // console.log('----------', this.phonpayForm.controls['otherFeeList'])
    console.log('----------', this.phonpayForm.controls['otherFeeList'].value[input], input)
    let itemDetails = this.phonpayForm.controls['otherFeeList'].value[input];
   if (itemDetails.id !== undefined && itemDetails.id > 0) {
      console.log('itemDetails.id', itemDetails.id)
      let delIndex = this.firstLoanFeesArray.findIndex(item => item.id === itemDetails.id);
      console.log('delIndex', delIndex);
      this.deleteLoanFeesArray.push(this.firstLoanFeesArray[delIndex].id)
      console.log('this.deleteLoanFeesArray', this.deleteLoanFeesArray)
      this.firstLoanFeesArray.splice(this.firstLoanFeesArray.findIndex(item => item.id === itemDetails.id), 1);
      console.log('this.firstLoanFeesArray', this.firstLoanFeesArray);
      (<FormArray>this.phonpayForm.get('otherFeeList')).removeAt(input);
      let removedFeeValue = itemDetails.feeAmount;
      this.sumOfAmount = (+this.sumOfAmount) - (+removedFeeValue || 0);
      this.sumOfAmount = parseFloat(this.sumOfAmount).toFixed(2);
      if (this.phonpayForm.controls['otherFeeList'].value.length === 0 && !this.isStopFileForFirstLoan) {
        if (this.phonepayPayment.schedulePaymentList.length && this.phonepayPayment.schedulePaymentList[0].paymentAdvice != null) {
          this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceId = 0;
          this.phonepayPayment.schedulePaymentList[0].paymentAdvice = null;
        }
        this.phonpayForm.get('paymentAdviceNote').setValidators(null);
        this.isOtherFeesSelected = false;
        this.isAdviceTypeClicked = false;
        this.paymentAdviceValue = '';
        this.phonpayForm.get('paymentAdviceNote').setValue('');
      }
    } else {
      (<FormArray>this.phonpayForm.get('otherFeeList')).removeAt(input);
      console.log('itemDetails.id', itemDetails.id);
      let removedFeeValue = itemDetails.feeAmount;
      this.sumOfAmount = (+this.sumOfAmount) - (+removedFeeValue || 0);
      this.sumOfAmount = parseFloat(this.sumOfAmount).toFixed(2);
      //this.firstLoanFeesArray.splice(this.firstLoanFeesArray.findIndex(item => item.id === undefined  && item.feeCode === itemDetails.feeId), 1);
      this.firstLoanFeesArray.splice(input, 1);
      if (this.phonpayForm.controls['otherFeeList'].value.length === 0 && !this.isStopFileForFirstLoan) {
        if (this.phonepayPayment.schedulePaymentList.length && this.phonepayPayment.schedulePaymentList[0].paymentAdvice != null) {
          this.phonepayPayment.schedulePaymentList[0].paymentAdvice.adviceId = 0;
          this.phonepayPayment.schedulePaymentList[0].paymentAdvice = null;
        }
        this.phonpayForm.get('paymentAdviceNote').setValidators(null);
        this.isOtherFeesSelected = false;
        this.isAdviceTypeClicked = false;
        this.paymentAdviceValue = '';
        this.phonpayForm.get('paymentAdviceNote').setValue('');
      }
    }
    this.phonpayForm.controls['feeValue'].enable();
    this.otherFeeCount--;
  }

  delInputForSecondLoan(input: number) {
    let itemDetails = this.phonpayForm.controls['otherFeeList1'].value[input];
    console.log('itemDetails.id', itemDetails.id)
    if (itemDetails.id > 0 && itemDetails.id !== undefined) {
      let delIndex = this.secondLoanFeesArray.findIndex(item => item.id === itemDetails.id);
      console.log('delIndex', delIndex);
      this.deleteLoanFeesArraySecond.push(this.secondLoanFeesArray[delIndex].id)
      console.log('this.deleteLoanFeesArraySecond', this.deleteLoanFeesArraySecond)
      this.secondLoanFeesArray.splice(this.secondLoanFeesArray.findIndex(item => item.id === itemDetails.id), 1);
      console.log('this.secondLoanFeesArray', this.secondLoanFeesArray);

      (<FormArray>this.phonpayForm.get('otherFeeList1')).removeAt(input);
      let removedFeeValue = itemDetails.feeAmount1;
      this.sumOfAmount = (+this.sumOfAmount) - (+removedFeeValue || 0);
      this.sumOfAmount = parseFloat(this.sumOfAmount).toFixed(2);
      this.secondLoanFeesArray.splice(input, 1);

      if (this.phonpayForm.controls['otherFeeList1'].value.length === 0 && !this.isStopFileForSecondLoan) {
        if (this.phonepayPayment.schedulePaymentList.length > 1 && this.phonepayPayment.schedulePaymentList[1].paymentAdvice != null) {
          this.phonepayPayment.schedulePaymentList[1].paymentAdvice.adviceId = 0;
          this.phonepayPayment.schedulePaymentList[1].paymentAdvice = null;
        }
        this.phonpayForm.get('paymentAdviceNote1').setValidators(null);
        this.isOtherFeesSelected1 = false;
        this.isAdviceTypeClicked1 = false;
        this.paymentAdviceValue1 = '';
        this.phonpayForm.get('paymentAdviceNote1').setValue('');
      }
      //this.updateFeeForSecondLoan = false;
    } else {
      (<FormArray>this.phonpayForm.get('otherFeeList1')).removeAt(input);
      let removedFeeValue = itemDetails.feeAmount1;
      this.sumOfAmount = (+this.sumOfAmount) - (+removedFeeValue || 0);
      this.sumOfAmount = parseFloat(this.sumOfAmount).toFixed(2);
      //this.secondLoanFeesArray.splice(this.secondLoanFeesArray.findIndex(item => item.id === undefined && item.feeCode === itemDetails.feeId), 1);
      this.secondLoanFeesArray.splice(input, 1);
      if (this.phonpayForm.controls['otherFeeList1'].value.length === 0 && !this.isStopFileForSecondLoan) {
        if (this.phonepayPayment.schedulePaymentList.length > 1 && this.phonepayPayment.schedulePaymentList[1].paymentAdvice != null) {
          this.phonepayPayment.schedulePaymentList[1].paymentAdvice.adviceId = 0;
          this.phonepayPayment.schedulePaymentList[1].paymentAdvice = null;
        }
        this.phonpayForm.get('paymentAdviceNote1').setValidators(null);
        this.isOtherFeesSelected1 = false;
        this.isAdviceTypeClicked1 = false;
        this.paymentAdviceValue1 = '';
        this.phonpayForm.get('paymentAdviceNote1').setValue('');
      }
    }
    this.phonpayForm.controls['feeValue1'].enable();
  }

  getFeeAmountForFirstLoan(i: number) {
    console.log('i', i, '******', this.phonpayForm.controls['otherFeeList'].value[i])
  let itemDetails = this.phonpayForm.controls['otherFeeList'].value[i];
    if ((itemDetails.feeName === 'Other Fee' || itemDetails.feeName === 'Corporate Advance') && !this.isStopFileForFirstLoan) {
      this.phonpayForm.get('paymentAdviceNote').setValidators([Validators.required]);
      this.isOtherFeesSelected = true;
      this.isAdviceTypeClicked = true;
      this.paymentAdviceValue = 'Cashiering';
    }
    console.log('getFeeAmountForFirstLoan itemDetails****', itemDetails, this.firstLoanFeesArray.some((item) => item.id == itemDetails.id));
    let feeAmount = itemDetails.feeAmount;
    if(feeAmount == undefined || feeAmount == ''){
      this.feeAmount = true;
      this.phonpayForm.controls['feeValue'].disable();
    }else if(feeAmount !== undefined || feeAmount != ''){
      this.feeAmount = false;
      this.phonpayForm.controls['feeValue'].enable();
    }
    if (itemDetails.id > 0) {
      if (!this.firstLoanFeesArray.some((item) => item.id == itemDetails.id)) {
        this.firstLoanFeesArray.push({ id: itemDetails.id, feeCode: itemDetails.feeId, feeAmount: itemDetails.feeAmount });
        this.getTotalAmount();

      } else {
        let itemIndex = this.firstLoanFeesArray.findIndex(item => item.id == itemDetails.id);
        itemDetails.feeAmount = feeAmount;
        this.firstLoanFeesArray[itemIndex].feeAmount = itemDetails.feeAmount;
        console.log('getFeeAmountForFirstLoan itemDetails1****', itemDetails)
        this.getTotalAmount();
      }

    } else {
      if (feeAmount !== '') {
        console.log("**************** : "+this.firstLoanFeesArray[i]);
        if(this.firstLoanFeesArray[i]){
          itemDetails.feeAmount = feeAmount;
          this.firstLoanFeesArray[i].feeAmount = itemDetails.feeAmount;
          console.log('getFeeAmountForFirstLoan itemDetails if****', itemDetails)
        }else{
        this.firstLoanFeesArray.push({ feeCode: itemDetails.feeId, feeAmount: itemDetails.feeAmount });
        console.log('getFeeAmountForFirstLoan itemDetails else if****', itemDetails)
        this.getTotalAmount();
      }
    }
    }
    console.log('this.firstLoanFeesArray', this.firstLoanFeesArray)
    this.getTotalAmount();

    }

  getFeeAmountForSecondLoan(i: number) {
    console.log('this.phonpayForm.controls value[i]', this.phonpayForm.controls['otherFeeList1'].value, i)
    let itemDetails = this.phonpayForm.controls['otherFeeList1'].value[i];
    if ((itemDetails.feeName === 'Other Fee' || itemDetails.feeName === 'Corporate Advance') && !this.isStopFileForSecondLoan) {
      this.phonpayForm.get('paymentAdviceNote1').setValidators([Validators.required]);
      this.isOtherFeesSelected1 = true;
      this.isAdviceTypeClicked1 = true;
      this.paymentAdviceValue1 = 'Cashiering';
    }
    console.log('getFeeAmountForSecondLoan itemDetails****', itemDetails, this.secondLoanFeesArray.some((item) => item.id == itemDetails.id));
    let feeAmount1 = itemDetails.feeAmount1;
    if(feeAmount1 == undefined || feeAmount1 == ''){
      this.feeAmount1 = true;
      this.phonpayForm.controls['feeValue1'].disable();
    }else if(feeAmount1 !== undefined || feeAmount1 != ''){
      this.feeAmount1 = false;
      this.phonpayForm.controls['feeValue1'].enable();
    }
    if (itemDetails.id > 0) {
      if (!this.secondLoanFeesArray.some((item) => item.id == itemDetails.id)) {
        this.secondLoanFeesArray.push({ id: itemDetails.id, feeCode: itemDetails.feeId, feeAmount: itemDetails.feeAmount1 });
        this.getTotalAmount();
      } else {
        let itemIndex = this.secondLoanFeesArray.findIndex(item => item.id == itemDetails.id);
        itemDetails.feeAmount1 = feeAmount1;
        this.secondLoanFeesArray[itemIndex].feeAmount = itemDetails.feeAmount1;
        console.log('getFeeAmountForSecondLoan itemDetails****', itemDetails)
        this.getTotalAmount();
      }
    } else {
      if (feeAmount1 !== '') {
        if(this.secondLoanFeesArray[i]){
          itemDetails.feeAmount1 = feeAmount1;
          this.secondLoanFeesArray[i].feeAmount = itemDetails.feeAmount1;
       }else{
        this.secondLoanFeesArray.push({ feeCode: itemDetails.feeId, feeAmount: itemDetails.feeAmount1 });
        console.log('getFeeAmountForSecondLoan itemDetails else if****', itemDetails)
        this.getTotalAmount();
      }
    }
    }
    console.log('this.secondLoanFeesArray', this.secondLoanFeesArray)
    this.getTotalAmount();
  }

  getTotalAmountIncludingFees(feeAmount: number) {
    this.sumOfAmount = (+this.sumOfAmount) + (+feeAmount || 0);
    this.sumOfAmount = parseFloat(this.sumOfAmount).toFixed(2);
  }

  getTotalAmountIncludingFeesForSecondLoan(feeAmount: number) {
    this.sumOfAmount = (+this.sumOfAmount) + (+feeAmount || 0);
    this.sumOfAmount = parseFloat(this.sumOfAmount).toFixed(2);
  }
  stopFile = null
  adviceSelected: boolean;

  stopFileInfo(event, value: string) {
    console.log('email list ****', this.phonpayForm['controls'].myCheckboxGroup['controls']);
    console.log('stopFileInfo method called' + value)
    if (event.target.checked) {
      if (value === 'clearAdvice') {

        this.adviceSelected = false;
        this.isAdviceTypeClicked = false;
        this.paymentAdviceValue = '';
        this.phonpayForm.controls['paymentAdviceNote'].setValue('');
      } else {
        this.adviceSelected = true;
        this.isAdviceTypeClicked = true;
        this.paymentAdviceValue = value;
      }

    } else {
      this.stopFile = null;
    }
  }

  stopFileInfoForSecondLoan(event, value: string) {
    console.log('stopFileInfoForSecondLoan method called')
    if (event.target.checked) {
      if (value === 'clearAdvice1') {
        this.isAdviceTypeClicked1 = false;
        this.paymentAdviceValue1 = '';
        this.phonpayForm.controls['paymentAdviceNote1'].setValue('');
      } else {
        this.isAdviceTypeClicked1 = true;
        this.paymentAdviceValue1 = value;
      }
    } else {
      this.stopFile = null;
    }
  }

  getPaymentAmountForFirstLoan() {
    let element = document.getElementById('otherPayment1');
    element.focus();
  }
  getPaymentAmountForSecondLoan() {
    let element = document.getElementById('otherPayment2');
    element.focus();
  }

  get f() { return this.phonpayForm.controls; }

  isSaving: boolean = false;

  getAccountType(event) {
    console.log('getAccountType() method called', event.target.value)
    if (event.target.value === 'Saving') {
      this.isSaving = true;
    } else {
      this.isSaving = false;
    }
  }
  showCancelPaymentPopUp = false;

  cancelPopup() {
    this.appComp.showProgressBar(true);
    if(this.phonepayPayment.schedulePaymentList[0] && this.phonepayPayment.schedulePaymentList[0].paymentAdvice!==null && this.phonepayPayment.schedulePaymentList[0].paymentAdvice.completed
      ||this.phonepayPayment.schedulePaymentList[1] && this.phonepayPayment.schedulePaymentList[1].paymentAdvice!==null && this.phonepayPayment.schedulePaymentList[1].paymentAdvice.completed){
      this.schedulePaymentAlertMessageForBatchPayment = true;
      this.showCancelPaymentPopUp = true;
      if (this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked) {
      this.showSchedulePaymentAlertMessageForBatchPayment("The payment for loan"+this.loanInfoFirst.loanNumber+" is in a Black Knight batch. The person who entered the batch must remove the payment. Would you like to proceed?", null, true);
      }else if(!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked){
        this.showSchedulePaymentAlertMessageForBatchPayment("The payment for loan"+this.loanInfoSecond.loanNumber+"is in a Black Knight batch. The person who entered the batch must remove the payment. Would you like to proceed?", null, true);
      }else{
        this.showSchedulePaymentAlertMessageForBatchPayment("The payment for loan"+this.loanInfoSecond.loanNumber+","+this.loanInfoSecond.loanNumber+"are in a Black Knight batch. The person who entered the batch must remove the payment. Would you like to proceed?", null, true);
      }
    }else {
      this.schedulePaymentAlertMessage = true;
      this.showCancelPaymentPopUp = true;
      this.showSchedulePaymentAlertMessage('Are you sure you want to cancel the Transaction?', null, true);
    }
  }

  checkBankingInfoFields(){

    this.isBankInfoEmpty = false;
    this.accDisplayMsg = true;
  if((this.phonpayForm.get('payorName').value !='' && this.phonpayForm.get('payorName').value != undefined) &&
    (this.phonpayForm.get('payorAddress').value !='' && this.phonpayForm.get('payorAddress').value != undefined) &&
    (this.phonpayForm.get('payorCity').value !='' && this.phonpayForm.get('payorCity').value !=undefined) &&
    (this.phonpayForm.get('payorState').value !='' && this.phonpayForm.get('payorState').value !=undefined) &&
    (this.phonpayForm.get('payorZip').value !='' && this.phonpayForm.get('payorZip').value !=undefined) &&
    (this.phonpayForm.get('accountNumber').value !='' && this.phonpayForm.get('accountNumber').value !== undefined && this.phonpayForm.get('accountNumber').value !== null) &&
    (this.phonpayForm.get('routingNumber').value !='' && this.phonpayForm.get('routingNumber').value !== undefined) &&
    (this.borrowerPhone !==undefined)){
      this.isBankInfoEmpty = true;
     }else{
      this.isBankInfoEmpty = false;
    }
    this.checkedBorrowerType=true;
    console.log("payor ::: "+this.phonpayForm.get('payorName').value);
   //alert(this.payorName+" , "+"payorAddress : "+this.payorAddress+" , "+"payorCity : "+this.payorCity+" , "+"payorState : "+this.payorState+" , "+"payorZip : "+this.payorZip+" , "+"telephone : "+this.telephone+" , "+"accountNumber : "+this.accountNumber);
}


checkBankingInfoFieldsWithMountainAmerica(accountnum:string){

  this.isBankInfoEmpty = false;
  if(accountnum.length>0){
        this.accountnumLen = accountnum.length;
        if(accountnum.length == 12){
          this.accDisplayMsg = true;
        }else{
          this.accDisplayMsg = false;
        }

    }else{

      this.accountnumLen = accountnum.length;
    }


if((this.phonpayForm.get('payorName').value !='' && this.phonpayForm.get('payorName').value != undefined) &&
  (this.phonpayForm.get('payorAddress').value !='' && this.phonpayForm.get('payorAddress').value != undefined) &&
  (this.phonpayForm.get('payorCity').value !='' && this.phonpayForm.get('payorCity').value !=undefined) &&
  (this.phonpayForm.get('payorState').value !='' && this.phonpayForm.get('payorState').value !=undefined) &&
  (this.phonpayForm.get('payorZip').value !='' && this.phonpayForm.get('payorZip').value !=undefined) &&
  (this.phonpayForm.get('accountNumber').value !='' && this.phonpayForm.get('accountNumber').value !== undefined && this.phonpayForm.get('accountNumber').value !== null) &&
  (this.phonpayForm.get('routingNumber').value !='' && this.phonpayForm.get('routingNumber').value !== undefined) &&
  (this.borrowerPhone !==undefined)){
    this.isBankInfoEmpty = true;
   }else{
    this.isBankInfoEmpty = false;
  }
  this.checkedBorrowerType=true;
  console.log("payor ::: "+this.phonpayForm.get('payorName').value);
 //alert(this.payorName+" , "+"payorAddress : "+this.payorAddress+" , "+"payorCity : "+this.payorCity+" , "+"payorState : "+this.payorState+" , "+"payorZip : "+this.payorZip+" , "+"telephone : "+this.telephone+" , "+"accountNumber : "+this.accountNumber);
}


  cancelPayment() {
    this.isCancelPayment = true;
    this.paymentIdList = [];
    if (this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
      this.phonepayPayment.schedulePaymentList.forEach((data, index) => {
        this.paymentIdList.push(data.paymentId.toString());
      });
    } else if (this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked) {
      this.paymentIdList.push(this.phonepayPayment.schedulePaymentList[0].paymentId.toString());
    } else if (!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
      if (this.phonepayPayment.schedulePaymentList.length === 1) {
        this.paymentIdList.push(this.phonepayPayment.schedulePaymentList[0].paymentId.toString());
      } else if (this.phonepayPayment.schedulePaymentList.length > 1) {
        this.paymentIdList.push(this.phonepayPayment.schedulePaymentList[1].paymentId.toString());
      }
    }
    console.log('this.paymentIdList *****', this.paymentIdList);
    this.cancelPaymentService.cancelPayment(this.paymentIdList, this.phonpayForm.get('enteredBy').value).subscribe(cancelPaymentResult => {
      this.cancelPaymentRes = cancelPaymentResult;
      if (this.cancelPaymentRes.isSuccessful) {

        if (this.isRequestFromPaymentScreen === 'true') {
          console.log('From PaymentScreen' );
          if (this.userDetails.authorities === 'ServicingAdmin') {
            this.router.navigate(['/app-admin-dashboard'], { replaceUrl: true });
            if (this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
              this.appComp.showSuccessMessage(this.cancelPaymentRes.message + ' for loan numbers ' + this.loanNumbers[0] + ', ' + this.loanNumbers[1], null, false);
            }else if(this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked){
              this.appComp.showSuccessMessage(this.cancelPaymentRes.message + ' for loan numbers ' + this.loanNumbers[0], null, false);
            }else if(!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked){
              this.appComp.showSuccessMessage(this.cancelPaymentRes.message + ' for loan numbers ' + this.loanNumbers[1], null, false);
            }
            this.phonpayForm.reset();
            localStorage.clear();
          } else {
            this.router.navigate(['/check-request'], { replaceUrl: true });
            if (this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
              this.appComp.showSuccessMessage(this.cancelPaymentRes.message + ' for loan numbers ' + this.loanNumbers[0] + ', ' + this.loanNumbers[1], null, false);
            }else if(this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked){
              this.appComp.showSuccessMessage(this.cancelPaymentRes.message + ' for loan numbers ' + this.loanNumbers[0], null, false);
            }else if(!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked){
              this.appComp.showSuccessMessage(this.cancelPaymentRes.message + ' for loan numbers ' + this.loanNumbers[1], null, false);
            }
            this.phonpayForm.reset();
            localStorage.clear();
          }
        } else {
          this.router.navigate(['/app-payments-in-process'], { replaceUrl: true });
          if (this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked) {
            this.appComp.showSuccessMessage(this.cancelPaymentRes.message + ' for loan numbers ' + this.loanNumbers[0] + ', ' + this.loanNumbers[1], null, false);
          }else if(this.isLoanInfoFirstChecked && !this.isLoanInfoSecondChecked){
            this.appComp.showSuccessMessage(this.cancelPaymentRes.message + ' for loan numbers ' + this.loanNumbers[0], null, false);
          }else if(!this.isLoanInfoFirstChecked && this.isLoanInfoSecondChecked){
            this.appComp.showSuccessMessage(this.cancelPaymentRes.message + ' for loan numbers ' + this.loanNumbers[1], null, false);
          }
          this.phonpayForm.reset();
          localStorage.clear();
        }
      } else {
        this.appComp.showErrorMessage(this.cancelPaymentRes.message, null, false);
      }
    });
  }

  validateStateInpuValue(inpuValue){
    if(inpuValue){
        if(String(inpuValue).match(/^[a-zA-Z]+$/g)){
            this.inputStateValidate = true;
          }else{
             this.inputStateValidate = false;
          }
      }
  }
  validateCityInpuValue(inpuValue){
    if(inpuValue){
        if(String(inpuValue).match(/^[a-zA-Z ]+$/g)){
           this.inputCityValidate = true;
        }else{
            this.inputCityValidate = false;
        }
      }
  }

  // validateZipInpuValue(inpuValue){
  //   if(inpuValue){
  //       if(String(inpuValue).match(/^[0-9]*$/g)){
  //          this.inputZipValidate = true;
  //       }else{
  //           this.inputZipValidate = false;
  //       }
  //     }
  // }

}

function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
  return function validate(formGroup: FormGroup) {
    let checked = 0;
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireOneCheckboxToBeChecked: true,
      };
    }
    return null;
  };
}



