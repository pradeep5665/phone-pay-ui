import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { DialogObj } from '../dialogBoxModel';
import { PhonepayPayments } from '../model/phonepay-payments.model';

@Component({
  selector: 'app-admin-check-request-disabled',
  templateUrl: './admin-check-request-disabled.component.html',
  styleUrls: ['./admin-check-request-disabled.component.css']
})
export class AdminCheckRequestDisabledComponent implements OnInit {

  checkPaymentReqForm: FormGroup;
  loanNumber: number;
  failuremessage: string;
  schedulePaymentAlertMessageForResearchPayments: boolean;
  scheduleIncompletePaymentAlertMessageByProcessPayment: boolean;
  scheduleIncompletePaymentAlertMessageByPaymentInProcess: boolean;
  scheduleIncompletePaymentAlertMessage: boolean;
  dialogObj = new DialogObj();
  progressBar: boolean;
  phonepayPayment = new PhonepayPayments();
  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private router: Router,private cdr: ChangeDetectorRef,
     private appComp: AppComponent) { }

  ngOnInit() {
    this.checkPaymentReqForm = this.formBuilder.group({
      loanNumber: ['', Validators.required]
    });
  }
  
  showIncompleteSchedulePaymentCloseAlertMessage(msgContent: string, routerLink: string, isBack: boolean) {
    this.schedulePaymentAlertMessageForResearchPayments = false;
    this.scheduleIncompletePaymentAlertMessageByProcessPayment = false;
    this.scheduleIncompletePaymentAlertMessageByPaymentInProcess = false;
    this.scheduleIncompletePaymentAlertMessage = true;
    this.dialogObj.msgHeader = 'Alert!';
    this.populateMessage(msgContent, routerLink, isBack);
  }

  showIncompleteSchedulePaymentCloseAlertMessageByPaymentsInProcess(msgContent: string, routerLink: string, isBack: boolean) {
    this.schedulePaymentAlertMessageForResearchPayments = false;
    this.scheduleIncompletePaymentAlertMessageByProcessPayment = false;
    this.scheduleIncompletePaymentAlertMessageByPaymentInProcess = true;
    this.scheduleIncompletePaymentAlertMessage = false;
    this.dialogObj.msgHeader = 'Alert!';
    this.populateMessage(msgContent, routerLink, isBack);
  }
  showIncompleteSchedulePaymentCloseAlertMessageByProcessPayment(msgContent: string, routerLink: string, isBack: boolean){
    this.schedulePaymentAlertMessageForResearchPayments = false;
    this.scheduleIncompletePaymentAlertMessageByProcessPayment = true;
    this.scheduleIncompletePaymentAlertMessageByPaymentInProcess = false;
    this.scheduleIncompletePaymentAlertMessage = false;
    this.dialogObj.msgHeader = 'Alert!';
    this.populateMessage(msgContent, routerLink, isBack);
  }

  showIncompleteSchedulePaymentCloseAlertMessageByResearchPayments(msgContent: string, routerLink: string, isBack: boolean){
    this.schedulePaymentAlertMessageForResearchPayments = true;
    this.scheduleIncompletePaymentAlertMessageByProcessPayment = false;
    this.scheduleIncompletePaymentAlertMessageByPaymentInProcess = false;
    this.scheduleIncompletePaymentAlertMessage = false;
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
  goToAdviceList(){
    this.phonepayPayment = JSON.parse(localStorage.getItem('phonepayInfo'));
    if(this.phonepayPayment.schedulePaymentList.length==0){
    this.appComp.showProgressBar(true);
    this.showIncompleteSchedulePaymentCloseAlertMessage('Any changes you made will be lost. Do you wish to continue?', '', true);
    }else{
     this.displayPaymentAdviceList();
    }
  }
  goToPaymentsInProcess(){
    this.phonepayPayment = JSON.parse(localStorage.getItem('phonepayInfo'));
    if(this.phonepayPayment.schedulePaymentList.length==0){
    this.appComp.showProgressBar(true);
    this.showIncompleteSchedulePaymentCloseAlertMessageByPaymentsInProcess('Any changes you made will be lost. Do you wish to continue?', '', true);
    }else{
      this.displayPaymentInProcess();
    }
  }

  goToProcessPayment(){
    this.phonepayPayment = JSON.parse(localStorage.getItem('phonepayInfo'));
    if(this.phonepayPayment.schedulePaymentList.length==0){
    this.appComp.showProgressBar(true);
    this.showIncompleteSchedulePaymentCloseAlertMessageByProcessPayment('Any changes you made will be lost. Do you wish to continue?', '', true);
    }else{
      this.displayProcessPayment();
    }
  }

  goToResearchPayments(){
    this.phonepayPayment = JSON.parse(localStorage.getItem('phonepayInfo'));
    if(this.phonepayPayment.schedulePaymentList.length==0){
    this.appComp.showProgressBar(true);
    this.showIncompleteSchedulePaymentCloseAlertMessageByResearchPayments('Any changes you made will be lost. Do you wish to continue?', '', true);
    }else{
      this.displayResearchPayments();
    }
  }

  displayPaymentAdviceList() {
        this.router.navigate(['/app-admin-payment-advice-list'], { replaceUrl: true });
        this.appComp.showProgressBar(false);
        localStorage.clear();
  }
  displayPaymentInProcess(){
    this.router.navigate(['/app-payments-in-process'], { replaceUrl: true });
    this.appComp.showProgressBar(false);
    localStorage.clear();
  }
  displayProcessPayment(){
    this.router.navigate(['/app-process-payments'], { replaceUrl: true });
    this.appComp.showProgressBar(false);
    localStorage.clear();
  }
  displayResearchPayments(){
    this.router.navigate(['/app-research-payments'], { replaceUrl: true });
    this.appComp.showProgressBar(false);
    localStorage.clear();
  }
  
  closeDialogBox() {
    this.dialogObj.isDialogBox = false;
    if (this.dialogObj.isBack) {
    }
    this.cdr.detectChanges();
    this.appComp.showProgressBar(false);
  }
}
