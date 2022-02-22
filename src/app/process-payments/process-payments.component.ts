import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProcessPaymentsListService } from '../service/get-process-payments-list.service';
import { ProcessPaymentsResponse } from '../model/process-payments-response';
import { ProcessingPaymentsResponse } from '../model/processing-payments-response';
import { GetPaymentBatchResponse } from '../model/get-payment-batch-response';
import { PaymentBatchService } from '../service/payment-batch.service';
import { formatDate } from '@angular/common';
import { PaymentsInProcessService } from '../service/payments-in-process.service';
import { PaymentsInProcessResponse } from '../model/payments-in-process-response';
import { PaymentsInProcessDto } from '../model/payments-in-process-dto';
import { ProcessPaymentsNotificationResponse } from '../model/process-payments-notification-response';
import { GetProcessPaymentsListDto } from '../model/get-process-payments-list-dto';
import { noneOf } from '@rxweb/reactive-form-validators';
import { FailedEmailsDto } from '../model/failed-emails-dto';
import { FailedPrintsDto } from '../model/failed-prints-dto';

@Component({
  selector: 'app-process-payments',
  templateUrl: './process-payments.component.html',
  styleUrls: ['./process-payments.component.css']
})
export class ProcessPaymentsComponent implements OnInit {

  userDetails: any;
  processPaymentRes = new ProcessPaymentsResponse();
  paymentBatchRes = new GetPaymentBatchResponse();
  paymnetProcessingRes: ProcessingPaymentsResponse;
  disableProcessPayment: boolean;
  showFailedPaymentsClicked = false;
  processingFailed: boolean;
  today = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  totalAdvicePaymentCount = 0;
  totalAdvicePayment = '0.00';
  totalNonAdvicePaymentCount = 0;
  totalNonAdvicePayment = '0.00';
  totalCount = 0;
  totalPayment = '0.00';
  totalPendingAdvicePayment = '0.00';
  totalPendingAdvicePaymentCount = 0;
  totalProcessAdvicePayment = '0.00';
  totalProcessAdvicePaymentCount = 0;
  totalCanceledAdvicePayment = '0.00'
  totalCanceledAdvicePaymentCount= 0;
  disableProcessPaymentBtn: boolean;
  paymentInProcessResponse = new PaymentsInProcessResponse();
  paymentInProcessList: PaymentsInProcessDto[];
  processPaymentNotificationRes = new ProcessPaymentsNotificationResponse();
  processPaymentLetterNotificationRes = new ProcessPaymentsNotificationResponse();
  emailFailedToSend = 0;
	 emailSentSuccessfully = 0;
	 letterFailedToPrint = 0;
   totalEmail=0;
   totalLetter = 0;
	 letterPrintedSuccessfully = 0;
   processPaymentResforNoti = false;
   isPaymentProcessing = false;
   isNotificationsProcessingHeader = false;
   isNotificationsProcessing = false;
   isNoContentInNotification = false;
   processPaymentNotificationMsg = "";
   processPaymentLetterNotificationMsg = "";
   sendEmailFailed = false;
   printLetterFailed = false;
   processPaymentErrorMsg = "";
   btnclick = "none";
   viewFailedNotification = false;
   showViewFailedNotificationBtn = true;
   i = Array
   count : number = this.emailFailedToSend;
   j = Array
   countP : number = this.letterFailedToPrint;
  emailFailedList: FailedEmailsDto[] =[];
  printFailedList: FailedPrintsDto[] =[];
  processPaymentsListForFailedEmais:GetProcessPaymentsListDto[]=[];
  processPaymentsListFailedEmais:GetProcessPaymentsListDto[]=[];
  updatedForNotiForFailedEmail :boolean;
	successfulIdsForFailedEmail : number[];
  processPaymentsListForFailedPrints:GetProcessPaymentsListDto[]=[];
  processPaymentsListFailedPrints:GetProcessPaymentsListDto[]=[];
  updatedForNotiForFailedPrints :boolean;
	successfulIdsForFailedPrints : number[];
  processPaymentsDto: GetProcessPaymentsListDto;
  disableResendEmail = false;
  disableResendPrint = false;
  emailPayerNameArr : string[]=[];
  letterPayerNameArr : string[]=[];
  confirmationEmail = null;
  firstDigitOfLoanNumber = 0;
  isSentPrintNotification = true;
  loanNumberList : string[]=[];
  processPaymentsListForEmail : GetProcessPaymentsListDto[]=[];
  processPaymentsListForLetter : GetProcessPaymentsListDto[]=[];
  processPaymentsListForEmailAndLetters : GetProcessPaymentsListDto[]=[];
  countEmailList =0;
  countLetterList =0;
  emailListFlag =false;
  letterListFlag = false;
  failedPrintCount = 0;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private paymentsInProcessService: PaymentsInProcessService, private appComp: AppComponent, private processPaymentsService: GetProcessPaymentsListService, private paymentBatchService: PaymentBatchService) { }
  ngOnInit() {
    this.countEmailList =0;
    this.countLetterList =0;
    this.failedPrintCount = 0;
    this.disableResendEmail =  true;
    this.disableResendPrint = true;
    this.isNotificationsProcessing = false;
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    console.log('paymnetProcessingRes  ', this.paymnetProcessingRes)
    this.appComp.showProgressBar(true);
    this.paymentBatchService.getPaymentBatchDetails().subscribe(
      paymentBatchRes =>{
        this.paymentBatchRes = paymentBatchRes;
        console.log('paymnetProcessingRes  ', this.paymnetProcessingRes)
        if(this.paymentBatchRes.isSuccessful){
          this.paymnetProcessingRes = new ProcessingPaymentsResponse();
          this.paymnetProcessingRes = this.paymentBatchRes.ppsResponse;
          console.log('paymnetProcessingRes  ', this.paymnetProcessingRes)
          this.disableProcessPayment = true;
          this.appComp.showSuccessMessage(this.paymentBatchRes.message, null, false);
        }else{
          this.appComp.showProgressBar(false);
        }
      }
    )
 this.paymentsInProcessService.getPaymentsInProcessList().subscribe(
      paymentInProcessResponse => {
        this.paymentInProcessResponse = paymentInProcessResponse;
        if (this.paymentInProcessResponse.isSuccessful) {
          this.appComp.showProgressBar(false);
          this.paymentInProcessList = this.paymentInProcessResponse.paymentInProcessList;
          this.paymentInProcessList.forEach(paymentInProcess => {
           console.log("paymentInProcess : "+paymentInProcess);
            if (paymentInProcess.advice && !paymentInProcess.adviceCompleted && !paymentInProcess.cancelled) {
              this.totalPendingAdvicePayment = (+this.totalPendingAdvicePayment + (+paymentInProcess.totalPayment * 1 || 0)).toFixed(2);
              this.totalPendingAdvicePaymentCount++;
            }else if(paymentInProcess.advice && paymentInProcess.adviceCompleted && !paymentInProcess.cancelled){
              this.totalProcessAdvicePayment = (+this.totalProcessAdvicePayment + (+paymentInProcess.totalPayment * 1 || 0)).toFixed(2);
              this.totalProcessAdvicePaymentCount++;
            }else if((paymentInProcess.advice && paymentInProcess.adviceCompleted && paymentInProcess.cancelled)){
              this.totalCanceledAdvicePayment = (+this.totalCanceledAdvicePayment + (+paymentInProcess.totalPayment * 1 || 0)).toFixed(2);
              this.totalCanceledAdvicePaymentCount++;
            }
             else {
              this.totalNonAdvicePayment = (+this.totalNonAdvicePayment + (+paymentInProcess.totalPayment * 1 || 0)).toFixed(2);
              this.totalNonAdvicePaymentCount++;
            }
          });
         this.totalPayment = (+this.totalPayment + (+this.totalPendingAdvicePayment * 1 || 0)+ (+this.totalProcessAdvicePayment * 1 || 0)+ (+this.totalCanceledAdvicePayment * 1 || 0) + (+this.totalNonAdvicePayment * 1 || 0)).toFixed(2);
         if(this.totalPendingAdvicePaymentCount==0 && this.totalCanceledAdvicePaymentCount==0){
          this.disableProcessPaymentBtn = false;
         }else{
          this.disableProcessPaymentBtn = true;
         }

       }
        console.log('*******', this.paymentInProcessList)
      }
    )

}

