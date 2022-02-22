import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { PaymentsInProcessService } from '../service/payments-in-process.service';
import { PaymentsInProcessResponse } from '../model/payments-in-process-response';
import { PaymentsInProcessDto } from '../model/payments-in-process-dto';
import { PhonepayPaymentsService } from '../service/phonepay-payments.service';
import { PhonepayPayments } from '../model/phonepay-payments.model';
import {formatDate } from '@angular/common';
@Component({
  selector: 'app-payments-in-process',
  templateUrl: './payments-in-process.component.html',
  styleUrls: ['./payments-in-process.component.css']
})
export class PaymentsInProcessComponent implements OnInit {

  paymentInProcessForm: FormGroup;
  userDetails: any;
  paymentInProcessResponse = new PaymentsInProcessResponse();
  paymentInProcessList: PaymentsInProcessDto[];
  paymentInProcessForTransactioList: PaymentsInProcessDto[] = [];
  payorLastName: string[] = new Array;
  totalCount = 0;
  totalPayment = '0.00';
  totalAdvicePaymentCount = 0;
  totalAdvicePayment = '0.00';
  totalNonAdvicePaymentCount = 0;
  totalNonAdvicePayment = '0.00';
  isCollector: boolean;
  isTransactionTotal: boolean;
  totalTransaction = '0.00';
  totalTransactionCount = 0;
  totalAdviceTransactionCount = 0;
  totalAdviceTransaction = '0.00';
  totalNonAdviceTransactionCount = 0;
  totalNonAdviceTransaction = '0.00';
  sortingOrder: string;
  sortingType: string = 'Loan Number';
  

