import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ResearchPaymentService } from '../service/research-payment.service';
import { GetResearchPaymentResponse } from '../model/get-research-payment-response';
import { GetResearchPaymentDto } from '../model/get-research-payment-dto';
import { PhonepayPaymentsService } from '../service/phonepay-payments.service';
import { BankingInfo } from '../model/banking-info';
import { PhonePayFeeDto } from '../model/phone-pay-fee-dto';
import { OtherFeeDto } from '../model/other-fee-dto';

@Component({
  selector: 'app-research-payment-details',
  templateUrl: './research-payment-details.component.html',
  styleUrls: ['./research-payment-details.component.css']
})
export class ResearchPaymentDetailsComponent implements OnInit {

  userDetails: any;
  researchDetailForm: FormGroup;
  getResearchPaymentDto = new GetResearchPaymentDto();
  emailList: string[] = new Array;
  bankingInfo = new BankingInfo();
  firstDigitOfLoanNumber = 0;
  feeSummary: OtherFeeDto[];
  updateFeeForFirstLoan: boolean;
  updateFeeForSecondLoan: boolean;
  nsfFirst: any;
  nsfSecond: any;
  lateFee1: any;
  lateFee2: any;
  regPayment1: any;
  regPayment2: any;
  isStopFileForFirstLoan: boolean;
  isStopFileForSecondLoan: boolean;
  isAdviceTypeClicked1: boolean;
  isAdviceTypeClicked: boolean;
  paymentAdviceValue: string;
  paymentAdviceValue1: string;
  stopFile = null;
  phonePayServicefee: any;
  adviceSelected: boolean;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private appComp: AppComponent, private researchPaymentService: ResearchPaymentService,
    private phonepayPaymentsService: PhonepayPaymentsService) { }

  ngOnInit() {
    this.researchDetailForm = this.formBuilder.group({
      feeValue: new FormControl(),
      feeValue1: new FormControl(),
      payorName: new FormControl(),
      payorAddress: new FormControl(),
      enteredBy: new FormControl(),
      accountNumber: new FormControl(),
      routingNumber: ['', [Validators.required, Validators.minLength(9)]],
      monthlyPayment1: new FormControl(),
      checkBoxValue: new FormControl(),
      checkBoxValue2: new FormControl(),
      monthlyPayment2: new FormControl(),
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
        email: new FormControl(),
        email1: new FormControl(''),
        email2: new FormControl(''),
        emailCheckbox: new FormControl(false),
        emailCheckbox1: new FormControl(false),
        emailCheckbox2: new FormControl(false),
        printCheckbox3: new FormControl(false),
      }),
      otherFeeList: this.formBuilder.array([]),
      otherFeeList1: this.formBuilder.array([])
    });
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    this.getResearchPaymentDto = JSON.parse(localStorage.getItem('researchPaymentDetails'));
    console.log('This is getResearchPaymentDto : ', this.getResearchPaymentDto);

    this.phonepayPaymentsService.bankingInfo(this.getResearchPaymentDto.paymentList[0].routingNumber).subscribe(
      bankingInfo => {
        this.bankingInfo = bankingInfo
      }
    );
    this.phonePayServicefee = 10;
    this.phonePayServicefee = parseFloat(this.phonePayServicefee).toFixed(2);
    if (this.getResearchPaymentDto.paymentList[0].emails) {
      var emails = this.getResearchPaymentDto.paymentList[0].emails;
      emails = emails.replace(/;\s*$/, "");
      this.emailList = emails.split(';');
      if (this.emailList.length === 1) {
        this.researchDetailForm.controls.myCheckboxGroup.get('email').setValue(this.emailList[0]);
        this.researchDetailForm.controls.myCheckboxGroup.get('emailCheckbox').setValue(true);
      } else if (this.emailList.length > 1) {
        this.researchDetailForm.controls.myCheckboxGroup.get('email').setValue(this.emailList[0]);
        this.researchDetailForm.controls.myCheckboxGroup.get('email1').setValue(this.emailList[1]);
        this.researchDetailForm.controls.myCheckboxGroup.get('emailCheckbox').setValue(true);
        this.researchDetailForm.controls.myCheckboxGroup.get('emailCheckbox1').setValue(true);
        if (this.emailList.length === 3 && this.emailList[2] != '') {
          this.researchDetailForm.controls.myCheckboxGroup.get('email').setValue(this.emailList[0]);
          this.researchDetailForm.controls.myCheckboxGroup.get('email1').setValue(this.emailList[1]);
          this.researchDetailForm.controls.myCheckboxGroup.get('emailCheckbox').setValue(true);
          this.researchDetailForm.controls.myCheckboxGroup.get('emailCheckbox1').setValue(true);
          this.researchDetailForm.controls.myCheckboxGroup.get('email2').setValue(this.emailList[2]);
          this.researchDetailForm.controls.myCheckboxGroup.get('emailCheckbox2').setValue(true);
        }
      }
    }
    
    if(this.getResearchPaymentDto.paymentList[0].otherFeeList!=null && this.getResearchPaymentDto.paymentList[0].otherFeeList.length){
      this.feeSummary = this.getResearchPaymentDto.paymentList[0].otherFeeList.filter(fees => fees.feeName !== 'PhonePay Fee');
    }

    if (this.getResearchPaymentDto.paymentList.length === 1) {
      this.firstDigitOfLoanNumber = parseInt(this.getResearchPaymentDto.paymentList[0].loanNumber.toString().substring(0, 1));
      if (this.firstDigitOfLoanNumber === 9) {
        if (this.getResearchPaymentDto.paymentList[0].paymentAdvice) {
          this.isAdviceTypeClicked1 = true;
          this.researchDetailForm.get('paymentAdviceNote1').setValidators([Validators.required]);
          switch (this.getResearchPaymentDto.paymentList[0].paymentAdvice.adviceId) {
            case 1: {
              this.paymentAdviceValue1 = 'Cashiering';
              this.researchDetailForm.get('paymentAdviceNote1').setValue(this.getResearchPaymentDto.paymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            case 2: {
              this.isStopFileForSecondLoan = true;
              this.paymentAdviceValue1 = 'Bankruptcy';
              this.researchDetailForm.get('paymentAdviceNote1').setValue(this.getResearchPaymentDto.paymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            case 3: {
              this.isStopFileForSecondLoan = true;
              this.paymentAdviceValue1 = 'Collections';
              this.researchDetailForm.get('paymentAdviceNote1').setValue(this.getResearchPaymentDto.paymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            case 4: {
              this.isStopFileForSecondLoan = true;
              this.paymentAdviceValue1 = 'Loss Mit';
              this.researchDetailForm.get('paymentAdviceNote1').setValue(this.getResearchPaymentDto.paymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            default: {
              //statements; 
              break;
            }
          }
        }
        this.researchDetailForm.get('date').setValue(this.getResearchPaymentDto.paymentList[0].scheduledDate);
        this.researchDetailForm.get('checkBoxValue2').setValue(true);
        console.log('********* checkBoxValue2', this.researchDetailForm.get('checkBoxValue2').value);
        } else {
        if (this.getResearchPaymentDto.paymentList[0].paymentAdvice) {
          this.isAdviceTypeClicked = true;
          this.researchDetailForm.get('paymentAdviceNote').setValidators([Validators.required]);
          switch (this.getResearchPaymentDto.paymentList[0].paymentAdvice.adviceId) {
            case 1: {
              this.paymentAdviceValue = 'Cashiering';
              this.researchDetailForm.get('paymentAdviceNote').setValue(this.getResearchPaymentDto.paymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            case 2: {
              this.isStopFileForFirstLoan = true;
              this.paymentAdviceValue = 'Bankruptcy';
              this.researchDetailForm.get('paymentAdviceNote').setValue(this.getResearchPaymentDto.paymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            case 3: {
              this.isStopFileForFirstLoan = true;
              this.paymentAdviceValue = 'Collections';
              this.researchDetailForm.get('paymentAdviceNote').setValue(this.getResearchPaymentDto.paymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            case 4: {
              this.isStopFileForFirstLoan = true;
              this.paymentAdviceValue = 'Loss Mit';
              this.researchDetailForm.get('paymentAdviceNote').setValue(this.getResearchPaymentDto.paymentList[0].paymentAdvice.adviceNotes);
              break;
            }
            default: {
              //statements; 
              break;
            }
          }
        }
        this.researchDetailForm.get('checkBoxValue').setValue(true);
      }
  }

   }
}