onClick(){
  this.appComp.showProgressBarForPaymentProcessing(true);
  this.isPaymentProcessing = false;

  this.processPaymentsService.getProcessPaymentsList().subscribe(
    processPaymentResponse => {
      this.processPaymentRes = processPaymentResponse;
      if (this.processPaymentRes.isSuccessful) {

       this.paymnetProcessingRes = new ProcessingPaymentsResponse();
        console.log('this.processPaymentRes',  this.processPaymentRes.ppsResponse);
        this.disableProcessPayment = true;
        this.paymnetProcessingRes = this.processPaymentRes.ppsResponse;
        this.isPaymentProcessing = true;
        this.appComp.showProgressBarForPaymentProcessing(false);
      this.isNotificationsProcessingHeader = true;
        console.log('Emails for processing',  this.processPaymentRes.processPaymentsList);
       this.getEmailNotification(this.processPaymentRes.updatedForNoti,this.processPaymentRes.processPaymentsList,this.processPaymentRes.successfulIds);
  	   }else{
        this.processingFailed = true;
        this.processPaymentErrorMsg= this.processPaymentRes.message;
        this.appComp.showErrorMessage(this.processPaymentRes.message, null, false);
      }
    });
}

getEmailNotification(updatedForNoti :boolean, processPaymentsList:GetProcessPaymentsListDto[],successfulIds:number[]){
  this.appComp.showProgressBarForPaymentNotification(true);
  console.log('ProcessPaymentsList for processing',  processPaymentsList);
  this.processPaymentsService.getProcessPaymentsNotificationList(updatedForNoti,processPaymentsList,successfulIds).subscribe(
    ProcessPaymentsNotificationResponse => {
      this.processPaymentNotificationRes = ProcessPaymentsNotificationResponse;
      if (this.processPaymentNotificationRes.isSuccessful) {
       console.log('this.emailSentSuccessfully >>>>>>>',  this.emailSentSuccessfully );
       console.log('failedEmailsList >>>>>>>***********',  this.processPaymentNotificationRes.failedEmailsList);
       this.disableProcessPayment = true;
      this.emailFailedToSend = this.processPaymentNotificationRes.emailFailedToSend;
      this.emailSentSuccessfully = this.processPaymentNotificationRes.emailSentSuccessfully;
     if(this.processPaymentNotificationRes.failedEmailsListDtos!==null){

      this.processPaymentNotificationRes.failedEmailsList.forEach(failedEmailsList => {
        failedEmailsList.forEach(failedEmailsListDto => {
      processPaymentsList.forEach(processPaymentsList=>{
        if(processPaymentsList.loanNumber===failedEmailsListDto.loanNumber)
         {
           this.processPaymentsListForFailedPrints.push(processPaymentsList);
           console.log("payerName : "+failedEmailsListDto.payerName);
           console.log("Check payerName : "+this.emailPayerNameArr.some(x => x === failedEmailsListDto.payerName));
           if(!(this.emailPayerNameArr.some(x => x === failedEmailsListDto.payerName))){
           this.emailPayerNameArr.push(failedEmailsList[0].payerName);
           }
         }
       });
       this.updatedForNotiForFailedPrints = updatedForNoti;
       this.successfulIdsForFailedPrints = successfulIds;
});
    });


  }
     this.totalEmail = (this.emailFailedToSend+this.emailSentSuccessfully);
     this.isNotificationsProcessingHeader = false;
     this.getLetterNotification(this.processPaymentNotificationRes.updatedForNoti,this.processPaymentNotificationRes.processPaymentsList,this.processPaymentNotificationRes.successfulIds,this.processPaymentsListForFailedPrints);
     }else{

       this.isNoContentInNotification = this.processPaymentNotificationRes.isSuccessful;
       this.sendEmailFailed = true;
       this.processPaymentNotificationMsg=this.processPaymentNotificationRes.message;
       this.isNotificationsProcessingHeader = false;
       this.getLetterNotification(this.processPaymentNotificationRes.updatedForNoti,this.processPaymentNotificationRes.processPaymentsList,this.processPaymentNotificationRes.successfulIds,this.processPaymentsListForFailedPrints);
      }
     this.appComp.showProgressBarForPaymentNotification(false);

   });
  }
