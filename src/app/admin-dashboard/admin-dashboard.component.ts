import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhonepayPaymentsService } from '../service/phonepay-payments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { PhonepayPayments } from '../model/phonepay-payments.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  checkPaymentReqForm: FormGroup;
  loanNumber: number;
  failuremessage: string;
  phonepayPayment = new PhonepayPayments();

  constructor(private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private router: Router,
    private phonepayPaymentsService: PhonepayPaymentsService, private appComp: AppComponent) { }

  ngOnInit() {
    this.checkPaymentReqForm = this.formBuilder.group({
      loanNumber: ['', Validators.required]
    });
  }


  getLoanNumber(loanNum: number) {
    this.loanNumber = loanNum;
    console.log('loan number =' , this.loanNumber);
    if(this.loanNumber){
    var isRequestFromPaymentScreen : boolean = true;
    this.appComp.showProgressBar(true);
    localStorage.clear();
    this.phonepayPaymentsService.getBorrowersInfo(this.loanNumber).subscribe(
      phonepayPayment => { this.phonepayPayment = phonepayPayment;
        console.log(this.phonepayPayment);
        if (this.phonepayPayment.isSucessfull === true) {
          localStorage.setItem('phonepayInfo', JSON.stringify(this.phonepayPayment));
          this.appComp.showProgressBar(false);
            this.router.navigate(['phonepay-check-payment'] , { queryParams: {isRequestFromPaymentScreen}});
        } else {
          this.appComp.showErrorMessage(this.phonepayPayment.message, '/app-admin-dashboard', true);
          this.checkPaymentReqForm.reset();
         // this.router.navigate(['check-request']);
        }
     
      });
    }else{
      this.router.navigate(['app-admin-dashboard']);
    }
  }

}