  phonepayPayment = new PhonepayPayments();

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private appComp: AppComponent, private paymentsInProcessService: PaymentsInProcessService, private phonepayPaymentsService: PhonepayPaymentsService) { }

  ngOnInit() {
    this.paymentInProcessForm = this.formBuilder.group({
      sortingOrder: new FormControl('Ascending')
    });

    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    this.appComp.showProgressBar(true);
    this.paymentsInProcessService.getPaymentsInProcessList().subscribe(
      paymentInProcessResponse => {
        this.paymentInProcessResponse = paymentInProcessResponse;
        if (this.paymentInProcessResponse.isSuccessful) {
          this.appComp.showProgressBar(false);
          this.paymentInProcessList = this.paymentInProcessResponse.paymentInProcessList;
          this.paymentInProcessList.forEach(paymentInProcess => {
            paymentInProcess.isTransactionTotalCalculated = false;
            paymentInProcess.isVisible = true;
            this.paymentInProcessForTransactioList.push(paymentInProcess);
            if (paymentInProcess.payorName != null) {
              let x = paymentInProcess.payorName.split(" ");
              if (x.length > 2) {
                for (let i = 2; i < x.length; i++) {
                  paymentInProcess.payorLastName = x[1].concat(' ').concat(x[i]);
                }
              } else if (x.length === 2) {
                paymentInProcess.payorLastName = x[1];
              } else if (x.length === 1) {
                paymentInProcess.payorLastName = x[0];
              }

              this.payorLastName.push(paymentInProcess.payorLastName);
            } else {
              console.log('this.payorLastName is null ');
            }
            console.log("paymentInProcess : "+paymentInProcess);
            if (paymentInProcess.advice) {
              this.totalAdvicePayment = (+this.totalAdvicePayment + (+paymentInProcess.totalPayment * 1 || 0)).toFixed(2);
              this.totalAdvicePaymentCount++;
            } else {
              this.totalNonAdvicePayment = (+this.totalNonAdvicePayment + (+paymentInProcess.totalPayment * 1 || 0)).toFixed(2);
              this.totalNonAdvicePaymentCount++;
            }
          });
          console.log('List of last name', this.payorLastName);
          this.totalPayment = (+this.totalPayment + (+this.totalAdvicePayment * 1 || 0) + (+this.totalNonAdvicePayment * 1 || 0)).toFixed(2);
        } else {
        if (this.userDetails.authorities === 'ServicingAdmin') {
          this.router.navigate(['/app-admin-dashboard']);
        }else{
          this.router.navigate(['/check-request']);
        }
          this.appComp.showErrorMessage(this.paymentInProcessResponse.message, null, false);
        }
        console.log('*******', this.paymentInProcessList)
      }
    )
  }

  addSelectedOrder() {
    this.sortingOrder = this.paymentInProcessForm.get('sortingOrder').value;
    if (this.sortingType === 'Loan Number') {
      if (this.sortingOrder === 'Descending') {
        this.sortByLoanNumberInDescending();
      } else if (this.sortingOrder === 'Ascending') {
        this.sortByLoanNumberInAscending();
      }
    } else if (this.sortingType === 'Last Name') {
      if (this.sortingOrder === 'Descending') {
        this.sortByLoanNumberInAscending();
        this.sortByLastNameInDescending();
      } else if (this.sortingOrder === 'Ascending') {
        this.sortByLoanNumberInAscending();
        this.sortByLastNameInAscending();
      }
    } else if (this.sortingType === 'Date Time') {
      if (this.sortingOrder === 'Descending') {
        this.sortByLoanNumberInAscending();
        this.sortByDateTimeInDescending();
      } else if (this.sortingOrder === 'Ascending') {
        this.sortByLoanNumberInAscending();
        this.sortByDateTimeInAscending();
      }
    } else if (this.sortingType === 'Payment Amount') {
      if (this.sortingOrder === 'Descending') {
        this.sortByPaymentAmountInDescending();
      } else if (this.sortingOrder === 'Ascending') {
        this.sortByPaymentAmountInAscending();
      }
    } else if (this.sortingType === 'Processor') {
      if (this.sortingOrder === 'Descending') {
        this.sortByLoanNumberInAscending();
        this.sortByCollectorInDescending();
      } else if (this.sortingOrder === 'Ascending') {
        this.sortByLoanNumberInAscending();
        this.sortByCollectorInAscending();
      }
    } else if (this.sortingType === 'Transaction Total') {
      if (this.sortingOrder === 'Descending') {
        this.sortTransactionTotalInDescending();
      } else if (this.sortingOrder === 'Ascending') {
        this.sortTransactionTotalInAscending();
      }
    }
  }

  sortPaymentsInProcess(event, sortBy: string) {
    this.sortingOrder = this.paymentInProcessForm.get('sortingOrder').value;
    if (event.target.checked) {
      this.sortingType = sortBy;
      if (sortBy === 'Last Name') {
        console.log(this.sortingOrder);
        if (this.sortingOrder == 'Ascending') {
          this.sortByLastNameInAscending();
        } else if (this.sortingOrder === 'Descending') {
          this.sortByLastNameInDescending();
        }
      } else if (sortBy === 'Loan Number') {
        if (this.sortingOrder == 'Ascending') {
          this.sortByLoanNumberInAscending();
        } else if (this.sortingOrder === 'Descending') {
          this.sortByLoanNumberInDescending();
        }
      } else if (sortBy === 'Date Time') {
        if (this.sortingOrder == 'Ascending') {
          this.sortByDateTimeInAscending();
        } else if (this.sortingOrder === 'Descending') {
          this.sortByDateTimeInDescending();
        }
      } else if (sortBy === 'Payment Amount') {
        if (this.sortingOrder == 'Ascending') {
          this.sortByPaymentAmountInAscending();
        } else if (this.sortingOrder === 'Descending') {
          this.sortByPaymentAmountInDescending();
        }
      } else if (sortBy === 'Processor') {
        if (this.sortingOrder == 'Ascending') {
          this.sortByCollectorInAscending();
        } else if (this.sortingOrder === 'Descending') {
          this.sortByCollectorInDescending();
        }
      } else if (sortBy === 'Transaction Total') {
        this.sortByTransactionTotal(sortBy, this.sortingOrder);
      }
    }
  }


  sortByLastNameInAscending() {
    this.isCollector = false;
    this.isTransactionTotal = false;
    this.totalTransactionCount = 0;
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.totalTransaction = '0.00';
    this.paymentInProcessForTransactioList = [];
    this.paymentInProcessList.forEach(paymentInProcess => {
      paymentInProcess.transactionAdvice = false;
      paymentInProcess.isTransactionTotalCalculated = false;
      this.paymentInProcessForTransactioList.push(paymentInProcess);
    });

    this.paymentInProcessList.sort((a, b) => {
      if (a.payorLastName !== null && a.payorLastName !== undefined && a.payorLastName !== '') {
        var nameA = a.payorLastName.toLowerCase();
      }
      if (b.payorLastName !== null && b.payorLastName !== undefined && b.payorLastName !== '') {
        var nameB = b.payorLastName.toLowerCase();
      }
      if (nameA === nameB) {
        var associatedLoanList1 = a.associatedLoanAccounts;
        var associatedLoanList2 = b.associatedLoanAccounts;
        if (associatedLoanList1[0] === associatedLoanList2[0]) {
          return 0;
        } else if (associatedLoanList1[0] > associatedLoanList2[0]) {
          return 1;
        } else if (associatedLoanList1[0] < associatedLoanList2[0]) {
          return -1;
        }
      } else {
        if (nameA < nameB) { 
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    console.log('sorted payments list by last name in ascending order ', this.paymentInProcessList)
  }

  sortByLastNameInDescending() {
    this.isCollector = false;
    this.isTransactionTotal = false;
    this.totalTransactionCount = 0;
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.totalTransaction = '0.00';
    this.paymentInProcessForTransactioList = [];
    this.paymentInProcessList.forEach(paymentInProcess => {
      paymentInProcess.transactionAdvice = false;
      paymentInProcess.isTransactionTotalCalculated = false;
      this.paymentInProcessForTransactioList.push(paymentInProcess);
    });
    this.paymentInProcessList.sort((a, b) => {
      if (a.payorLastName !== null && a.payorLastName !== undefined && a.payorLastName !== '') {
        var nameA = a.payorLastName.toLowerCase();
      }
      if (b.payorLastName !== null && b.payorLastName !== undefined && b.payorLastName !== '') {
        var nameB = b.payorLastName.toLowerCase();
      }
      if (nameA === nameB) {
        var associatedLoanList1 = a.associatedLoanAccounts;
        var associatedLoanList2 = b.associatedLoanAccounts;
        if (associatedLoanList1[0] === associatedLoanList2[0]) {
          return 0;
        } else if (associatedLoanList1[0] > associatedLoanList2[0]) {
          return 1;
        } else if (associatedLoanList1[0] < associatedLoanList2[0]) {
          return -1;
        }
      } else {
        if (nameA > nameB) { 
          return -1;
        } else if (nameA < nameB) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

  sortByLoanNumberInAscending() {
    console.log('entered in Loan Number sorting section');
    this.isCollector = false;
    this.isTransactionTotal = false;
    this.totalTransactionCount = 0;
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.paymentInProcessForTransactioList = [];
    this.paymentInProcessList.forEach(paymentInProcess => {
      paymentInProcess.transactionAdvice = false;
      paymentInProcess.isTransactionTotalCalculated = false;
      this.paymentInProcessForTransactioList.push(paymentInProcess);
    });
    this.paymentInProcessList.sort((a, b) => {
      if (a.loanNumber < b.loanNumber)
        return -1;
      if (a.loanNumber > b.loanNumber)
        return 1;
      return 0;
    });
  }

  sortByLoanNumberInDescending() {
    console.log('entered in Loan Number descending sorting section');
    this.isCollector = false;
    this.isTransactionTotal = false;
    this.totalTransactionCount = 0;
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.totalTransaction = '0.00';
    this.paymentInProcessForTransactioList = [];
    this.paymentInProcessList.forEach(paymentInProcess => {
      paymentInProcess.transactionAdvice = false;
      paymentInProcess.isTransactionTotalCalculated = false;
      this.paymentInProcessForTransactioList.push(paymentInProcess);
    });
    this.paymentInProcessList.sort((a, b) => {
      if (a.loanNumber > b.loanNumber) 
        return -1;
      if (a.loanNumber < b.loanNumber)
        return 1;
      return 0;
    });
  }


  sortByDateTimeInAscending() { 
    this.isCollector = false;
    this.isTransactionTotal = false;
    this.totalTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalTransaction = '0.00';
    this.paymentInProcessForTransactioList = [];
    this.paymentInProcessList.forEach(paymentInProcess => {
      paymentInProcess.transactionAdvice = false;
      paymentInProcess.isTransactionTotalCalculated = false;
      this.paymentInProcessForTransactioList.push(paymentInProcess);
    });
    this.paymentInProcessList.sort((a, b) => {
      console.log('entered in Date Time sorting section');
      let dateA = new Date(a.dateTime.slice(0, -2));
      let dateB = new Date(b.dateTime.slice(0, -2));
      
      if (dateA === dateB) {
        if (a.payorName < b.payorName) {
          return -1;
        } else if (a.payorName > b.payorName) {
          return 1;
        } else if (a.payorName === b.payorName) {
          return 0;
        }
      }
     
      return <any> new Date(dateA) - <any> new Date(dateB);
     
    });
     console.log('sorted payments list by Date in ascending order ', this.paymentInProcessList)
  }

  sortByDateTimeInDescending() {
    this.isCollector = false;
    this.isTransactionTotal = false;
    this.totalTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalTransaction = '0.00';
    this.paymentInProcessForTransactioList = [];
    this.paymentInProcessList.forEach(paymentInProcess => {
      paymentInProcess.transactionAdvice = false;
      paymentInProcess.isTransactionTotalCalculated = false;
      this.paymentInProcessForTransactioList.push(paymentInProcess);
    });
    this.paymentInProcessList.sort((a, b) => {
      console.log('entered in Date Time sorting section');
      let dateA = new Date(a.dateTime.slice(0, -2));
      let dateB = new Date(b.dateTime.slice(0, -2));
      if (dateA === dateB) {
        if (a.payorName > b.payorName) {
          return -1;
        } else if (a.payorName < b.payorName) {
          return 1;
        } else if (a.payorName === b.payorName) {
          return 0;
        }
      }
      return <any>new Date(dateB) - <any>new Date(dateA);
    });
  }

  sortByPaymentAmountInAscending() {
    console.log('entered in Payment Amount sorting section');
    this.isCollector = false;
    this.isTransactionTotal = false;
    this.totalTransactionCount = 0;
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.totalTransaction = '0.00';
    this.paymentInProcessForTransactioList = [];
    this.paymentInProcessList.forEach(paymentInProcess => {
      paymentInProcess.transactionAdvice = false;
      paymentInProcess.isTransactionTotalCalculated = false;
      this.paymentInProcessForTransactioList.push(paymentInProcess);
    });
    this.paymentInProcessList.sort((a, b) => {
      if (a.totalPayment === b.totalPayment) {
        if (a.loanNumber < b.loanNumber) {
          return -1;
        } else if (a.loanNumber > b.loanNumber) {
          return 1;
        } else if (a.loanNumber === b.loanNumber) {
          return 0;
        }
      }
      if (a.totalPayment < b.totalPayment) 
        return -1;
      if (a.totalPayment > b.totalPayment)
        return 1;
    });
  }

  sortByPaymentAmountInDescending() {
    console.log('entered in Payment Amount descending sorting section');
    this.isCollector = false;
    this.isTransactionTotal = false;
    this.totalTransactionCount = 0;
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.totalTransaction = '0.00';
    this.paymentInProcessForTransactioList = [];
    this.paymentInProcessList.forEach(paymentInProcess => {
      paymentInProcess.transactionAdvice = false;
      paymentInProcess.isTransactionTotalCalculated = false;
      this.paymentInProcessForTransactioList.push(paymentInProcess);
    });
    this.paymentInProcessList.sort((a, b) => {
      if (a.totalPayment === b.totalPayment) {
        if (a.loanNumber < b.loanNumber) {
          return -1;
        } else if (a.loanNumber > b.loanNumber) {
          return 1;
        } else if (a.loanNumber === b.loanNumber) {
          return 0;
        }
      }
      if (a.totalPayment > b.totalPayment) //sort string ascending
        return -1;
      if (a.totalPayment < b.totalPayment)
        return 1;
    });
    console.log('sorted payments list by payment amount in ascending order ', this.paymentInProcessList)
  }

  sortByCollectorInAscending() {
    console.log('entered in Collector sorting section');
    this.isCollector = true;
    this.isTransactionTotal = false;
    this.totalTransactionCount = 0;
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.totalTransaction = '0.00'
   // this.sortByLoanNumberInAscending();
    this.paymentInProcessForTransactioList = [];
    this.paymentInProcessList.forEach(paymentInProcess => {
      paymentInProcess.transactionAdvice = false;
      paymentInProcess.isTransactionTotalCalculated = false;
      this.paymentInProcessForTransactioList.push(paymentInProcess);
    });
    this.paymentInProcessList.sort((a, b) => {
      if (a.collector === b.collector) {
        console.log('same collector');
        var associatedLoanList1 = a.associatedLoanAccounts;
        var associatedLoanList2 = b.associatedLoanAccounts;
        console.log("******************** : "+associatedLoanList1+" : "+associatedLoanList2);
        if (associatedLoanList1[0] === associatedLoanList2[0]) {
          return 0;
        } else if (associatedLoanList1[0] > associatedLoanList2[0]) {
          return 1;
        } else if (associatedLoanList1[0] < associatedLoanList2[0]) {
          return -1;
        }
        if (a.loanNumber < b.loanNumber) {
          return -1;
        } else if (a.loanNumber > b.loanNumber) {
          return 1;
        } else if (a.loanNumber === b.loanNumber) {
          return 0;
        }
      }
      if (a.collector < b.collector)
        return -1;
      if (a.collector > b.collector)
        return 1;
    });
  }


  sortByCollectorInDescending() {
    console.log('entered in Collector descending sorting section');
    this.isCollector = true;
    this.isTransactionTotal = false;
    this.totalTransactionCount = 0;
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.totalTransaction = '0.00';
  //  this.sortByLoanNumberInAscending();
    this.paymentInProcessForTransactioList = [];
    this.paymentInProcessList.forEach(paymentInProcess => {
      paymentInProcess.transactionAdvice = false;
      paymentInProcess.isTransactionTotalCalculated = false;
      this.paymentInProcessForTransactioList.push(paymentInProcess);
    });
    this.paymentInProcessList.sort((a, b) => {
      if (a.collector === b.collector) {
        console.log('same collector');
        var associatedLoanList1 = a.associatedLoanAccounts;
        var associatedLoanList2 = b.associatedLoanAccounts;
        if (associatedLoanList1[0] === associatedLoanList2[0]) {
          return 0;
        } else if (associatedLoanList1[0] > associatedLoanList2[0]) {
          return 1;
        } else if (associatedLoanList1[0] < associatedLoanList2[0]) {
          return -1;
        }
        if (a.loanNumber < b.loanNumber) {
          return -1;
        } else if (a.loanNumber > b.loanNumber) {
          return 1;
        } else if (a.loanNumber === b.loanNumber) {
          return 0;
        }
      }
      if (a.collector > b.collector)
        return -1;
      if (a.collector < b.collector)
        return 1;
    });
  }


  sortByTransactionTotal(sortyBy: string, sortType: string) {
    console.log('entered in transaction total sorting section');
    this.totalTransactionCount = 0;
    this.totalAdviceTransactionCount = 0;
    this.totalNonAdviceTransactionCount = 0;
    this.totalAdviceTransaction = '0.00';
    this.totalNonAdviceTransaction = '0.00';
    this.totalTransaction = '0.00';
    this.isTransactionTotal = true;
    this.isCollector = false;
    var currNode: any;
    var nextNode: any;
    var isSingleCard = true;

    var tempList: PaymentsInProcessDto[] = [];

    for (var indexC = 0; indexC < this.paymentInProcessForTransactioList.length - 1; indexC++) {
      currNode = this.paymentInProcessForTransactioList[indexC];
      if (currNode.isTransactionTotalCalculated) {
        continue;
      } else {
        currNode.isTransactionTotalCalculated = true;
        this.totalTransactionCount++; // TTC ++ ;
        for (var indexR = indexC + 1; indexR < this.paymentInProcessForTransactioList.length; indexR++) {
          nextNode = this.paymentInProcessForTransactioList[indexR];
          if (currNode.associatedLoanAccounts[0] === currNode.loanNumber) { // current node is primary 
            if (currNode.associatedLoanAccounts[1] === nextNode.loanNumber) { // next node is secondray for current node.
              nextNode.isTransactionTotalCalculated = true;
              currNode.totalTransactionPayment = currNode.totalPayment + nextNode.totalPayment;
              // both cards exists.
              if (currNode.advice || nextNode.advice) {
                if (!currNode.advice) {
                  // if secondary account is having advice
                  currNode.transactionAdvice = true;
                }
                this.totalAdviceTransactionCount++;
                this.totalAdviceTransaction = ((+this.totalAdviceTransaction * 1 || 0) + (+currNode.totalTransactionPayment * 1 || 0)).toFixed(2);
              } else {
                this.totalNonAdviceTransaction = ((+this.totalNonAdviceTransaction * 1 || 0) + (+currNode.totalTransactionPayment * 1 || 0)).toFixed(2);
                this.totalNonAdviceTransactionCount++;
              }
              //removal of secondary loan if primary exist
              nextNode.isVisible = false;
              isSingleCard = false;
              break;
            } else { // next node is not secondray for current node.
              // skip to next
              isSingleCard = true;
            }
          } else {  // current node is secondary
          }
        }
        if (isSingleCard) {
          currNode.totalTransactionPayment = currNode.totalPayment;
          nextNode.totalTransactionPayment = nextNode.totalPayment;
          if (currNode.advice) {
            this.totalAdviceTransactionCount++;
            this.totalAdviceTransaction = ((+this.totalAdviceTransaction * 1 || 0) + (+currNode.totalTransactionPayment * 1 || 0)).toFixed(2);
          } else {
            this.totalNonAdviceTransactionCount++;
            this.totalNonAdviceTransaction = ((+this.totalNonAdviceTransaction * 1 || 0) + (+currNode.totalTransactionPayment * 1 || 0)).toFixed(2);
          }
        }
      }
    }
    this.totalTransaction = ((+this.totalAdviceTransaction * 1 || 0) + (+this.totalNonAdviceTransaction * 1 || 0)).toFixed(2);
    this.totalTransactionCount = this.totalAdviceTransactionCount + this.totalNonAdviceTransactionCount;

    tempList = this.paymentInProcessForTransactioList;
    console.log('tempList ', tempList);

    this.paymentInProcessForTransactioList = [];
    tempList.forEach(paymentInProcessTransactio => {
      if (paymentInProcessTransactio.isVisible) {
        this.paymentInProcessForTransactioList.push(paymentInProcessTransactio);
      }

    })

    if (sortyBy === 'Transaction Total' && sortType === 'Ascending') {
      this.sortTransactionTotalInAscending();
    } else if (sortyBy === 'Transaction Total' && sortType === 'Descending') {
      this.sortTransactionTotalInDescending();
    }

  }
  sortTransactionTotalInAscending() {
    //////////////// sorting for transaction....
    this.paymentInProcessForTransactioList.sort((a, b) => {
      if (a.totalTransactionPayment < b.totalTransactionPayment) //sort string ascending
        return -1;
      if (a.totalTransactionPayment > b.totalTransactionPayment)
        return 1;
      return 0;
    });
    console.log('sorted payments list by tranaction total in ascending order ', this.paymentInProcessForTransactioList);
  }

  sortTransactionTotalInDescending() {
    //////////////// sorting for transaction....
    this.paymentInProcessForTransactioList.sort((a, b) => {
      if (a.totalTransactionPayment > b.totalTransactionPayment) //sort string ascending
        return -1;
      if (a.totalTransactionPayment < b.totalTransactionPayment)
        return 1;
      return 0;
    });
    console.log('sorted payments list by tranaction total in descending order ', this.paymentInProcessForTransactioList);
  }

  getPaymentInfo(loanNumber: number, index: number) {
    console.log('getPaymentInfo method called ', loanNumber)
    console.log('index ******* ', index, this.paymentInProcessList[index]);
    var isRequestFromPaymentScreen: boolean = false;
    this.appComp.showProgressBar(true);
    localStorage.removeItem('phonepayInfo');
    localStorage.clear();
    console.log('object after clear', JSON.parse(localStorage.getItem('phonepayInfo')));
    if (this.paymentInProcessList[index].adviceCompleted && this.paymentInProcessList[index].cancelled) {
      this.appComp.showErrorMessageForBatchPayment("The payment for loan "+this.paymentInProcessList[index].loanNumber.toString()+" is CANCELED and in a BlackKnight batch. The person who entered the payment must remove it from their BlackKnight batch then use the Payment Advice List screen to remove the payment from PhonePay.", null, true);
    } else {
      this.phonepayPaymentsService.getBorrowersInfo(loanNumber).subscribe(
        phonepayPayment => {
          this.phonepayPayment = phonepayPayment;
          console.log(this.phonepayPayment);
          if (this.phonepayPayment.isSucessfull === true) {
            localStorage.setItem('phonepayInfo', JSON.stringify(this.phonepayPayment));
            this.appComp.showProgressBar(false);
            this.router.navigate(['phonepay-check-payment'], { queryParams: { isRequestFromPaymentScreen } });
          } else {
            this.appComp.showErrorMessage(this.phonepayPayment.message, '/check-request', true);
          }
        });
    }

  }

  legendPopup() {
    this.appComp.dialogObj.msgHeader = 'Legend';
 // this.appComp.populateMessage('<div ><span class="fas fa-square yellow-text"></span><span>Payment canceled after advice entered into Black Knight.The payment needs to be removed from Black Knight </h2></span><br/><span class="fas fa-square green-text"></span><span>Advice payment entered into Black Knight</span><br/><span class="fas fa-square grey-text"></span><span>Advice payment not entered into Black Night</span></div>', null, true);
 this.appComp.populateLegendMessage('<div class="table-responsive"><table class="table table-bordered"><thead><tr><th scope="col  text-left">Card Apperence</th><th scope="col  text-left">Meaning</th></tr></thead><tbody><tr><th scope="row" class="text-left"><div class="flag-wrap"><span class="info-flag"></span></div>White upper right corner</th><td class="text-left">This is a Regular Payment. </td></tr><tr> <th scope="row" class="text-left"> <div class="flag-wrap"> <span class="info-flag custom-red">*</span> </div> Red upper right corner </th> <td class="text-left">The advice is not entered into Black Knight yet.</td> </tr> <tr> <th scope="row" class="text-left"> <div class="flag-wrap"> <span class="info-flag custom-green">*</span> </div> Green upper right corner </th> <td class="text-left">The advice is entered in to Black Knight.</td> </tr> <tr> <th scope="row" class="text-left"> <div class="flag-wrap"> <span class="info-flag custom-yellow">*</span> </div> Yellow upper right corner </th> <td class="text-left">The payment was canceled after the advice was entered into Black Knight.</td> </tr> <tr> <th scope="row" class="text-left"><span class="info-cancle info-underline text-underline " >Name</span>Underlined name</th> <td class="text-left">The Payor is "Other".</td> </tr> </tbody> </table></div>', null, true);
}
}