getLetterNotification(updatedForNoti :boolean, processPaymentsList:GetProcessPaymentsListDto[],successfulIds:number[],processPaymentsListForFailedPrints:GetProcessPaymentsListDto[]){
  this.appComp.showProgressBarForPaymentNotification(true);
  this.processPaymentsService.getProcessPaymentsLetterNotificationList(updatedForNoti,processPaymentsList,successfulIds,processPaymentsListForFailedPrints).subscribe(
    ProcessPaymentsLetterNotificationResponse => {
      this.processPaymentLetterNotificationRes = ProcessPaymentsLetterNotificationResponse;
      if (this.processPaymentLetterNotificationRes.isSuccessful) {
        console.log('this.processPaymentLetterNotificationRes >>>>>>>',  this.processPaymentLetterNotificationRes);
       console.log('this.emailSentSuccessfully >>>>>>>',  this.processPaymentLetterNotificationRes.isSuccessful);
       console.log('failedPrintsList >>>>>>>***********',  this.processPaymentLetterNotificationRes.failedPrintsListDtos);
       this.disableProcessPayment = true;
      this.letterFailedToPrint= this.processPaymentLetterNotificationRes.letterFailedToPrint;
      this.letterPrintedSuccessfully=this.processPaymentLetterNotificationRes.letterPrintedSuccessfully;
      this.totalLetter = (this.letterFailedToPrint+this.letterPrintedSuccessfully);
      this.isNotificationsProcessingHeader = false;
      console.log("failedPrintsDtos : "+this.processPaymentLetterNotificationRes.failedPrintsListDtos);
      if(this.processPaymentLetterNotificationRes.failedPrintsListDtos!==null){
       this.processPaymentLetterNotificationRes.failedPrintsList.forEach(failedPrintsList => {
          failedPrintsList.forEach(failedPrintsListDto => {
        processPaymentsList.forEach(processPaymentsList=>{
          if(processPaymentsList.loanNumber===failedPrintsListDto.loanNumber)
           {
             this.processPaymentsListForFailedPrints.push(processPaymentsList);
             console.log("payerName : "+failedPrintsListDto.payerName);
           console.log("Check payerName : "+this.emailPayerNameArr.some(x => x === failedPrintsListDto.payerName));
           if(!(this.letterPayerNameArr.some(x => x === failedPrintsListDto.payerName))){
           this.letterPayerNameArr.push(failedPrintsList[0].payerName);
           }
          }
         });
      this.updatedForNotiForFailedPrints = updatedForNoti;
      this.successfulIdsForFailedPrints = successfulIds;

         this.printFailedList.push(failedPrintsListDto);
       });
      });
      }
      this.isNotificationsProcessing = true;
      }else{
        console.log('pradeep test >>>>>>>',  this.processPaymentLetterNotificationRes);
       this.isNoContentInNotification = this.processPaymentLetterNotificationRes.isSuccessful;
       console.log('this.isNoContentInNotification >>>>>>>',  this.isNoContentInNotification);
       this.printLetterFailed = true;
       this.processPaymentLetterNotificationMsg=this.processPaymentLetterNotificationRes.message;
       this.isNotificationsProcessingHeader = false;
       console.log('this.processPaymentLetterNotificationMsg >>>>>>>',  this.processPaymentLetterNotificationMsg);
      }
     this.appComp.showProgressBarForPaymentNotification(false);
   });
  }



