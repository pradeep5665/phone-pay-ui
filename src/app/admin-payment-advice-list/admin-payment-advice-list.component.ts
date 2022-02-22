import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GetPaymentAdviceService } from '../service/get-payment-advice.service';
import { AppComponent } from '../app.component';
import { GetPaymentAdviceListModel } from '../model/get-payment-advice-list-model';
import { GetPaymentAdviceListDto } from '../model/get-payment-advice-list-dto';
import { UpdatePaymentAdviceResponse } from '../model/update-payment-advice-response';
import { UpdatePaymentAdviceReq } from '../model/update-payment-advice-req';
import { DialogObj } from '../dialogBoxModel';

@Component({
  selector: 'app-admin-payment-advice-list',
  templateUrl: './admin-payment-advice-list.component.html',
  styleUrls: ['./admin-payment-advice-list.component.css']
})
export class AdminPaymentAdviceListComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private getPaymentAdviceService: GetPaymentAdviceService, private appComp: AppComponent,private cdr: ChangeDetectorRef) { }

  paymentAdvice = new GetPaymentAdviceListModel();
  paymentAdviceList: GetPaymentAdviceListDto[] = new Array;
  cashiering = new Array();
  lossMit = new Array();
  bankruptcy = new Array();
  collection = new Array();
  infoForPaymentAdvice: GetPaymentAdviceListDto;
  paymentAdviceResponse: UpdatePaymentAdviceResponse;
  paymentAdviceReq = new UpdatePaymentAdviceReq();
  totalAmountForCashiering = 0.00;
  totalAmountForCollection = 0.00;
  totalAmountForBankruptcy = 0.00;
  totalAmountForLossMit = 0.00;

  pendingCountForCashiering = 0;
  pendingAmountForCashiering = 0.00;
  processedCountForCashiering = 0;
  processedAmountForCashiering = 0.00;
  canceledProcessedBatchCountForCashiering=0;
  canceledProcessedBatchAmountForCashiering=0.00;
  processRemovedFromBackendForCashering = false;

  pendingCountForCollection = 0;
  pendingAmountForCollection = 0.00;
  processedCountForCollection = 0;
  processedAmountForCollection = 0.00;
  canceledProcessedBatchCountForCollection=0;
  canceledProcessedBatchAmountForCollection=0.00;
  processRemovedFromBackendForCollections=false;

  pendingCountForBankruptcy = 0;
  pendingAmountForBankruptcy = 0.00;
  processedCountForBankruptcy = 0;
  processedAmountForBankruptcy = 0.00;
  canceledProcessedBatchCountForBankruptcy=0;
  canceledProcessedBatchAmountForBankruptcy=0.00;
  processRemovedFromBackendForBankruptcy=false;

  pendingCountForLossMit = 0;
  pendingAmountForLossMit = 0.00;
  processedCountForLossMit = 0;
  processedAmountForLossMit = 0.00;
  canceledProcessedBatchCountForLossMit=0;
  canceledProcessedBatchAmountForLossMit=0.00;
  processRemovedFromBackendForLossMit =false;

  currentAdvice = new GetPaymentAdviceListDto();
  adviceIndex: number;

  dialogObj = new DialogObj();
  progressBar: boolean;
  ngOnInit() {
    this.appComp.showProgressBar(true);
    this.getPaymentAdviceService.getAllPaymentAdviceDetails().subscribe(
      paymentAdvice => {
        this.paymentAdvice = paymentAdvice
        console.log(this.paymentAdvice);
        if (this.paymentAdvice.isSuccessful) {
          this.appComp.showProgressBar(false);
          this.paymentAdviceList = this.paymentAdvice.paymentAdviceDetailsDto;
          console.log('+++++++++++', this.paymentAdviceList);
          this.paymentAdviceList.forEach(paymentAdvice => {
            if (paymentAdvice.paymentAdviceType === 'Cashiering') {
              console.log(paymentAdvice.dateCalcelled)
              if (paymentAdvice.paymentAdviceStatus === false && paymentAdvice.dateCalcelled===false) {
                this.pendingAmountForCashiering = Number((this.pendingAmountForCashiering + paymentAdvice.totalPayment ).toFixed(2));
                this.pendingCountForCashiering++;
              } else if(paymentAdvice.paymentAdviceStatus===true && paymentAdvice.dateCalcelled===true){
                this.canceledProcessedBatchAmountForCashiering = Number((this.canceledProcessedBatchAmountForCashiering +paymentAdvice.totalPayment ).toFixed(2));
                this.canceledProcessedBatchCountForCashiering++;
              }else if(paymentAdvice.paymentAdviceStatus===true && paymentAdvice.dateCalcelled===false) {
                this.processedAmountForCashiering = Number((this.processedAmountForCashiering + paymentAdvice.totalPayment ).toFixed(2));
                this.processedCountForCashiering++;
              }
              this.cashiering.push(paymentAdvice);
              this.totalAmountForCashiering = Number((this.totalAmountForCashiering + paymentAdvice.totalPayment ).toFixed(2));
              console.log('this.totalAmountForCashiering', this.totalAmountForCashiering);
              console.log('cashiering : ', this.cashiering);
              if(this.cashiering.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCashering=false;
                console.log('*****************false');
                 }else if(this.cashiering.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForCashering=true;
                console.log('******************true');
                 }

            } else if (paymentAdvice.paymentAdviceType === 'Collections') {
              if (paymentAdvice.paymentAdviceStatus === false && paymentAdvice.dateCalcelled===false) {
                this.pendingAmountForCollection = Number((this.pendingAmountForCollection + paymentAdvice.totalPayment ).toFixed(2));
                this.pendingCountForCollection=this.pendingCountForCollection+1;
              }else if(paymentAdvice.paymentAdviceStatus===true && paymentAdvice.dateCalcelled===true){
                this.canceledProcessedBatchAmountForCollection = Number((this.canceledProcessedBatchAmountForCollection + paymentAdvice.totalPayment ).toFixed(2));
                this.canceledProcessedBatchCountForCollection=this.canceledProcessedBatchCountForCollection+1;
              }
              else if(paymentAdvice.paymentAdviceStatus===true && paymentAdvice.dateCalcelled===false){
                this.processedAmountForCollection = Number((this.processedAmountForCollection + paymentAdvice.totalPayment ).toFixed(2));
                this.processedCountForCollection++;
              }
              this.collection.push(paymentAdvice);
              this.totalAmountForCollection = Number((this.totalAmountForCollection + paymentAdvice.totalPayment ).toFixed(2));
              console.log('collections : ', this.collection);
              if(this.collection.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCollections=false;
                console.log('*****************false');
                 }else if(this.collection.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForCollections=true;
                console.log('******************true');
                 }

            } else if (paymentAdvice.paymentAdviceType === 'Bankruptcy') {
              if (paymentAdvice.paymentAdviceStatus === false && paymentAdvice.dateCalcelled===false) {
                this.pendingAmountForBankruptcy = Number((this.pendingAmountForBankruptcy + paymentAdvice.totalPayment ).toFixed(2));
                this.pendingCountForBankruptcy++;
              }else if(paymentAdvice.paymentAdviceStatus===true && paymentAdvice.dateCalcelled===true){
                this.canceledProcessedBatchAmountForBankruptcy = Number((this.canceledProcessedBatchAmountForBankruptcy + paymentAdvice.totalPayment ).toFixed(2));
                this.canceledProcessedBatchCountForBankruptcy++;
              }else if(paymentAdvice.paymentAdviceStatus===true && paymentAdvice.dateCalcelled===false){
                this.processedAmountForBankruptcy = Number((this.processedAmountForBankruptcy + paymentAdvice.totalPayment ).toFixed(2));
                this.processedCountForBankruptcy++;
              }
              this.bankruptcy.push(paymentAdvice);
              this.totalAmountForBankruptcy =Number((this.totalAmountForBankruptcy + paymentAdvice.totalPayment ).toFixed(2));
              console.log('bankruptcy : ', this.bankruptcy);
              if(this.bankruptcy.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true )){
                this.processRemovedFromBackendForBankruptcy=false;
                console.log('*****************false');
                 }else if(this.bankruptcy.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForBankruptcy=true;
                console.log('******************true');
                 }

            } else if (paymentAdvice.paymentAdviceType === 'Loss Mit') {
              if (paymentAdvice.paymentAdviceStatus === false && paymentAdvice.dateCalcelled===false) {
                this.pendingAmountForLossMit = Number((this.pendingAmountForLossMit + paymentAdvice.totalPayment ).toFixed(2));
                this.pendingCountForLossMit++;
              } else if(paymentAdvice.paymentAdviceStatus===true && paymentAdvice.dateCalcelled===true){
                this.canceledProcessedBatchAmountForLossMit = Number((this.canceledProcessedBatchAmountForLossMit + paymentAdvice.totalPayment ).toFixed(2));
                this.canceledProcessedBatchCountForLossMit++;
              } else if(paymentAdvice.paymentAdviceStatus===true && paymentAdvice.dateCalcelled===false){
                this.processedAmountForLossMit = Number((this.processedAmountForLossMit + paymentAdvice.totalPayment ).toFixed(2));
                this.processedCountForLossMit++;
              }
              this.lossMit.push(paymentAdvice);
              this.totalAmountForLossMit = Number((this.totalAmountForLossMit + paymentAdvice.totalPayment ).toFixed(2));
              console.log('lossMit : ', this.lossMit);
              if(this.lossMit.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForLossMit=false;
                console.log('*****************false');
                 }else if(this.lossMit.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForLossMit=true;
                console.log('******************true');
                 }
            }
          })
         
          this.cashiering.sort((a, b) => {
            if (a.paymentAdviceStatus) {
              return 1;
            }
            if (b.paymentAdviceStatus) {
              return -1;
            }
            return 0;
          });
          this.collection.sort((a, b) => {
            if (a.paymentAdviceStatus) {
             
              return 1;
            }
            if (b.paymentAdviceStatus) {
              
              return -1;
            }
            return 0;
          });
          this.lossMit.sort((a, b) => {
            if (a.paymentAdviceStatus) {
            
              return 1;
            }
            if (b.paymentAdviceStatus) {
             
              return -1;
            }
            return 0;
          });
          this.bankruptcy.sort((a, b) => {
            if (a.paymentAdviceStatus) {
              
              return 1;
            }
            if (b.paymentAdviceStatus) {
              
              return -1;
            }
            return 0;
          });
        } else {
          this.appComp.populateMessage(this.paymentAdvice.message, null, false);
          this.router.navigate(['/app-admin-dashboard'])
        }
      });
  }

  enterAdviceIndex(i: number) {
    this.adviceIndex = i;
    console.log('index of advice', this.adviceIndex);
  }

  drop(event: CdkDragDrop<GetPaymentAdviceListDto[]>, adviceType: string) {
   
    

    if (event.previousContainer === event.container) {

      console.log('previousContainer : ', event.previousContainer);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      event.container.data.sort((a, b) => {
        if (a.paymentAdviceStatus) {
          return 1;
        }
        if (b.paymentAdviceStatus) {
          return -1;
        } return 0;
       
      });
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log('current index : ', event.currentIndex);
      console.log('previous index : ', event.previousIndex);
      this.currentAdvice = event.container.data[event.currentIndex];
      console.log('current advice : ',event.container.data[event.currentIndex] );
      console.log('previous advice : ',event.previousContainer.data[event.previousIndex] );
     
      console.log('In adviceType : ',adviceType );
      var outAdviceType=event.container.data[event.currentIndex].paymentAdviceType;
      console.log('out adviceType: ', outAdviceType);
      if(adviceType===outAdviceType){
        console.log("Wrong drop")
        transferArrayItem(event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex);
      }else{

      var paymentStatus= event.container.data[event.currentIndex].paymentAdviceStatus;
      var paymentCancelled= event.container.data[event.currentIndex].dateCalcelled;
      console.log('is processed : ', paymentStatus);
      console.log('is canceled : ', paymentCancelled);

      var movePayment=event.container.data[event.currentIndex].totalPayment;//(+event.container.data[event.currentIndex].totalPayment * 1 || 0)
    
        this.appComp.showProgressBar(true);
      this.paymentAdviceReq.schedulePaymentId = event.container.data[event.currentIndex].paymentId;
      this.paymentAdviceReq.adviceType = adviceType;
      event.container.data[event.currentIndex].paymentAdviceType =adviceType;
      this.getPaymentAdviceService.updatePaymentAdviceType(this.paymentAdviceReq).subscribe(paymentAdviceRes => {
        this.paymentAdviceResponse = paymentAdviceRes;
        if (this.paymentAdviceResponse.isSuccessfull){
          console.log('Successfull ')
          event.container.data[event.currentIndex].paymentAdviceType = this.paymentAdviceReq.adviceType;
        if (outAdviceType === 'Cashiering') {
          
          console.log('Changed Advice type is from Cashiering to ', event.container.data[event.currentIndex].paymentAdviceType)
          console.log('Cashiering to Loss Mit****');
          if (this.paymentAdviceReq.adviceType === 'Loss Mit') {
            console.log('Cashiering to Loss Mit**in');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForLossMit = Number((+this.pendingAmountForLossMit + movePayment).toFixed(2));
              this.pendingCountForLossMit=this.pendingCountForLossMit+1;
              if (this.pendingCountForCashiering > 0 && this.pendingAmountForCashiering > 0.00) {
                console.log('inner');
                this.pendingAmountForCashiering = Number((+this.pendingAmountForCashiering - movePayment).toFixed(2));
                this.pendingCountForCashiering=this.pendingCountForCashiering-1;
              }
              console.log('Cashiering to Loss Mit Pending..');
            }
            else if (paymentStatus === true && paymentCancelled === true) {
              console.log('outer');
              this.canceledProcessedBatchAmountForLossMit =Number((+this.canceledProcessedBatchAmountForLossMit + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForLossMit=this.canceledProcessedBatchCountForLossMit+1;
              if (this.canceledProcessedBatchCountForCashiering > 0 && this.canceledProcessedBatchAmountForCashiering > 0.00) {
                console.log('inner');
                this.canceledProcessedBatchAmountForCashiering = Number((+this.canceledProcessedBatchAmountForCashiering - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForCashiering=this.canceledProcessedBatchCountForCashiering-1;
              }
              console.log('Cashiering to Loss Mit dateCalcelled..');
            }
           
            else {
              console.log('outer');
              console.log('event.container.data[event.currentIndex].paymentAdviceStatus', paymentStatus)
              this.processedAmountForLossMit = Number((+this.processedAmountForLossMit + movePayment).toFixed(2));
              this.processedCountForLossMit=this.processedCountForLossMit+1;
              if (this.processedCountForCashiering > 0 && this.processedAmountForCashiering > 0.00) {
                console.log('inner');
                this.processedAmountForCashiering = Number((+this.processedAmountForCashiering - movePayment).toFixed(2));
                this.processedCountForCashiering=this.processedCountForCashiering-1;
              }
              console.log('Cashiering to Loss Mit else..');
            }
            if(this.totalAmountForCashiering>0.00){
              this.totalAmountForCashiering = Number((+this.totalAmountForCashiering - movePayment).toFixed(2));
            }
            this.totalAmountForLossMit = Number((+this.totalAmountForLossMit +movePayment).toFixed(2));
            if(this.lossMit.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForLossMit=false;
              console.log('*****************false');
               }else if(this.lossMit.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForLossMit=true;
              console.log('******************true');
              }
              if(this.cashiering.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCashering=false;
                console.log('*****************false');
                 }else if(this.cashiering.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForCashering=true;
                console.log('******************true');
                }
          } else if (this.paymentAdviceReq.adviceType === 'Bankruptcy') {
            console.log('Cashiering to Bankruptcy');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForBankruptcy = Number((+this.pendingAmountForBankruptcy + movePayment).toFixed(2));
              this.pendingCountForBankruptcy=this.pendingCountForBankruptcy+1;
              if (this.pendingCountForCashiering > 0 && this.pendingAmountForCashiering > 0.00) {
                this.pendingAmountForCashiering = Number((+this.pendingAmountForCashiering - movePayment).toFixed(2));
                this.pendingCountForCashiering=this.pendingCountForCashiering-1;
                console.log('inner');
              }
            }else if (paymentStatus === true && paymentCancelled === true ) {
              console.log('outer');
              this.canceledProcessedBatchAmountForBankruptcy = Number((+this.canceledProcessedBatchAmountForBankruptcy + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForBankruptcy=this.canceledProcessedBatchCountForBankruptcy+1;
              if (this.canceledProcessedBatchCountForCashiering > 0 && this.canceledProcessedBatchAmountForCashiering > 0.00) {
                this.canceledProcessedBatchAmountForCashiering = Number((+this.canceledProcessedBatchAmountForCashiering - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForCashiering=this.canceledProcessedBatchCountForCashiering-1;
                console.log('inner');
              }
            } 
           
            else {
              console.log('outer');
              this.processedAmountForBankruptcy =Number((+this.processedAmountForBankruptcy + movePayment).toFixed(2));
              this.processedCountForBankruptcy=this.processedCountForBankruptcy+1;
              if (this.processedCountForCashiering > 0 && this.processedAmountForCashiering > 0.00) {
                this.processedAmountForCashiering = Number((+this.processedAmountForCashiering - movePayment).toFixed(2));
                this.processedCountForCashiering=this.processedCountForCashiering-1;
                console.log('inner');
              }
            }
            if(this.totalAmountForCashiering>0.00){
              this.totalAmountForCashiering = Number((+this.totalAmountForCashiering - movePayment).toFixed(2));
            }
            this.totalAmountForBankruptcy = Number((+this.totalAmountForBankruptcy + movePayment).toFixed(2));
            if(this.bankruptcy.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForBankruptcy=false;
              console.log('*****************false');
               }else if(this.bankruptcy.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForBankruptcy=true;
              console.log('******************true');
               }
               if(this.cashiering.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCashering=false;
                console.log('*****************false');
                 }else if(this.cashiering.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForCashering=true;
                console.log('******************true');
                 }
          } else if (this.paymentAdviceReq.adviceType === 'Collections') {
            console.log('Cashiering to Collections');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForCollection = Number((+this.pendingAmountForCollection + movePayment).toFixed(2));
              this.pendingCountForCollection=this.pendingCountForCollection+1;
              if (this.pendingCountForCashiering > 0 && this.pendingAmountForCashiering > 0.00) {
                this.pendingAmountForCashiering = Number((+this.pendingAmountForCashiering - movePayment).toFixed(2));
                this.pendingCountForCashiering=this.pendingCountForCashiering-1;
                console.log('inner');
              }
            }else if (paymentStatus === true && paymentCancelled === true ) {
              console.log('outer');
              this.canceledProcessedBatchAmountForCollection = Number((+this.canceledProcessedBatchAmountForCollection + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForCollection=this.canceledProcessedBatchCountForCollection+1;
              if (this.canceledProcessedBatchCountForCashiering > 0 && this.canceledProcessedBatchAmountForCashiering > 0.00) {
                this.canceledProcessedBatchAmountForCashiering = Number((+this.canceledProcessedBatchAmountForCashiering - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForCashiering=this.canceledProcessedBatchCountForCashiering-1;
                console.log('inner');
              }
            }
           
            else {
              console.log('outer');
              this.processedAmountForCollection = Number((+this.processedAmountForCollection + movePayment).toFixed(2));
              this.processedCountForCollection=this.processedCountForCollection+1;
              if (this.processedCountForCashiering > 0 && this.processedAmountForCashiering > 0.00) {
                this.processedAmountForCashiering = Number((+this.processedAmountForCashiering -movePayment).toFixed(2));
                this.processedCountForCollection=this.processedCountForCollection-1;
                console.log('inner');
              }
            }
            if(this.totalAmountForCashiering>0.00){
              this.totalAmountForCashiering = Number((+this.totalAmountForCashiering - movePayment).toFixed(2));
            }
            this.totalAmountForCollection = Number((+this.totalAmountForCollection + movePayment).toFixed(2));
            if(this.collection.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForCollections=false;
              console.log('*****************false');
               }else if(this.collection.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCollections=true;
              console.log('******************true');
               }
               if(this.cashiering.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCashering=false;
                console.log('*****************false');
                 }else if(this.cashiering.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForCashering=true;
                console.log('******************true');
                 }
          }
          this.appComp.showProgressBar(false);
        }

        else if (outAdviceType === 'Loss Mit') {
          
          if (this.paymentAdviceReq.adviceType === 'Cashiering') {
            console.log('Loss Mit to Cashiering');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForCashiering = Number((+this.pendingAmountForCashiering + movePayment).toFixed(2));
              this.pendingCountForCashiering=this.pendingCountForCashiering+1;
              if (this.pendingCountForLossMit > 0 && this.pendingAmountForLossMit > 0.00) {
                this.pendingAmountForLossMit = Number((+this.pendingAmountForLossMit - movePayment).toFixed(2));
                this.pendingCountForLossMit=this.pendingCountForLossMit-1;
                console.log('inner');
              }
            }else if (paymentStatus === true && paymentCancelled === true ) {
              console.log('outer');
              this.canceledProcessedBatchAmountForCashiering = Number((+this.canceledProcessedBatchAmountForCashiering + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForCashiering=this.canceledProcessedBatchCountForCashiering+1;
              if (this.canceledProcessedBatchCountForLossMit > 0 && this.canceledProcessedBatchAmountForLossMit > 0.00) {
                this.canceledProcessedBatchAmountForLossMit = Number((+this.canceledProcessedBatchAmountForLossMit - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForLossMit=this.canceledProcessedBatchCountForLossMit-1;
                console.log('inner');
              }
            }
            
            else {
              console.log('outer');
              this.processedAmountForCashiering = Number((+this.processedAmountForCashiering + movePayment).toFixed(2));
              this.processedCountForCashiering=this.processedCountForCashiering+1;
              if (this.processedCountForLossMit > 0 && this.processedAmountForLossMit > 0.00) {
                this.processedAmountForLossMit = Number((+this.processedAmountForLossMit - movePayment).toFixed(2));
                this.processedCountForLossMit=this.processedCountForLossMit-1;
                console.log('inner');
              }
            }
            if(this.totalAmountForLossMit>0.00){
              this.totalAmountForLossMit = Number((+this.totalAmountForLossMit - movePayment).toFixed(2));
            }
            this.totalAmountForCashiering = Number((+this.totalAmountForCashiering + movePayment).toFixed(2));
            if(this.cashiering.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForCashering=false;
              console.log('*****************false');
               }else if(this.cashiering.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCashering=true;
              console.log('******************true');
               }

               if(this.lossMit.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForLossMit=false;
                console.log('*****************false');
                 }else if(this.lossMit.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForLossMit=true;
                console.log('******************true');
                 }
          } else if (this.paymentAdviceReq.adviceType === 'Bankruptcy') {
            console.log('Loss Mit to Bankruptcy');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForBankruptcy = Number((+this.pendingAmountForBankruptcy + movePayment).toFixed(2));
              this.pendingCountForBankruptcy= this.pendingCountForBankruptcy+1;
              if (this.pendingCountForLossMit > 0 && this.pendingAmountForLossMit > 0.00) {
                this.pendingAmountForLossMit = Number((+this.pendingAmountForLossMit - movePayment).toFixed(2));
                this.pendingCountForLossMit=this.pendingCountForLossMit-1;
                console.log('inner');
              }
            }
            else if (paymentStatus === true && paymentCancelled === true ) {
              console.log('outer');
              this.canceledProcessedBatchAmountForBankruptcy = Number((+this.canceledProcessedBatchAmountForBankruptcy + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForBankruptcy=this.canceledProcessedBatchCountForBankruptcy+1;
              if (this.canceledProcessedBatchCountForLossMit > 0 && this.canceledProcessedBatchAmountForLossMit > 0.00) {
                this.canceledProcessedBatchAmountForLossMit = Number((+this.canceledProcessedBatchAmountForLossMit - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForLossMit=this.canceledProcessedBatchCountForLossMit-1;
                console.log('inner');
              }
            } 
           

            else {
              console.log('outer');
              this.processedAmountForBankruptcy = Number((+this.processedAmountForBankruptcy + movePayment).toFixed(2));
              this.processedCountForBankruptcy=this.processedCountForBankruptcy+1;
              if (this.processedCountForLossMit > 0 && this.processedAmountForLossMit > 0.00) {
                this.processedAmountForLossMit = Number((+this.processedAmountForLossMit - movePayment).toFixed(2));
                this.processedCountForLossMit=this.processedCountForLossMit-1;
                console.log('inner');
              }
            }
            if(this.totalAmountForLossMit>0.00){
              this.totalAmountForLossMit = Number((+this.totalAmountForLossMit - movePayment).toFixed(2));
            }
            this.totalAmountForBankruptcy = Number((+this.totalAmountForBankruptcy + movePayment).toFixed(2));
            if(this.bankruptcy.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForBankruptcy=false;
              console.log('*****************false');
               }else if(this.bankruptcy.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForBankruptcy=true;
              console.log('******************true');
               }
               if(this.lossMit.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForLossMit=false;
                console.log('*****************false');
                 }else if(this.lossMit.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForLossMit=true;
                console.log('******************true');
                 }
          } else if (this.paymentAdviceReq.adviceType === 'Collections') {
            console.log('Loss Mit to Collections');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForCollection = Number((+this.pendingAmountForCollection + movePayment).toFixed(2));
              this.pendingCountForCollection=this.pendingCountForCollection+1;
              if (this.pendingCountForLossMit > 0 && this.pendingAmountForLossMit > 0.00) {
                this.pendingAmountForLossMit = Number((+this.pendingAmountForLossMit - movePayment).toFixed(2));
                this.pendingCountForLossMit=this.pendingCountForLossMit-1;
                console.log('inner');
              }
            } else if (paymentStatus === true && paymentCancelled === true ) {
              console.log('outer');
              this.canceledProcessedBatchAmountForCollection = Number((+this.canceledProcessedBatchAmountForCollection + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForCollection=this.canceledProcessedBatchCountForCollection+1;
              if (this.canceledProcessedBatchCountForLossMit > 0 && this.canceledProcessedBatchAmountForLossMit > 0.00) {
                this.canceledProcessedBatchAmountForLossMit = Number((+this.canceledProcessedBatchAmountForLossMit - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForLossMit=this.canceledProcessedBatchCountForLossMit-1;
                console.log('inner');
              }
            }
            
             else {
              console.log('outer');
              this.processedAmountForCollection = Number((+this.processedAmountForCollection + movePayment).toFixed(2));
              this.processedCountForCollection=this.processedCountForCollection+1;
              if (this.processedCountForLossMit > 0 && this.processedAmountForLossMit > 0.00) {
                this.processedAmountForLossMit = Number((+this.processedAmountForLossMit - movePayment).toFixed(2));
                this.processedCountForLossMit=this.processedCountForLossMit-1;
                console.log('inner');
              }
            }
            if(this.totalAmountForLossMit>0.00){
              this.totalAmountForLossMit = Number((+this.totalAmountForLossMit - movePayment).toFixed(2));
            }
            this.totalAmountForCollection = Number((+this.totalAmountForCollection + movePayment).toFixed(2));
            if(this.collection.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForCollections=false;
              console.log('*****************false');
               }else if(this.collection.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCollections=true;
              console.log('******************true');
               }
               if(this.lossMit.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForLossMit=false;
                console.log('*****************false');
                 }else if(this.lossMit.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForLossMit=true;
                console.log('******************true');
                 }
          }
          this.appComp.showProgressBar(false);
        }

        else if (outAdviceType === 'Bankruptcy') {
          
          if (this.paymentAdviceReq.adviceType === 'Cashiering') {
            console.log('Bankruptcy to Cashiering');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForCashiering = Number((+this.pendingAmountForCashiering + movePayment).toFixed(2));
              this.pendingCountForCashiering=this.pendingCountForCashiering+1;
              if (this.pendingCountForBankruptcy > 0 && this.pendingAmountForBankruptcy > 0.00) {
                this.pendingAmountForBankruptcy = Number((+this.pendingAmountForBankruptcy -movePayment).toFixed(2));
                this.pendingCountForBankruptcy=this.pendingCountForBankruptcy-1;
                console.log('inner');
              }
            }else if (paymentStatus === true && paymentCancelled === true ) {
              console.log('outer');
              this.canceledProcessedBatchAmountForCashiering = Number((+this.canceledProcessedBatchAmountForCashiering + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForCashiering=this.canceledProcessedBatchCountForCashiering+1;
              if (this.canceledProcessedBatchCountForBankruptcy > 0 && this.canceledProcessedBatchAmountForBankruptcy > 0.00) {
                this.canceledProcessedBatchAmountForBankruptcy = Number((+this.canceledProcessedBatchAmountForBankruptcy - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForBankruptcy=this.canceledProcessedBatchCountForBankruptcy-1;
                console.log('inner');
              }
            }
           
            else {
              console.log('outer');
              this.processedAmountForCashiering =  Number((+this.processedAmountForCashiering + movePayment).toFixed(2));
              this.processedCountForCashiering=this.processedCountForCashiering+1;
              if (this.processedCountForBankruptcy > 0 && this.processedAmountForBankruptcy > 0.00) {
                this.processedAmountForBankruptcy =  Number((+this.processedAmountForBankruptcy - movePayment).toFixed(2));
                this.processedCountForBankruptcy=this.processedCountForBankruptcy-1;
                console.log('inner');
              }
            }
            if(this.totalAmountForBankruptcy>0.00){
              this.totalAmountForBankruptcy = Number((+this.totalAmountForBankruptcy - movePayment).toFixed(2));
            }
            this.totalAmountForCashiering = Number((+this.totalAmountForCashiering + movePayment).toFixed(2));
            if(this.cashiering.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForCashering=false;
              console.log('*****************false');
               }else if(this.cashiering.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCashering=true;
              console.log('******************true');
               }
               if(this.bankruptcy.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForBankruptcy=false;
                console.log('*****************false');
                 }else if(this.bankruptcy.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForBankruptcy=true;
                console.log('******************true');
                 }
               
          } else if (this.paymentAdviceReq.adviceType === 'Loss Mit') {
            console.log('Bankruptcy to Loss Mit');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForLossMit = Number((+this.pendingAmountForLossMit + movePayment).toFixed(2));
              this.pendingCountForLossMit=this.pendingCountForLossMit+1;
              if (this.pendingCountForBankruptcy > 0 && this.pendingAmountForBankruptcy > 0.00) {
                this.pendingAmountForBankruptcy = Number((+this.pendingAmountForBankruptcy - movePayment).toFixed(2));
                this.pendingCountForBankruptcy=this.pendingCountForBankruptcy-1;
                console.log('inner');
              }
            }
            else if (paymentStatus === true && paymentCancelled === true ) {
              console.log('outer');
              this.canceledProcessedBatchAmountForLossMit = Number((+this.canceledProcessedBatchAmountForLossMit + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForLossMit=this.canceledProcessedBatchCountForLossMit+1;
              if (this.canceledProcessedBatchCountForBankruptcy > 0 && this.canceledProcessedBatchAmountForBankruptcy > 0.00) {
                this.canceledProcessedBatchAmountForBankruptcy = Number((+this.canceledProcessedBatchAmountForBankruptcy - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForBankruptcy=this.canceledProcessedBatchCountForBankruptcy-1;
                console.log('inner');
              }
            } 
                   
            else {
              console.log('outer');
              this.processedAmountForLossMit =Number((+this.processedAmountForLossMit + movePayment).toFixed(2));
              this.processedCountForLossMit=this.processedCountForLossMit+1;
              if (this.processedCountForBankruptcy > 0 && this.processedAmountForBankruptcy > 0.00) {
                this.processedAmountForBankruptcy = Number((+this.processedAmountForBankruptcy - movePayment).toFixed(2));
                this.processedCountForBankruptcy=this.processedCountForBankruptcy-1;
                console.log('inner');
              }
            }
            if(this.totalAmountForBankruptcy>0.00){
              this.totalAmountForBankruptcy = Number((+this.totalAmountForBankruptcy - movePayment).toFixed(2));
            }
            this.totalAmountForLossMit = Number((+this.totalAmountForLossMit + movePayment).toFixed(2));
            
            if(this.lossMit.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForLossMit=false;
              console.log('*****************false');
               }else if(this.lossMit.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForLossMit=true;
              console.log('******************true');
               }
               if(this.bankruptcy.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForBankruptcy=false;
                console.log('*****************false');
                 }else if(this.bankruptcy.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForBankruptcy=true;
                console.log('******************true');
                 }
          } else if (this.paymentAdviceReq.adviceType === 'Collections') {
            console.log('Bankruptcy to Collections');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForCollection = Number((+this.pendingAmountForCollection + movePayment).toFixed(2));
              this.pendingCountForCollection=this.pendingCountForCollection+1;
              if (this.pendingCountForBankruptcy > 0 && this.pendingAmountForBankruptcy > 0.00) {
                this.pendingAmountForBankruptcy = Number((+this.pendingAmountForBankruptcy - movePayment).toFixed(2));
                this.pendingCountForBankruptcy=this.pendingCountForBankruptcy-1;
                console.log('inner');
              }
            } 
            else if (paymentStatus === true && paymentCancelled === true ) {
              console.log('outer');
              
              this.canceledProcessedBatchAmountForCollection = Number((+this.canceledProcessedBatchAmountForCollection + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForCollection=this.canceledProcessedBatchCountForCollection+1;
              if (this.canceledProcessedBatchCountForBankruptcy > 0 && this.canceledProcessedBatchAmountForBankruptcy > 0.00) {
                this.canceledProcessedBatchAmountForBankruptcy = Number((+this.canceledProcessedBatchAmountForBankruptcy - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForBankruptcy=this.canceledProcessedBatchCountForBankruptcy-1;
                console.log('inner');
              }
            }
            
            else {
              console.log('outer');
              this.processedAmountForCollection = Number((+this.processedAmountForCollection + movePayment).toFixed(2));
              this.processedCountForCollection=this.processedCountForCollection+1;
              if (this.processedCountForBankruptcy > 0 && this.processedAmountForBankruptcy > 0.00) {
                this.processedAmountForBankruptcy = Number((+this.processedAmountForBankruptcy - movePayment).toFixed(2));
                this.processedCountForBankruptcy=this.processedCountForBankruptcy-1;
                console.log('inner');
              }
            }
            if(this.totalAmountForBankruptcy>0.00){
              this.totalAmountForBankruptcy = Number((+this.totalAmountForBankruptcy - movePayment).toFixed(2));
            }
            this.totalAmountForCollection = Number((+this.totalAmountForCollection + movePayment).toFixed(2));
            if(this.collection.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForCollections=false;
              console.log('*****************false');
               }else if(this.collection.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCollections=true;
              console.log('******************true');
               }
               if(this.bankruptcy.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForBankruptcy=false;
                console.log('*****************false');
                 }else if(this.bankruptcy.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForBankruptcy=true;
                console.log('******************true');
                 }
          }
          this.appComp.showProgressBar(false);
        }


        else if (outAdviceType === 'Collections') {
          

          if (this.paymentAdviceReq.adviceType === 'Cashiering') {
            console.log('Collections to Cashiering');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForCashiering = Number((+this.pendingAmountForCashiering + movePayment).toFixed(2));
              this.pendingCountForCashiering=this.pendingCountForCashiering+1;
              if (this.pendingCountForCollection > 0 && this.pendingAmountForCollection > 0.00) {
                this.pendingAmountForCollection = Number((+this.pendingAmountForCollection - movePayment).toFixed(2));
                this.pendingCountForCollection=this.pendingCountForCollection-1;
                console.log('inner');
              }
            } 
            else if (paymentStatus === true && paymentCancelled === true ) {
              console.log('outer');
              this.canceledProcessedBatchAmountForCashiering = Number((+this.canceledProcessedBatchAmountForCashiering + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForCashiering=this.canceledProcessedBatchCountForCashiering+1;
              if (this.canceledProcessedBatchCountForCollection > 0 && this.canceledProcessedBatchAmountForCollection > 0.00) {
                this.canceledProcessedBatchAmountForCollection = Number((+this.canceledProcessedBatchAmountForCollection - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForCollection=this.canceledProcessedBatchCountForCollection-1;
                console.log('inner');
              }
            }
            
            else {
              console.log('outer');
              this.processedAmountForCashiering = Number((+this.processedAmountForCashiering + movePayment).toFixed(2));
              this.processedCountForCashiering=this.processedCountForCashiering+1;
              if (this.processedCountForCollection > 0 && this.processedAmountForCollection > 0.00) {
                this.processedAmountForCollection = Number((+this.processedAmountForCollection - movePayment).toFixed(2));
                this.processedCountForCollection=this.processedCountForCollection-1;
                console.log('inner');
              }
            }
            if( this.totalAmountForCollection>0.00){
              this.totalAmountForCollection = Number((+this.totalAmountForCollection - movePayment).toFixed(2));
            }
            this.totalAmountForCashiering = Number((+this.totalAmountForCashiering + movePayment).toFixed(2));
            if(this.cashiering.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForCashering=false;
              console.log('*****************false');
               }else if(this.cashiering.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCashering=true;
              console.log('******************true');
               }
               if(this.collection.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCollections=false;
                console.log('*****************false');
                 }else if(this.collection.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForCollections=true;
                console.log('******************true');
                 }
          } else if (this.paymentAdviceReq.adviceType === 'Loss Mit') {
            console.log('Collection to Loss Mit');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForLossMit = Number((+this.pendingAmountForLossMit + movePayment).toFixed(2));
              this.pendingCountForLossMit=this.pendingCountForLossMit+1;
              if (this.pendingCountForCollection > 0 && this.pendingAmountForCollection > 0.00) {
                this.pendingAmountForCollection = Number((+this.pendingAmountForCollection - movePayment).toFixed(2));
                this.pendingCountForCollection=this.pendingCountForCollection-1;
                console.log('inner');
              }
            }
            else if (paymentStatus === true && paymentCancelled === true) {
              console.log('outer');
              this.canceledProcessedBatchAmountForLossMit = Number((+this.canceledProcessedBatchAmountForLossMit + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForLossMit=this.canceledProcessedBatchCountForLossMit+1;
              if (this.canceledProcessedBatchCountForCollection > 0 && this.canceledProcessedBatchAmountForCollection > 0.00) {
                this.canceledProcessedBatchAmountForCollection = Number((+this.canceledProcessedBatchAmountForCollection - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForCollection=this.canceledProcessedBatchCountForCollection-1;
                console.log('inner');
              }
            }
            
            else {
              console.log('outer');
              this.processedAmountForLossMit = Number((+this.processedAmountForLossMit + movePayment).toFixed(2));
              this.processedCountForLossMit=this.processedCountForLossMit+1;
              if (this.processedCountForCollection > 0 && this.processedAmountForCollection > 0.00) {
                this.processedAmountForCollection = Number((+this.processedAmountForCollection - movePayment).toFixed(2));
                this.processedCountForCollection=this.processedCountForCollection-1;
                console.log('inner');
              }
            }
            this.totalAmountForLossMit = Number((+this.totalAmountForLossMit + movePayment).toFixed(2));
            if( this.totalAmountForCollection>0.00){
              this.totalAmountForCollection = Number((+this.totalAmountForCollection - movePayment).toFixed(2));
            }
            if(this.lossMit.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForLossMit=false;
              console.log('*****************false');
               }else if(this.lossMit.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForLossMit=true;
              console.log('******************true');
               }
               if(this.collection.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCollections=false;
                console.log('*****************false');
                 }else if(this.collection.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForCollections=true;
                console.log('******************true');
                 }
          } else if (this.paymentAdviceReq.adviceType === 'Bankruptcy') {
            console.log('Collections to Bankruptcy');
            if (paymentStatus === false) {
              console.log('outer');
              this.pendingAmountForBankruptcy = Number((+this.pendingAmountForBankruptcy + movePayment).toFixed(2));
              this.pendingCountForBankruptcy=this.pendingCountForBankruptcy+1;
              if (this.pendingCountForCollection > 0 && this.pendingAmountForCollection > 0.00) {
                this.pendingAmountForCollection = Number((+this.pendingAmountForCollection - movePayment).toFixed(2));
                this.pendingCountForCollection=this.pendingCountForCollection-1;
                console.log('inner');
              }
            } 
            else if (paymentStatus === true && paymentCancelled === true ) {
              console.log('outer');
              this.canceledProcessedBatchAmountForBankruptcy = Number((+this.canceledProcessedBatchAmountForBankruptcy + movePayment).toFixed(2));
              this.canceledProcessedBatchCountForBankruptcy=this.canceledProcessedBatchCountForBankruptcy+1;
              if (this.canceledProcessedBatchCountForCollection > 0 && this.canceledProcessedBatchAmountForCollection > 0.00) {
                this.canceledProcessedBatchAmountForCollection =Number((+this.canceledProcessedBatchAmountForCollection - movePayment).toFixed(2));
                this.canceledProcessedBatchCountForCollection=this.canceledProcessedBatchCountForCollection-1;
                console.log('inner');
              }
            }
            else {
              console.log('outer');
              this.processedAmountForBankruptcy = Number((+this.processedAmountForBankruptcy + movePayment).toFixed(2));
              this.processedCountForBankruptcy=this.processedCountForBankruptcy+1;
              if (this.processedCountForCollection > 0 && this.processedAmountForCollection > 0.00) {
                this.processedAmountForCollection = Number((+this.processedAmountForCollection - movePayment).toFixed(2));
                this.processedCountForCollection=this.processedCountForCollection-1;
                console.log('inner');
              }
            }
            this.totalAmountForBankruptcy =  Number((+this.totalAmountForBankruptcy + movePayment ).toFixed(2));
            if( this.totalAmountForCollection>0.00){
              this.totalAmountForCollection =  Number((+this.totalAmountForCollection - movePayment).toFixed(2));
            }
            if(this.bankruptcy.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
              this.processRemovedFromBackendForBankruptcy=false;
              console.log('*****************false');
               }else if(this.bankruptcy.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForBankruptcy=true;
              console.log('******************true');
               }
               if(this.collection.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                this.processRemovedFromBackendForCollections=false;
                console.log('*****************false');
                 }else if(this.collection.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                  this.processRemovedFromBackendForCollections=true;
                console.log('******************true');
                 }
          }
          this.appComp.showProgressBar(false);
        }
      }
      else{
        console.log("Not Successfull")
        transferArrayItem(event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex);
      }
      })
      event.container.data.sort((a, b) => {
        if (a.paymentAdviceStatus) {
          return 1;
        }
        if (b.paymentAdviceStatus) {
          return -1;
        }
        return 0;
      });
    }
    }
  }

  getPaymentAdviceDetailsForAdmin(index: number, adviceType: string) {
     localStorage.clear();
     console.log('+++++++index', index);
    console.log('+++++adviceType', adviceType);

    if (adviceType === 'Cashiering') {

      this.infoForPaymentAdvice = this.cashiering[index];
      if(this.infoForPaymentAdvice.paymentAdviceStatus==true && this.infoForPaymentAdvice.removedFromBK==true && this.infoForPaymentAdvice.dateCalcelled==true){
        console.log("################### test *********");
         this.appComp.showErrorMessage("This Payment Advice was deleted from Black Knight.", '/app-admin-payment-advice-list', true);
       }else{
         console.log("################### payment-advise *********");
       
       localStorage.setItem('cashieringAdviceList', JSON.stringify(this.cashiering));
       this.router.navigate(['/payment-advise'],{queryParams : {idx:index, adviceType:'Cashiering'}})
       }
      
    } else if (adviceType === 'LossMit') {
      this.infoForPaymentAdvice = this.lossMit[index];

      if(this.infoForPaymentAdvice.paymentAdviceStatus==true && this.infoForPaymentAdvice.removedFromBK==true && this.infoForPaymentAdvice.dateCalcelled==true){
        console.log("################### test *********");
         this.appComp.showErrorMessage("This Payment Advice was deleted from Black Knight.", '/app-admin-payment-advice-list', true);
       }else{
         console.log("################### payment-advise *********");
      
       localStorage.setItem('lossMitAdviceList', JSON.stringify(this.lossMit));
       this.router.navigate(['/payment-advise'],{queryParams : {idx:index, adviceType:'LossMit'}})
       }
    } else if (adviceType === 'Bankruptcy') {
      this.infoForPaymentAdvice = this.bankruptcy[index];

      if(this.infoForPaymentAdvice.paymentAdviceStatus==true && this.infoForPaymentAdvice.removedFromBK==true && this.infoForPaymentAdvice.dateCalcelled==true){
        console.log("################### test *********");
         this.appComp.showErrorMessage("This Payment Advice was deleted from Black Knight.", '/app-admin-payment-advice-list', true);
       }else{
         console.log("################### payment-advise *********");
     
       localStorage.setItem('bankruptcyAdviceList', JSON.stringify(this.bankruptcy));
       this.router.navigate(['/payment-advise'],{queryParams : {idx:index, adviceType:'Bankruptcy'}})
       }
    } else if (adviceType === 'Collection') {
      this.infoForPaymentAdvice = this.collection[index];

      if(this.infoForPaymentAdvice.paymentAdviceStatus==true && this.infoForPaymentAdvice.removedFromBK==true && this.infoForPaymentAdvice.dateCalcelled==true){
        console.log("################### test *********");
         this.appComp.showErrorMessage("This Payment Advice was deleted from Black Knight.", '/app-admin-payment-advice-list', true);
       }else{
         console.log("################### payment-advise *********");
      
       localStorage.setItem('collectionAdviceList', JSON.stringify(this.collection));
       this.router.navigate(['/payment-advise'],{queryParams : {idx:index, adviceType:'Collection'}})
       }
    }
  }
 
  legendPopup() {
    this.appComp.dialogObj.msgHeader = 'Legend';
  this.appComp.populateLegendMessage('<div class="table-responsive"><table class="table table-bordered"><thead><tr><th scope="col font-weight-bold text-left">Card Apperence</th><th scope="col font-weight-bold text-left">Meaning</th></tr></thead><tbody><tr><th scope="row" class="text-left"><span class="info-white"></span>White Background</th><td class="text-left">The advice payment is not entered into Black Knight yet.</td></tr><tr><th scope="row" class="text-left"><span class="info-white info-green"></span>Green Background</th><td class="text-left">The advice payment is entered into Black Knight.</td></tr><tr><th scope="row" class="text-left"><span class="info-cancle">CANCELED</span>Yellow Background with Red CANCELED Text</th><td class="text-left">The payment was canceled after the advice was entered into Black Knight. The payment needs to be removed from Black Knight.</td></tr></tbody></table></div>', null, true);
  }
 
}
