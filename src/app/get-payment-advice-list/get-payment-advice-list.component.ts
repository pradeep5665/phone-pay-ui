import { AppComponent } from '../app.component';
import { GetPaymentAdviceService } from '../service/get-payment-advice.service';
import { GetPaymentAdviceListModel } from '../model/get-payment-advice-list-model';
import { GetPaymentAdviceListDto } from '../model/get-payment-advice-list-dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'get-payment-advice-list',
  templateUrl: './get-payment-advice-list.component.html',
  styleUrls: ['./get-payment-advice-list.component.css']
})
export class GetPaymentAdviceListComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private getScheduledPaymentService: GetPaymentAdviceService, private appComp: AppComponent) { }
  loanNumbers: number[] = new Array;
  infoForPaymentAdvice: GetPaymentAdviceListDto;
  paymentAdvice = new GetPaymentAdviceListModel();
  paymentAdviceList: GetPaymentAdviceListDto[] = new Array;
  paymentAdviceType: string;
  userDetails: any;
  adviceGroupMap = new Map();

  
pendingAmountForAdvice = '0.00';
pendingCountForAdvice = 0;
canceledProcessedBatchAmountForAdvice='0.00';
canceledProcessedBatchCountForAdvice=0;
processedAmountForAdvice = '0.00';
processedCountForAdvice = 0;
totalAmountForAdvice = '0.00';
processRemovedFromBackendForAdvice = false;
adviceType = new Array();
adviceName  : string;

  ngOnInit() {
    this.appComp.showProgressBar(true);
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    console.log('this.userDetails.adviceGroup', this.userDetails.adviceGroup);
    console.log('this.userDetails.adviceGroup', this.userDetails.adviceGroup);
    this.adviceGroupMap.set("AdviceLossMit", "Loss Mit");
    this.adviceGroupMap.set("AdviceBankruptcy", "Bankruptcy");
    this.adviceGroupMap.set("AdviceCollections", "Collections");
    this.adviceGroupMap.set("AdviceCashiering", "Cashiering");

    this.paymentAdviceType = this.adviceGroupMap.get(this.userDetails.adviceGroup)
    console.log('paymentAdviceType', this.paymentAdviceType);
    console.log('this.userDetails.authorities', this.userDetails.authorities);

    if (this.userDetails.authorities === 'ServicingAdmin') {
      this.getScheduledPaymentService.getAllPaymentAdviceDetails().subscribe(
        paymentAdvice => {
        this.paymentAdvice = paymentAdvice
          console.log(this.paymentAdvice);
          if (this.paymentAdvice.isSuccessful) {
            this.appComp.showProgressBar(false);
            this.paymentAdviceList = this.paymentAdvice.paymentAdviceDetailsDto;
            console.log('+++++++++++', this.paymentAdviceList);
            this.paymentAdviceList.sort((a, b) => {
              if (a.paymentAdviceStatus) {
                console.log('a.paymentAdviceStatus', a.paymentAdviceStatus)
                return 1;
              }
              if (b.paymentAdviceStatus) {
                console.log('b.paymentAdviceStatus', b.paymentAdviceStatus)
                return -1;
              }
              return 0;
            });

          } else {
            this.appComp.populateMessage(this.paymentAdvice.message, null, false);
            this.router.navigate(['/check-request'])
          }
        });
    } else {
      this.getScheduledPaymentService.getPaymentAdviceDetails(this.paymentAdviceType).subscribe(
        paymentAdvice => {
        this.paymentAdvice = paymentAdvice
          console.log(this.paymentAdvice);
          if (this.paymentAdvice.isSuccessful) {
            this.appComp.showProgressBar(false);
            this.paymentAdviceList = this.paymentAdvice.paymentAdviceDetailsDto;
            console.log('********', this.paymentAdviceList);

            this.paymentAdviceList.forEach(paymentAdvice => {
              //if (paymentAdvice.paymentAdviceType === 'Cashiering') {
                this.adviceName = paymentAdvice.paymentAdviceType;
                console.log("this.adviceName :::::::::::::"+this.adviceName)
                          console.log(paymentAdvice.dateCalcelled)
                          if (paymentAdvice.paymentAdviceStatus === false && paymentAdvice.dateCalcelled===false) {
                            this.pendingAmountForAdvice = (+this.pendingAmountForAdvice + (+paymentAdvice.totalPayment * 1 || 0)).toFixed(2);
                            this.pendingCountForAdvice++;
                          } else if(paymentAdvice.paymentAdviceStatus===true && paymentAdvice.dateCalcelled===true){
                            this.canceledProcessedBatchAmountForAdvice = (+this.canceledProcessedBatchAmountForAdvice + (+paymentAdvice.totalPayment * 1 || 0)).toFixed(2);
                            this.canceledProcessedBatchCountForAdvice++;
                          }else if(paymentAdvice.paymentAdviceStatus===true && paymentAdvice.dateCalcelled===false) {
                            this.processedAmountForAdvice = (+this.processedAmountForAdvice + (+paymentAdvice.totalPayment * 1 || 0)).toFixed(2);
                            this.processedCountForAdvice++;
                          }
                          this.adviceType.push(paymentAdvice);
                          this.totalAmountForAdvice = (+this.totalAmountForAdvice + (+paymentAdvice.totalPayment * 1 || 0)).toFixed(2);
                          console.log('this.totalAmountForAdvice', this.totalAmountForAdvice);
                          console.log('adviceType : ', this.adviceType);
                          if(this.adviceType.some((item)=> item.removedFromBK === false && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                            this.processRemovedFromBackendForAdvice=false;
                            console.log('*****************false');
                             }else if(this.adviceType.some((item)=> item.removedFromBK === true && item.paymentAdviceStatus===true && item.dateCalcelled === true)){
                              this.processRemovedFromBackendForAdvice=true;
                            console.log('******************true');
                             }
            
                       // }
                  })


            this.paymentAdviceList.sort((a, b) => {
              if (a.paymentAdviceStatus) {
                console.log('a.paymentAdviceStatus', a.paymentAdviceStatus)
                return 1;
              }
              if (b.paymentAdviceStatus) {
                console.log('b.paymentAdviceStatus', b.paymentAdviceStatus)
                return -1;
              }
              return 0;
            });
          } else {
            this.appComp.populateMessage(this.paymentAdvice.message + ' for ' + this.userDetails.name, null, false);
            this.router.navigate(['/check-request'])
          }
        });
    }
  }

  getPaymentAdviceDetails(index: number) {
    localStorage.clear();
    console.log('+++++++', index);
    this.infoForPaymentAdvice = this.paymentAdvice.paymentAdviceDetailsDto[index];
    //localStorage.setItem('paymentAdviceDetail', JSON.stringify(this.infoForPaymentAdvice));
    console.log('-------', this.infoForPaymentAdvice);
    //this.router.navigate(['/payment-advise']);

if(this.adviceName==='Cashiering'){
  console.log("ServiceAgentAdiceName *********:"+this.adviceName);
    localStorage.setItem('cashieringAdviceList', JSON.stringify(this.paymentAdviceList));
}else if(this.adviceName==='Loss Mit'){
  localStorage.setItem('lossMitAdviceList', JSON.stringify(this.paymentAdviceList));
  console.log("lossMitAdviceList >>>>>>>>>>>>>>"+localStorage.getItem('lossMitAdviceList'));
}
else if(this.adviceName==='Bankruptcy'){
  localStorage.setItem('bankruptcyAdviceList', JSON.stringify(this.paymentAdviceList));
}
else if(this.adviceName==='Collections'){
  localStorage.setItem('collectionAdviceList', JSON.stringify(this.paymentAdviceList));
}
    this.router.navigate(['/payment-advise'],{queryParams : {idx:index, adviceType:this.adviceName}})
  }

}