showFailedPayments(){
  this.showFailedPaymentsClicked = !this.showFailedPaymentsClicked;
}
showViewFailedNotifications(){

  this.viewFailedNotification = true;
  this.showViewFailedNotificationBtn = false;

}
hideViewFailedNotification(){
  this.viewFailedNotification = false;
  this.showViewFailedNotificationBtn = true;
}

resendFailedEmailNotification(){
  this.disableResendEmail =  false;
  this.emailFailedToSend = 0;



  this.processPaymentsService.getProcessPaymentsNotificationList(this.updatedForNotiForFailedEmail,this.processPaymentsListForFailedEmais,this.successfulIdsForFailedEmail).subscribe(
    ProcessPaymentsNotificationResponse => {
    this.processPaymentNotificationRes = ProcessPaymentsNotificationResponse;
    });
}
resendFailedPrintNotification(){

console.log("processPaymentsListForFailedPrints"+this.processPaymentsListForFailedPrints.length);
this.processPaymentsListForFailedPrints.forEach(shouldSend=>{
if(!shouldSend.sendLetter){
  this.processPaymentsListForFailedPrints[this.failedPrintCount].sendLetter = true;
}
this.failedPrintCount+=1;
});
  this.processPaymentsService.getProcessPaymentsLetterNotificationList(this.updatedForNotiForFailedPrints,this.processPaymentsListForFailedPrints,this.successfulIdsForFailedPrints,this.processPaymentsListForFailedPrints).subscribe(
    ProcessPaymentsLetterNotificationResponse => {
     });
}
}
