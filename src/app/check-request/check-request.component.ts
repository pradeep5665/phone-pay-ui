import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { PhonepayPaymentsService } from '../service/phonepay-payments.service';
import { PhonepayPayments } from '../model/phonepay-payments.model';


@Component({
  selector: 'app-check-request',
  templateUrl: './check-request.component.html',
  styleUrls: ['./check-request.component.css']
})
export class CheckRequestComponent implements OnInit {

  param1: string;
  adviceGroup : string;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private phonepayPaymentsService: PhonepayPaymentsService, private appComp: AppComponent) {

  }

  checkPaymentReqForm: FormGroup;
  loanNumber: number;
  failuremessage: string;
  phonepayPayment = new PhonepayPayments();

  ngOnInit() {
    this.checkPaymentReqForm = this.formBuilder.group({
      loanNumber: ['', Validators.required]
    });
    this.adviceGroup = sessionStorage.getItem('adviceGroup');
    console.log("AdviceGroup", this.adviceGroup);
  }

  getLoanNumber(loanNum: number) {
    this.loanNumber = loanNum;
    if(this.loanNumber){
    var isRequestFromPaymentScreen : boolean = true;
    console.log('loan number =', this.loanNumber);
    this.appComp.showProgressBar(true);
    localStorage.removeItem('phonepayInfo');
    localStorage.clear();
    console.log('object after clear', this.phonepayPayment);
    this.phonepayPaymentsService.getBorrowersInfo(this.loanNumber).subscribe(
      phonepayPayment => {
        this.phonepayPayment = phonepayPayment;
        console.log(this.phonepayPayment);
        if (this.phonepayPayment.isSucessfull === true) {
          localStorage.setItem('phonepayInfo', JSON.stringify(this.phonepayPayment));
          this.appComp.showProgressBar(false);
          this.router.navigate(['phonepay-check-payment'] , { queryParams: {isRequestFromPaymentScreen}});
        } else {
          this.appComp.showErrorMessage(this.phonepayPayment.message, '/check-request', true);
          this.checkPaymentReqForm.reset();
        }
      });
    }else{
      '/check-request';
    }
  }

  getAdviceGroup(){
    var adviceGroup = sessionStorage.getItem("adviceGroup");
    console.log(adviceGroup);
    if(adviceGroup){
      return true;
    }
    return false;
  }

}
