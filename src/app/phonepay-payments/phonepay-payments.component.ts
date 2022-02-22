import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhonepayPayments } from '../model/phonepay-payments.model';
import { AppComponent } from '../app.component';
import { PhonepayPaymentsService } from '../service/phonepay-payments.service';
import { BankingInfo } from '../model/banking-info';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-phonepay-payments',
  templateUrl: './phonepay-payments.component.html',
  styleUrls: ['./phonepay-payments.component.css']
})

export class PhonepayPaymentsComponent implements OnInit {
  submitted: boolean;
  invalidroutingNum: boolean;
  phonepayPayment = new PhonepayPayments();
  bankingInfo = new BankingInfo();
  emptyRoutingOrAccount: boolean;
  isVerfyInfoClicked: boolean;
  isSuccessful: boolean;
  message: string;
  loanNumber: number;
  routingNum: string;
  accountNum: string;
  bankName: string;
  borrowerName: string;
  borrowerEmail: string;
  loanNumbers: number[] = new Array;
  emailList: string[] = new Array;
  phonpayForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private appComp: AppComponent, private phonepayPaymentsService: PhonepayPaymentsService) { }

   ngOnInit() {
    // this.phonepayPayment = this.activatedRoute.snapshot.data.phonepayPayment;
    this.phonpayForm = this.formBuilder.group({
    });

    this.phonepayPayment = JSON.parse(sessionStorage.getItem('phonepayInfo'));
    console.log(this.phonepayPayment);

      this.loanNumbers.push(this.phonepayPayment.loanInfoList[0].loanNumber);
      this.loanNumbers.push(this.phonepayPayment.loanInfoList[1].loanNumber);

      sessionStorage.removeItem('loanAccounts');
      sessionStorage.removeItem('borrowerName');
      sessionStorage.removeItem('borrowerEmail');
      sessionStorage.setItem('loanAccounts', JSON.stringify(this.loanNumbers));
      sessionStorage.setItem('borrowerName', this.phonepayPayment.borrowerName);
  }

  getEmail(email: string) {
    this.borrowerEmail = email;
    sessionStorage.setItem('borrowerEmail', this.borrowerEmail);
    console.log(sessionStorage.getItem('borrowerEmail'));
    this.emailList.push(this.borrowerEmail);
    console.log('Email List = ', this.emailList);
  }

}
