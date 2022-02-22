import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GetPaymentAdviceListDto } from '../model/get-payment-advice-list-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { GetPaymentAdviceService } from '../service/get-payment-advice.service';
import { UpdatePaymentAdviceResponse } from '../model/update-payment-advice-response';
import { DeletProcessAdvicePaymentReq } from '../model/delet-process-advice-payment-req';
import { DeleteProcessAdvicePaymentRes } from '../model/delete-process-advice-payment-res';
import { AdminPaymentAdviceListComponent } from '../admin-payment-advice-list/admin-payment-advice-list.component';
import { disable } from '@rxweb/reactive-form-validators';
import { DialogObj } from '../dialogBoxModel';

@Component({
  selector: 'app-payment-advise',
  templateUrl: './payment-advise.component.html',
  styleUrls: ['./payment-advise.component.css']
})
export class PaymentAdviseComponent implements OnInit {
  phonepayAdviceForm: FormGroup;
  paymentAdviceDetail: GetPaymentAdviceListDto;
  borrowerName: string;
  coBorrowerName: string;
  totalAmount: number;
  totalOtherFee=0;
  confirmPaymentStatus: boolean;
  updatepaymentAdviceResponse: UpdatePaymentAdviceResponse;
  isAdviceProcessed: boolean;
  userDetails: any;
  batchCode: string;
  payorName: string;
  processedBy: string;
  processedByEmail: string;
  isPaymentBatchCanceled = false;
  paymentBatchCanceledMessage: string;
  isAdviceCheckBoxSelected=false;
  schedulePaymentId :number;
  removedFrom:boolean;
  deletedBy:string;
  indx : string;
  counter = 0;
  myInput : any;
  paymentAdviceList: GetPaymentAdviceListDto[] = new Array;
  updateBatchCodeAlertMessage = true;
  dialogObj = new DialogObj();
  progressBar: boolean;
  adviceLIst = new Array();
  deleteProcessAdvicePaymentRes:DeleteProcessAdvicePaymentRes
  AllupdateBatchCodeAlertMessage = false;
  paymentAdviceCancleBatchList: GetPaymentAdviceListDto[] = new Array;
  paymentAdviceBatchCodeNullList: GetPaymentAdviceListDto[] = new Array;
  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private router: Router,
  private appComp: AppComponent, private updatePaymentAdviceService: GetPaymentAdviceService, private deletProcessAdvicePayment: GetPaymentAdviceService,private cdr: ChangeDetectorRef) {}
  paymentAdviceUnprocessList: GetPaymentAdviceListDto[] = new Array;
  counter1 = 0;
  focusNextBtn=false;
  ngOnInit() {
    console.log("Param ::::>>>>:::: "+this.activatedRoute.snapshot.queryParamMap.getAll)
    this.phonepayAdviceForm = this.formBuilder.group({
      batchCode: ['',[Validators.required, Validators.minLength(3)]],
      deleteBatchCheckbox: new FormControl()
    });

    let adviceType = this.activatedRoute.snapshot.queryParamMap.get('adviceType');

    if(adviceType=='Cashiering'){
       this.indx = this.activatedRoute.snapshot.queryParamMap.get('idx');
       this.paymentAdviceList =  JSON.parse(localStorage.getItem('cashieringAdviceList'));
    this.paymentAdviceDetail=this.paymentAdviceList[this.indx];
    console.log("this?????????.paymentAdviceDetail>>>>>>>>>>> :::: ", this.paymentAdviceDetail);
    JSON.stringify(this.paymentAdviceDetail)
    }
    else if(adviceType=='LossMit' || adviceType=='Loss Mit'){
      this.indx = this.activatedRoute.snapshot.queryParamMap.get('idx');
      this.paymentAdviceList =  JSON.parse(localStorage.getItem('lossMitAdviceList'));
      this.paymentAdviceDetail=this.paymentAdviceList[this.indx];
      console.log("this?????????.paymentAdviceDetail>>>>>>>>>>> :::: ", this.paymentAdviceDetail);
      JSON.stringify(this.paymentAdviceDetail)
    }
    else if(adviceType=='Bankruptcy'){
      this.indx = this.activatedRoute.snapshot.queryParamMap.get('idx');
      this.paymentAdviceList =  JSON.parse(localStorage.getItem('bankruptcyAdviceList'));
      this.paymentAdviceDetail=this.paymentAdviceList[this.indx];
      console.log("this?????????.paymentAdviceDetail>>>>>>>>>>> :::: ", this.paymentAdviceDetail);
      JSON.stringify(this.paymentAdviceDetail)
    }
    else if(adviceType=='Collection'){
      this.indx = this.activatedRoute.snapshot.queryParamMap.get('idx');
      this.paymentAdviceList =  JSON.parse(localStorage.getItem('collectionAdviceList'));
      this.paymentAdviceDetail=this.paymentAdviceList[this.indx];
      console.log("this?????????.paymentAdviceDetail>>>>>>>>>>> :::: ", this.paymentAdviceDetail);
      JSON.stringify(this.paymentAdviceDetail)
    }
    else if(adviceType=='Collections'){
    this.indx = this.activatedRoute.snapshot.queryParamMap.get('idx');
    this.paymentAdviceList =  JSON.parse(localStorage.getItem('collectionAdviceList'));
    this.paymentAdviceDetail=this.paymentAdviceList[this.indx];
    console.log("this?????????.paymentAdviceDetail>>>>>>>>>>> :::: ", this.paymentAdviceDetail);
    JSON.stringify(this.paymentAdviceDetail)
  }
    if(this.paymentAdviceDetail.paymentAdviceStatus && !this.paymentAdviceDetail.dateCalcelled){
    this.isAdviceProcessed = true;
    this.phonepayAdviceForm.controls['batchCode'].setValue(this.paymentAdviceDetail.batchCode);
    console.log('this.isAdviceProcessed', this.isAdviceProcessed)
    }else if(this.paymentAdviceDetail.paymentAdviceStatus && this.paymentAdviceDetail.dateCalcelled){
     this.isPaymentBatchCanceled = true;
     this.phonepayAdviceForm.controls['batchCode'].setValue(this.paymentAdviceDetail.batchCode);
     this.paymentBatchCanceledMessage = 'This payment is CANCELED and must be removed from the Black Knight batch by the person who entered it.'
    }
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    if(this.paymentAdviceDetail.payorType === 'Borrower'){
      this.payorName = this.paymentAdviceDetail.borrowerName + ' ' + this.paymentAdviceDetail.borrowerLastName;
    }else if(this.paymentAdviceDetail.payorType === 'Co-Borrower'){
      this.payorName = this.paymentAdviceDetail.coBorrowerName + ' ' + this.paymentAdviceDetail.coBorrowerLastName;
    } else if(this.paymentAdviceDetail.payorType === 'Other'||this.paymentAdviceDetail.payorType === 'Occupant'){
      this.payorName = this.paymentAdviceDetail.payorName;
    }
    this.borrowerName = this.paymentAdviceDetail.borrowerName + ' ' + this.paymentAdviceDetail.borrowerLastName;
    console.log(this.borrowerName);
    this.coBorrowerName = this.paymentAdviceDetail.coBorrowerName + ' ' + this.paymentAdviceDetail.coBorrowerLastName;
    this.paymentAdviceDetail.otherFeeList.forEach(fees => {
      this.totalOtherFee = this.totalOtherFee + (+fees.feeAmount);
      console.log('this is total amount',this.totalOtherFee);
    })

    this.totalAmount  = this.totalOtherFee;
    console.log(this.coBorrowerName);
    this.paymentAdviceList.forEach(paymentAdviceList1=>{
     if(paymentAdviceList1.dateCalcelled===true || paymentAdviceList1.batchCode===null)
      {
        this.paymentAdviceUnprocessList.push(paymentAdviceList1);
      }
    })
  }


  showNextAdviceInfo() {
    if (this.counter < this.paymentAdviceList.length -1) {
      this.isAdviceCheckBoxSelected = false;
      this.phonepayAdviceForm.get('deleteBatchCheckbox').setValue(false);
      this.counter += 1;
      console.log("NextCounter************",this.counter);
      this.totalAmount=0;
      this.totalOtherFee = 0;
      this.isPaymentBatchCanceled=false;
      this.paymentAdviceDetail=this.paymentAdviceList[this.counter];
      console.log("this?????????.paymentAdviceDetail>>>>>>>>>>> :::: ", this.paymentAdviceDetail);
      JSON.stringify(this.paymentAdviceDetail);
      if(this.paymentAdviceDetail.paymentAdviceStatus && !this.paymentAdviceDetail.dateCalcelled){
        this.isAdviceProcessed = true;
        this.phonepayAdviceForm.controls['batchCode'].setValue(this.paymentAdviceDetail.batchCode);
        console.log('this.isAdviceProcessed', this.isAdviceProcessed)
        }else if(this.paymentAdviceDetail.paymentAdviceStatus && this.paymentAdviceDetail.dateCalcelled){
          this.isPaymentBatchCanceled = true;
         this.phonepayAdviceForm.controls['batchCode'].setValue(this.paymentAdviceDetail.batchCode);
         this.paymentBatchCanceledMessage = 'This payment is CANCELED and must be removed from the Black Knight batch by the person who entered it.'
        }
        this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        if(this.paymentAdviceDetail.payorType === 'Borrower'){
          this.payorName = this.paymentAdviceDetail.borrowerName + ' ' + this.paymentAdviceDetail.borrowerLastName;
        }else if(this.paymentAdviceDetail.payorType === 'Co-Borrower'){
          this.payorName = this.paymentAdviceDetail.coBorrowerName + ' ' + this.paymentAdviceDetail.coBorrowerLastName;
        } else if(this.paymentAdviceDetail.payorType === 'Other'||this.paymentAdviceDetail.payorType === 'Occupant'){
          this.payorName = this.paymentAdviceDetail.payorName;
        }
        this.borrowerName = this.paymentAdviceDetail.borrowerName + ' ' + this.paymentAdviceDetail.borrowerLastName;
        console.log(this.borrowerName);
        this.coBorrowerName = this.paymentAdviceDetail.coBorrowerName + ' ' + this.paymentAdviceDetail.coBorrowerLastName;
        this.paymentAdviceDetail.otherFeeList.forEach(fees => {
          this.totalOtherFee = this.totalOtherFee + (+fees.feeAmount);
          console.log('this is total amount',this.totalOtherFee);
        })

        this.totalAmount  = this.totalOtherFee;

    }else{
     if(this.userDetails.authorities === 'ServicingAdmin'){
         this.router.navigate(['/app-admin-payment-advice-list'], { replaceUrl: true });
    }else{
      this.router.navigate(['/get-payment-advice-list'], { replaceUrl: true });
    }
    }
  }
  showNextUnprocessedAdviceInfo() {
    if (this.counter1 < this.paymentAdviceUnprocessList.length-1) {
      this.isAdviceCheckBoxSelected = false;
      this.phonepayAdviceForm.get('deleteBatchCheckbox').setValue(false);
      this.counter1 += 1;
      console.log("NextCounter************",this.counter1);
      this.totalAmount=0;
      this.totalOtherFee = 0;
      this.isPaymentBatchCanceled=false;
      this.paymentAdviceDetail=this.paymentAdviceUnprocessList[this.counter1];
      console.log("this?????????.paymentAdviceDetail>>>>>>>>>>> :::: ", this.paymentAdviceDetail);
      JSON.stringify(this.paymentAdviceDetail);
      if(this.paymentAdviceDetail.paymentAdviceStatus && !this.paymentAdviceDetail.dateCalcelled){
        this.isAdviceProcessed = true;
        this.phonepayAdviceForm.controls['batchCode'].setValue(this.paymentAdviceDetail.batchCode);
        console.log('this.isAdviceProcessed', this.isAdviceProcessed)
        }else if(this.paymentAdviceDetail.paymentAdviceStatus && this.paymentAdviceDetail.dateCalcelled){
          this.isPaymentBatchCanceled = true;
         this.phonepayAdviceForm.controls['batchCode'].setValue(this.paymentAdviceDetail.batchCode);
         this.paymentBatchCanceledMessage = 'This payment is CANCELED and must be removed from the Black Knight batch by the person who entered it.'
        }
        this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        if(this.paymentAdviceDetail.payorType === 'Borrower'){
          this.payorName = this.paymentAdviceDetail.borrowerName + ' ' + this.paymentAdviceDetail.borrowerLastName;
        }else if(this.paymentAdviceDetail.payorType === 'Co-Borrower'){
          this.payorName = this.paymentAdviceDetail.coBorrowerName + ' ' + this.paymentAdviceDetail.coBorrowerLastName;
        } else if(this.paymentAdviceDetail.payorType === 'Other'||this.paymentAdviceDetail.payorType === 'Occupant'){
          this.payorName = this.paymentAdviceDetail.payorName;
        }
        this.borrowerName = this.paymentAdviceDetail.borrowerName + ' ' + this.paymentAdviceDetail.borrowerLastName;
        console.log(this.borrowerName);
        this.coBorrowerName = this.paymentAdviceDetail.coBorrowerName + ' ' + this.paymentAdviceDetail.coBorrowerLastName;
        this.paymentAdviceDetail.otherFeeList.forEach(fees => {
          this.totalOtherFee = this.totalOtherFee + (+fees.feeAmount);
          console.log('this is total amount',this.totalOtherFee);
        })

        this.totalAmount  = this.totalOtherFee;
        this.dialogObj.isDialogBox = false;

        if (this.dialogObj.isBack) {
        } else if (this.dialogObj.routeUrl) {
          this.router.navigate([this.dialogObj.routeUrl]);
        }
        if(this.paymentAdviceDetail.batchCode==null){
          this.phonepayAdviceForm.controls['batchCode'].setValue('');
        }
        this.cdr.detectChanges();
        this.appComp.showProgressBar(false);
    }else{
     if(this.userDetails.authorities === 'ServicingAdmin'){

        this.showAllAdvicesProcessedAlertMessage("Batch Code for Advice Payment "+ this.paymentAdviceDetail.loanNumber +" submitted successfully and <br/>All "+ this.paymentAdviceDetail.paymentAdviceType +" Advices are processed.", null, true);

    }else{
      this.showAllAdvicesProcessedAlertMessage("All "+ this.paymentAdviceDetail.paymentAdviceType +" Advices are processed.", null, true);
    }
    }
  }

  goToAdviceList(){
    if(this.userDetails.authorities === 'ServicingAdmin'){
      this.router.navigate(['/app-admin-payment-advice-list'], { replaceUrl: true });
    }else{
      this.router.navigate(['/get-payment-advice-list'], { replaceUrl: true });
    }
  }
  showPreviousAdviceInfo() {

    if (this.counter >= 1) {
      this.isAdviceCheckBoxSelected = false;
      this.phonepayAdviceForm.get('deleteBatchCheckbox').setValue(false);
      this.totalAmount=0;
      this.totalOtherFee = 0;
      this.isPaymentBatchCanceled=false;
      this.counter = this.counter - 1;
      this.paymentAdviceDetail=this.paymentAdviceList[this.counter];
      JSON.stringify(this.paymentAdviceDetail);
      if(this.paymentAdviceDetail.paymentAdviceStatus && !this.paymentAdviceDetail.dateCalcelled){
        this.isAdviceProcessed = true;
        this.phonepayAdviceForm.controls['batchCode'].setValue(this.paymentAdviceDetail.batchCode);
        console.log('this.isAdviceProcessed', this.isAdviceProcessed)
        }else if(this.paymentAdviceDetail.paymentAdviceStatus && this.paymentAdviceDetail.dateCalcelled){
         this.isPaymentBatchCanceled = true;
         this.phonepayAdviceForm.controls['batchCode'].setValue(this.paymentAdviceDetail.batchCode);
         this.paymentBatchCanceledMessage = 'This payment is CANCELED and must be removed from the Black Knight batch by the person who entered it.'
        }
        this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        if(this.paymentAdviceDetail.payorType === 'Borrower'){
          this.payorName = this.paymentAdviceDetail.borrowerName + ' ' + this.paymentAdviceDetail.borrowerLastName;
        }else if(this.paymentAdviceDetail.payorType === 'Co-Borrower'){
          this.payorName = this.paymentAdviceDetail.coBorrowerName + ' ' + this.paymentAdviceDetail.coBorrowerLastName;
        } else if(this.paymentAdviceDetail.payorType === 'Other'||this.paymentAdviceDetail.payorType === 'Occupant'){
          this.payorName = this.paymentAdviceDetail.payorName;
        }
        this.borrowerName = this.paymentAdviceDetail.borrowerName + ' ' + this.paymentAdviceDetail.borrowerLastName;
        console.log(this.borrowerName);
        this.coBorrowerName = this.paymentAdviceDetail.coBorrowerName + ' ' + this.paymentAdviceDetail.coBorrowerLastName;

        this.paymentAdviceDetail.otherFeeList.forEach(fees => {
          this.totalOtherFee = this.totalOtherFee + (+fees.feeAmount);
          console.log('this is total amount',this.totalOtherFee);
        })

        this.totalAmount  = this.totalOtherFee;
    }
  }
  showSchedulePaymentAlertMessageForBatchPayment(msgContent: string, routerLink: string, isBack: boolean) {
    this.updateBatchCodeAlertMessage = true;

    this.dialogObj.msgHeader = 'Alert!';
    this.populateMessage(msgContent, routerLink, isBack);
  }

  populateMessage(msgContent: string, routerLink: string, isBack: boolean) {
    this.AllupdateBatchCodeAlertMessage = false;
    this.dialogObj.msgContent = msgContent;
    this.dialogObj.routeUrl = routerLink;
    this.dialogObj.isDialogBox = true;
    this.dialogObj.isBack = isBack;
    this.progressBar = true;
    this.cdr.detectChanges();
  }

  showAllAdvicesProcessedAlertMessage(msgContent: string, routerLink: string, isBack: boolean) {


    this.dialogObj.msgHeader = 'Alert!';
    this.populateMessageForAllUpdateProcess(msgContent, routerLink, isBack);
  }
  populateMessageForAllUpdateProcess(msgContent: string, routerLink: string, isBack: boolean) {
    this.AllupdateBatchCodeAlertMessage = true;
    this.dialogObj.msgContent = msgContent;
    this.dialogObj.routeUrl = routerLink;
    this.dialogObj.isDialogBox = true;
    this.dialogObj.isBack = isBack;
    this.progressBar = true;
    this.cdr.detectChanges();
  }

  getNext(){

  }
  get f() {
    console.log(this.phonepayAdviceForm.controls)
    return this.phonepayAdviceForm.controls; }

  onSubmit(){
    if(this.isPaymentBatchCanceled){
      this.deletedBy = this.userDetails.name;
      this.removedFrom = this.isAdviceCheckBoxSelected;
      this.appComp.showProgressBar(true);
      this.schedulePaymentId = this.paymentAdviceDetail.paymentId;
      this.deletProcessAdvicePayment.deletProcessAdvicePayment(this.schedulePaymentId,this.deletedBy,this.removedFrom).subscribe(
        deleteProcessAdvicePaymentResp => {
          this.deleteProcessAdvicePaymentRes = deleteProcessAdvicePaymentResp
          if(this.deleteProcessAdvicePaymentRes.isSuccessfull){
            if(this.userDetails.authorities === 'ServicingAdmin'){
              this.showSchedulePaymentAlertMessageForBatchPayment("Batch Code for Advice Payment "+ this.paymentAdviceDetail.loanNumber +" submitted successfully.", null, true);
             }else{
              this.showSchedulePaymentAlertMessageForBatchPayment("Batch Code for Advice Payment "+ this.paymentAdviceDetail.loanNumber +" submitted successfully.", null, true);
            }

          }else{
            this.appComp.populateMessage(this.deleteProcessAdvicePaymentRes.message, null, true);
          }
          console.log(this.deleteProcessAdvicePaymentRes);
       }
      );
    }else{
      this.confirmPaymentStatus = true;
      this.batchCode = this.phonepayAdviceForm.get('batchCode').value;
      this.processedBy = this.userDetails.name;
      this.processedByEmail = this.userDetails.email;
      this.appComp.showProgressBar(true);
      this.updatePaymentAdviceService.updatePaymentAdvice(this.paymentAdviceDetail.paymentId, this.batchCode, this.processedBy, this.processedByEmail).subscribe(
       updatePaymentAdviceRes => {
         this.updatepaymentAdviceResponse = updatePaymentAdviceRes
         console.log(this.updatepaymentAdviceResponse);
         if(this.updatepaymentAdviceResponse.isSuccessfull){
           if(this.userDetails.authorities === 'ServicingAdmin'){
            this.showSchedulePaymentAlertMessageForBatchPayment("Batch Code for Advice Payment "+ this.paymentAdviceDetail.loanNumber +" submitted successfully.", null, true);
          }else{
            this.showSchedulePaymentAlertMessageForBatchPayment("Batch Code for Advice Payment "+ this.paymentAdviceDetail.loanNumber +" submitted successfully.", null, true);
          }
         }else{
          this.phonepayAdviceForm.reset();
         }
      }
      );
    }
    this.myInput.nativeElement.focus();

  }

  closeForm() {
    this.phonepayAdviceForm.reset()
    localStorage.clear();
    if(this.userDetails.authorities === 'ServicingAdmin'){
      this.router.navigate(['/app-admin-payment-advice-list'], { replaceUrl: true });
    }else{
      this.router.navigate(['/get-payment-advice-list'], { replaceUrl: true });
    }
    this.appComp.showProgressBar(false);
  }

  updateAdviceCheckBox(){
    this.isAdviceCheckBoxSelected = !this.isAdviceCheckBoxSelected;
    console.log(this.f.batchCode.errors && this.f.batchCode.errors.required);
    console.log("***this.isAdviceCheckBoxSelected", this.isAdviceCheckBoxSelected)
  }


}
