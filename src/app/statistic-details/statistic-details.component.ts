import { Component, OnInit } from '@angular/core';
import { GetStatisticDetailsResponse } from '../model/get-statistic-details-response';
import { StatisticDetailsService } from '../service/statistic-details.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { GetStatisticDetailsDto } from '../model/get-statistic-details-dto';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { StatisticPaymentDto } from '../model/statistic-payment-dto';

interface Post {
  dateFrom: Date;
  dateTo: Date;
}
@Component({
  selector: 'app-statistic-details',
  templateUrl: './statistic-details.component.html',
  styleUrls: ['./statistic-details.component.css']
})
export class StatisticDetailsComponent implements OnInit {

  userDetails: any;
  statisticResponse = new GetStatisticDetailsResponse();
  statisticPaymentList: GetStatisticDetailsDto[] = [];
  statisticsListByMonth: GetStatisticDetailsDto[] = [];
  paymentDto: StatisticPaymentDto[] = [];
  regularPaymentList: StatisticPaymentDto[] = [];
  cashieringPaymentList: StatisticPaymentDto[] = [];
  lossMitPaymentList: StatisticPaymentDto[] = [];
  bankRuptcyPaymentList: StatisticPaymentDto[] = [];
  collectionPaymentList: StatisticPaymentDto[] = [];
  monthNames = [];
  agentNames = [];
  monthTotalAmount = [];
  monthTotalCount = [];
  statisticDetailForm: FormGroup;
  startDate: string;
  endDate: string;
  expandedIndex: number;
  expandedIndexForAgent: number;
  isExpanded = false;
  monthForSelectedRow: string;
  isAllSelectedWithGrandTotal = false;
  isAllSelectedWithMonth = false;
  isRegSelectedWithMonth = false;
  isLmSelectedWithMonth = false;
  isBkSelectedWithMonth = false;
  isCshSelectedWithMonth = false;
  isColSelectedWithMonth = false;
  isAgentSelectedWithMonth = false;

  isAllSelectedWithDate = false;
  isRegSelectedWithDate = false;
  isLmSelectedWithDate = false;
  isBkSelectedWithDate = false;
  isCshSelectedWithDate = false;
  isColSelectedWithDate = false;
  isAgentSelectedWithDate = false;

  selectedMonth: string;
  selectedDate: string;
  regularPaymentCount: number;
  regularPaymentAmount: number;
  cashieringPaymentCount: number;
  cashieringPaymentAmount: number;
  lossMitPaymentCount: number;
  lossMitPaymentAmount: number;
  bankRuptcyPaymentCount: number;
  bankRuptcyPaymentAmount: number;
  collectionPaymentCount: number;
  collectionPaymentAmount: number;
  grandTotalAmount: number;
  grandTotalNumber: number;
  grandTotalNum : number;
  grandTotalYear: any;

  post: Post = {
    dateFrom: new Date(Date.now()),
    dateTo: new Date(Date.now())
  }

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router,
    private appComp: AppComponent, private statisticDetailsService: StatisticDetailsService) { }

  ngOnInit() {
    this.statisticDetailForm = this.formBuilder.group({
      dateFrom: [formatDate(this.post.dateFrom, 'yyyy-MM-dd', 'en'), [Validators.required]],
      dateTo: [formatDate(this.post.dateTo, 'yyyy-MM-dd', 'en'), [Validators.required]]
    });

    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
  }

  expandRow(index: number, month: string): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.monthForSelectedRow = month;
    } else {
      this.monthForSelectedRow = '';
    }
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }

  agentName: string;
  isAgentExpanded = false
  
  expandRowForAgent(index: number, agent: string): void {
    this.isAgentExpanded = !this.isAgentExpanded;
    this.isStatusClicked = false;
    this.collapseValue='';
    this.expandedIndexForAgent = index === this.expandedIndexForAgent ? -1 : index;
      this.agentName = agent;
      if ((this.selectedMonth !== undefined && this.selectedMonth !== '') && (this.selectedDate === undefined || this.selectedDate === '')) {
        this.isAgentClickedWithMonthTotal(this.selectedMonth);
      } else if ((this.selectedDate !== undefined && this.selectedDate !== '') && (this.selectedMonth === undefined || this.selectedMonth === '')) {
        this.isAgentClickedWithDate(this.selectedDate);
      }
  }

  isAllClickedWithMonthTotal(month: string) {
    this.isRegSelectedWithMonth = false;
    this.isRegSelectedWithMonth = false;
    this.isBkSelectedWithMonth = false;
    this.isColSelectedWithMonth = false;
    this.isLmSelectedWithMonth = false;
    this.isCshSelectedWithMonth = false;
    this.isAgentSelectedWithMonth = false;

    console.log('selected month', month)
    this.regularPaymentCount = 0;
    this.regularPaymentAmount = 0;
    this.cashieringPaymentCount = 0;
    this.cashieringPaymentAmount = 0;
    this.lossMitPaymentAmount = 0;
    this.lossMitPaymentCount = 0;
    this.bankRuptcyPaymentAmount = 0;
    this.bankRuptcyPaymentCount = 0;
    this.collectionPaymentAmount = 0;
    this.collectionPaymentCount = 0;

    //this.isAllSelectedWithMonth = !this.isAllSelectedWithMonth;
    this.selectedMonth = month;
    this.statisticsListByMonth = [];
    this.regularPaymentList = [];
    this.cashieringPaymentList = [];
    this.lossMitPaymentList = [];
    this.bankRuptcyPaymentList = [];
    this.collectionPaymentList = [];
    this.agentNames = [];
    if (!this.isAllSelectedWithMonth) {
      this.isAllSelectedWithMonth = true;
    }

    if (this.isAllSelectedWithMonth) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.monthName === month).forEach(stsDet => {
        console.log("stsDet.paymentDto 555555555 :"+stsDet.paymentDto)
        if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Regular Payment') {
            this.regularPaymentAmount = this.regularPaymentAmount + pdto.totalPayment;
            this.regularPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Cashiering') {
            this.cashieringPaymentAmount = this.cashieringPaymentAmount + pdto.totalPayment;
            this.cashieringPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Loss Mit') {
            this.lossMitPaymentAmount = this.lossMitPaymentAmount + pdto.totalPayment;
            this.lossMitPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Bankruptcy') {
            this.bankRuptcyPaymentAmount = this.bankRuptcyPaymentAmount + pdto.totalPayment;
            this.bankRuptcyPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Collections') {
            this.collectionPaymentAmount = this.collectionPaymentAmount + pdto.totalPayment;
            this.collectionPaymentList.push(pdto);
          }
        }
     
        )
      }
      });
      this.regularPaymentCount = this.regularPaymentList.length;
      this.cashieringPaymentCount = this.cashieringPaymentList.length;
      this.lossMitPaymentCount = this.lossMitPaymentList.length;
      this.bankRuptcyPaymentCount = this.bankRuptcyPaymentList.length;
      this.collectionPaymentCount = this.collectionPaymentList.length;
      console.log('this.paymentDto', this.paymentDto)
      // this.regularPaymentList = this.statisticsListByMonth.filter(stsDetails=> stsDetails.paymentDto.filter(pdto=> pdto.adviceName==='Regular Payment'));
      console.log('this.regularPaymentList ', this.regularPaymentList)
    }

  }

  highlightRowforMonth(month) {
    this.selectedMonth = month;
    this.selectedDate = '';
    this.activeButton = 'All'
    this.isAllSelectedWithMonth = true;
    this.isAllClickedWithMonthTotal(month);
  }

  highlightRowforDate(date: string, month) {
    this.isExpanded=true;
    this.monthForSelectedRow=month;
    this.selectedMonth = '';
    this.selectedDate = date;
    this.activeButton = 'All'
    this.isAllSelectedWithDate = true;
    this.isAllClickedWithDate(date);
  }

  isRegClickedWithMonthTotal(month: string) {
    this.isAllSelectedWithMonth = false;
    this.isBkSelectedWithMonth = false;
    this.isColSelectedWithMonth = false;
    this.isLmSelectedWithMonth = false;
    this.isCshSelectedWithMonth = false;
    this.isAgentSelectedWithMonth = false;

    console.log('selected month', month)
    this.regularPaymentCount = 0;
    this.regularPaymentAmount = 0;
    this.isRegSelectedWithMonth = !this.isRegSelectedWithMonth;
    this.selectedMonth = month;
    this.regularPaymentList = [];
    this.agentNames = [];

    if (this.isRegSelectedWithMonth) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.monthName === month).forEach(stsDet => {
        if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Regular Payment') {
            this.regularPaymentAmount = this.regularPaymentAmount + pdto.totalPayment;
            this.regularPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.regularPaymentCount = this.regularPaymentList.length;
      console.log('this.paymentDto', this.paymentDto)
      // this.regularPaymentList = this.statisticsListByMonth.filter(stsDetails=> stsDetails.paymentDto.filter(pdto=> pdto.adviceName==='Regular Payment'));
      console.log('this.regularPaymentList ', this.regularPaymentList)
    }

  }

  isCshClickedWithMonthTotal(month) {
    this.isAllSelectedWithMonth = false;
    this.isRegSelectedWithMonth = false;
    this.isBkSelectedWithMonth = false;
    this.isColSelectedWithMonth = false;
    this.isLmSelectedWithMonth = false;
    this.isAgentSelectedWithMonth = false;
    this.cashieringPaymentCount = 0;
    this.cashieringPaymentAmount = 0;
    this.isCshSelectedWithMonth = !this.isCshSelectedWithMonth;
    this.selectedMonth = month;
    this.cashieringPaymentList = [];
    this.agentNames = [];
    this.agentNames = [];


    if (this.isCshSelectedWithMonth) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.monthName === month).forEach(stsDet => {
        if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Cashiering') {
            this.cashieringPaymentAmount = this.cashieringPaymentAmount + pdto.totalPayment;
            this.cashieringPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.cashieringPaymentCount = this.cashieringPaymentList.length;
      console.log('this.regularPaymentList ', this.cashieringPaymentList)
    }
  }

  isLmClickedWithMonthTotal(month) {
    this.isAllSelectedWithMonth = false;
    this.isRegSelectedWithMonth = false;
    this.isBkSelectedWithMonth = false;
    this.isColSelectedWithMonth = false;
    this.isCshSelectedWithMonth = false;
    this.isAgentSelectedWithMonth = false;
    this.lossMitPaymentCount = 0;
    this.lossMitPaymentAmount = 0;
    this.isLmSelectedWithMonth = !this.isLmSelectedWithMonth;
    this.selectedMonth = month;
    this.lossMitPaymentList = [];
    this.agentNames = [];

    if (this.isLmSelectedWithMonth) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.monthName === month).forEach(stsDet => {
       if(stsDet.paymentDto!=null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Loss Mit') {
            this.lossMitPaymentAmount = this.lossMitPaymentAmount + pdto.totalPayment;
            this.lossMitPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.lossMitPaymentCount = this.lossMitPaymentList.length;
      console.log('this.lossMitPaymentList ', this.lossMitPaymentCount)
    }
  }

  isBkClickedWithMonthTotal(month) {
    this.isAllSelectedWithMonth = false;
    this.isRegSelectedWithMonth = false;
    this.isLmSelectedWithMonth = false;
    this.isColSelectedWithMonth = false;
    this.isCshSelectedWithMonth = false;
    this.isAgentSelectedWithMonth = false;
    this.bankRuptcyPaymentCount = 0;
    this.bankRuptcyPaymentAmount = 0;
    this.isBkSelectedWithMonth = !this.isBkSelectedWithMonth;
    this.selectedMonth = month;
    this.bankRuptcyPaymentList = [];
    this.agentNames = [];

    if (this.isBkSelectedWithMonth) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.monthName === month).forEach(stsDet => {
        if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Bankruptcy') {
            this.bankRuptcyPaymentAmount = this.bankRuptcyPaymentAmount + pdto.totalPayment;
            this.bankRuptcyPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.bankRuptcyPaymentCount = this.bankRuptcyPaymentList.length;
      console.log('this.bankRuptcyPaymentList ', this.bankRuptcyPaymentList)
    }
  }

  isColClickedWithMonthTotal(month) {
    this.isAllSelectedWithMonth = false;
    this.isRegSelectedWithMonth = false;
    this.isLmSelectedWithMonth = false;
    this.isBkSelectedWithMonth = false;
    this.isCshSelectedWithMonth = false;
    this.isAgentSelectedWithMonth = false;

    this.collectionPaymentCount = 0;
    this.collectionPaymentAmount = 0;
    this.isColSelectedWithMonth = !this.isColSelectedWithMonth;
    this.selectedMonth = month;
    this.collectionPaymentList = [];
    this.agentNames = [];

    if (this.isColSelectedWithMonth) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.monthName === month).forEach(stsDet => {
        if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Collections') {
            this.collectionPaymentAmount = this.collectionPaymentAmount + pdto.totalPayment;
            this.collectionPaymentList.push(pdto);
          }
        }
         )
        }
      });
      this.collectionPaymentCount = this.collectionPaymentList.length;
      console.log('this.collectionPaymentList ', this.collectionPaymentList)
    }
  }

  isAgentClickedWithMonthTotal(month: string) {
    this.isRegSelectedWithMonth = false;
    this.isCshSelectedWithMonth = false;
    this.isBkSelectedWithMonth = false;
    this.isColSelectedWithMonth = false;
    this.isLmSelectedWithMonth = false;
    this.isAllSelectedWithMonth = false;

    console.log('selected month', month)
    this.regularPaymentCount = 0;
    this.regularPaymentAmount = 0;
    this.cashieringPaymentCount = 0;
    this.cashieringPaymentAmount = 0;
    this.lossMitPaymentAmount = 0;
    this.lossMitPaymentCount = 0;
    this.bankRuptcyPaymentAmount = 0;
    this.bankRuptcyPaymentCount = 0;
    this.collectionPaymentAmount = 0;
    this.collectionPaymentCount = 0;


    this.selectedMonth = month;
    this.statisticsListByMonth = [];
    this.regularPaymentList = [];
    this.cashieringPaymentList = [];
    this.lossMitPaymentList = [];
    this.bankRuptcyPaymentList = [];
    this.collectionPaymentList = [];
    //this.agentNames = [];

    if (this.isAgentSelectedWithMonth) {
      console.log('this.isAgentSelectedWithMonth', this.isAgentSelectedWithMonth)
      this.statisticPaymentList.filter(stsDetails => stsDetails.monthName === this.selectedMonth).forEach(stsDet => {
       if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.filter(st => st.agentName === this.agentName).forEach(pdto => {
          if (pdto.adviceName === 'Regular Payment') {
            this.regularPaymentAmount = this.regularPaymentAmount + pdto.totalPayment;
            this.regularPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Cashiering') {
            this.cashieringPaymentAmount = this.cashieringPaymentAmount + pdto.totalPayment;
            this.cashieringPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Loss Mit') {
            this.lossMitPaymentAmount = this.lossMitPaymentAmount + pdto.totalPayment;
            this.lossMitPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Bankruptcy') {
            this.bankRuptcyPaymentAmount = this.bankRuptcyPaymentAmount + pdto.totalPayment;
            this.bankRuptcyPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Collections') {
            this.collectionPaymentAmount = this.collectionPaymentAmount + pdto.totalPayment;
            this.collectionPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.regularPaymentCount = this.regularPaymentList.length;
      this.cashieringPaymentCount = this.cashieringPaymentList.length;
      this.lossMitPaymentCount = this.lossMitPaymentList.length;
      this.bankRuptcyPaymentCount = this.bankRuptcyPaymentList.length;
      this.collectionPaymentCount = this.collectionPaymentList.length;
      console.log('this.paymentDto', this.paymentDto)
      // this.regularPaymentList = this.statisticsListByMonth.filter(stsDetails=> stsDetails.paymentDto.filter(pdto=> pdto.adviceName==='Regular Payment'));
      console.log('this.regularPaymentList ', this.regularPaymentList)
    }
  }

  isAllClickedWithDate(date: string) {
    console.log('selected date', date)
    this.isRegSelectedWithDate = false;
    this.isLmSelectedWithDate = false;
    this.isBkSelectedWithDate = false;
    this.isCshSelectedWithDate = false;
    this.isColSelectedWithDate = false;
    this.isAgentSelectedWithDate = false;

    this.regularPaymentCount = 0;
    this.regularPaymentAmount = 0;
    this.cashieringPaymentCount = 0;
    this.cashieringPaymentAmount = 0;
    this.lossMitPaymentCount = 0;
    this.lossMitPaymentAmount = 0;
    this.collectionPaymentAmount = 0;
    this.collectionPaymentCount = 0;
    this.bankRuptcyPaymentAmount = 0;
    this.bankRuptcyPaymentCount = 0;

    //this.isAllSelectedWithDate = !this.isAllSelectedWithDate;
    this.selectedDate = date;
    // this.statisticsListByMonth=[];
    this.regularPaymentList = [];
    this.cashieringPaymentList = [];
    this.lossMitPaymentList = [];
    this.bankRuptcyPaymentList = [];
    this.collectionPaymentList = [];

    if (!this.isAllSelectedWithDate) {
      this.isAllSelectedWithDate = true;
    }

    if (this.isAllSelectedWithDate) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.date === date).forEach(stsDet => {
        if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Regular Payment') {
            this.regularPaymentAmount = this.regularPaymentAmount + pdto.totalPayment;
            this.regularPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Cashiering') {
            this.cashieringPaymentAmount = this.cashieringPaymentAmount + pdto.totalPayment;
            this.cashieringPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Loss Mit') {
            this.lossMitPaymentAmount = this.lossMitPaymentAmount + pdto.totalPayment;
            this.lossMitPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Bankruptcy') {
            this.bankRuptcyPaymentAmount = this.bankRuptcyPaymentAmount + pdto.totalPayment;
            this.bankRuptcyPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Collections') {
            this.collectionPaymentAmount = this.collectionPaymentAmount + pdto.totalPayment;
            this.collectionPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.regularPaymentCount = this.regularPaymentList.length;
      this.cashieringPaymentCount = this.cashieringPaymentList.length;
      this.lossMitPaymentCount = this.lossMitPaymentList.length;
      this.bankRuptcyPaymentCount = this.bankRuptcyPaymentList.length;
      this.collectionPaymentCount = this.collectionPaymentList.length;
      console.log('this.paymentDto', this.paymentDto)
      // this.regularPaymentList = this.statisticsListByMonth.filter(stsDetails=> stsDetails.paymentDto.filter(pdto=> pdto.adviceName==='Regular Payment'));
      console.log('this.regularPaymentList ', this.regularPaymentList)
    }

  }


  isRegClickedWithDate(date: string) {
    console.log('selected date', date)
    this.isAllSelectedWithDate = false;
    this.isLmSelectedWithDate = false;
    this.isBkSelectedWithDate = false;
    this.isCshSelectedWithDate = false;
    this.isColSelectedWithDate = false;

    this.isRegSelectedWithDate = !this.isRegSelectedWithDate;

    this.regularPaymentCount = 0;
    this.regularPaymentAmount = 0;
    this.regularPaymentList = [];

    if (this.isRegSelectedWithDate) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.date === date).forEach(stsDet => {
        if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Regular Payment') {
            this.regularPaymentAmount = this.regularPaymentAmount + pdto.totalPayment;
            this.regularPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.regularPaymentCount = this.regularPaymentList.length;
      // this.regularPaymentList = this.statisticsListByMonth.filter(stsDetails=> stsDetails.paymentDto.filter(pdto=> pdto.adviceName==='Regular Payment'));
      console.log('this.regularPaymentList ', this.regularPaymentList)
    }


  }

  isLmClickedWithDate(date: string) {
    console.log('selected date', date)
    this.isAllSelectedWithDate = false;
    this.isRegSelectedWithDate = false;
    this.isBkSelectedWithDate = false;
    this.isCshSelectedWithDate = false;
    this.isColSelectedWithDate = false;
    this.isAgentSelectedWithDate = false;

    this.isLmSelectedWithDate = !this.isLmSelectedWithDate;

    this.lossMitPaymentCount = 0;
    this.lossMitPaymentAmount = 0;
    this.lossMitPaymentList = [];

    if (this.isLmSelectedWithDate) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.date === date).forEach(stsDet => {
       if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Loss Mit') {
            this.lossMitPaymentAmount = this.lossMitPaymentAmount + pdto.totalPayment;
            this.lossMitPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.lossMitPaymentCount = this.lossMitPaymentList.length;
      // this.regularPaymentList = this.statisticsListByMonth.filter(stsDetails=> stsDetails.paymentDto.filter(pdto=> pdto.adviceName==='Regular Payment'));
      console.log('this.lossMitPaymentList ', this.lossMitPaymentList)
    }


  }

  isBkClickedWithDate(date: string) {
    console.log('selected date', date)
    this.isAllSelectedWithDate = false;
    this.isRegSelectedWithDate = false;
    this.isLmSelectedWithDate = false;
    this.isCshSelectedWithDate = false;
    this.isColSelectedWithDate = false;
    this.isAgentSelectedWithDate = false;

    this.isBkSelectedWithDate = !this.isBkSelectedWithDate;

    this.bankRuptcyPaymentCount = 0;
    this.bankRuptcyPaymentAmount = 0;
    this.bankRuptcyPaymentList = [];

    if (this.isBkSelectedWithDate) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.date === date).forEach(stsDet => {
        if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Bankruptcy') {
            this.bankRuptcyPaymentAmount = this.bankRuptcyPaymentAmount + pdto.totalPayment;
            this.bankRuptcyPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.bankRuptcyPaymentCount = this.bankRuptcyPaymentList.length;
      // this.regularPaymentList = this.statisticsListByMonth.filter(stsDetails=> stsDetails.paymentDto.filter(pdto=> pdto.adviceName==='Regular Payment'));
      console.log('this.bankRuptcyPaymentList ', this.bankRuptcyPaymentList)
    }


  }

  isCshClickedWithDate(date: string) {
    console.log('selected date', date)
    this.isAllSelectedWithDate = false;
    this.isRegSelectedWithDate = false;
    this.isLmSelectedWithDate = false;
    this.isBkSelectedWithDate = false;
    this.isColSelectedWithDate = false;
    this.isAgentSelectedWithDate = false;

    this.isCshSelectedWithDate = !this.isCshSelectedWithDate;

    this.cashieringPaymentCount = 0;
    this.cashieringPaymentAmount = 0;
    this.cashieringPaymentList = [];

    if (this.isCshSelectedWithDate) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.date === date).forEach(stsDet => {
        if(stsDet.paymentDto!=null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Cashiering') {
            this.cashieringPaymentAmount = this.cashieringPaymentAmount + pdto.totalPayment;
            this.cashieringPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.cashieringPaymentCount = this.cashieringPaymentList.length;
      // this.regularPaymentList = this.statisticsListByMonth.filter(stsDetails=> stsDetails.paymentDto.filter(pdto=> pdto.adviceName==='Regular Payment'));
      console.log('this.cashieringPaymentList ', this.cashieringPaymentList)
    }


  }


  isColClickedWithDate(date: string) {
    console.log('selected date', date)
    this.isAllSelectedWithDate = false;
    this.isRegSelectedWithDate = false;
    this.isLmSelectedWithDate = false;
    this.isBkSelectedWithDate = false;
    this.isCshSelectedWithDate = false;
    this.isAgentSelectedWithDate = false;

    this.isColSelectedWithDate = !this.isColSelectedWithDate;

    this.collectionPaymentCount = 0;
    this.collectionPaymentAmount = 0;
    this.collectionPaymentList = [];

    if (this.isColSelectedWithDate) {
      this.statisticPaymentList.filter(stsDetails => stsDetails.date === date).forEach(stsDet => {
       if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.forEach(pdto => {
          if (pdto.adviceName === 'Collections') {
            this.collectionPaymentAmount = this.collectionPaymentAmount + pdto.totalPayment;
            this.collectionPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.collectionPaymentCount = this.collectionPaymentList.length;
      // this.regularPaymentList = this.statisticsListByMonth.filter(stsDetails=> stsDetails.paymentDto.filter(pdto=> pdto.adviceName==='Regular Payment'));
      console.log('this.collectionPaymentList ', this.collectionPaymentList)
    }


  }

  isAgentClickedWithDate(date: string) {
    this.isRegSelectedWithDate = false;
    this.isCshSelectedWithDate = false;
    this.isBkSelectedWithDate = false;
    this.isColSelectedWithDate = false;
    this.isLmSelectedWithDate = false;
    this.isAllSelectedWithDate = false;


    console.log('selected month', date)
    this.regularPaymentCount = 0;
    this.regularPaymentAmount = 0;
    this.cashieringPaymentCount = 0;
    this.cashieringPaymentAmount = 0;
    this.lossMitPaymentAmount = 0;
    this.lossMitPaymentCount = 0;
    this.bankRuptcyPaymentAmount = 0;
    this.bankRuptcyPaymentCount = 0;
    this.collectionPaymentAmount = 0;
    this.collectionPaymentCount = 0;


    this.selectedDate = date;
    this.statisticsListByMonth = [];
    this.regularPaymentList = [];
    this.cashieringPaymentList = [];
    this.lossMitPaymentList = [];
    this.bankRuptcyPaymentList = [];
    this.collectionPaymentList = [];
    //this.agentNames = [];

    if (this.isAgentSelectedWithDate) {
      console.log('this.isAgentSelectedWithDate', this.isAgentSelectedWithDate)
      this.statisticPaymentList.filter(stsDetails => stsDetails.date === this.selectedDate).forEach(stsDet => {
        if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
        stsDet.paymentDto.filter(st => st.agentName === this.agentName).forEach(pdto => {
          if (pdto.adviceName === 'Regular Payment') {
            this.regularPaymentAmount = this.regularPaymentAmount + pdto.totalPayment;
            this.regularPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Cashiering') {
            this.cashieringPaymentAmount = this.cashieringPaymentAmount + pdto.totalPayment;
            this.cashieringPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Loss Mit') {
            this.lossMitPaymentAmount = this.lossMitPaymentAmount + pdto.totalPayment;
            this.lossMitPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Bankruptcy') {
            this.bankRuptcyPaymentAmount = this.bankRuptcyPaymentAmount + pdto.totalPayment;
            this.bankRuptcyPaymentList.push(pdto);
          } else if (pdto.adviceName === 'Collections') {
            this.collectionPaymentAmount = this.collectionPaymentAmount + pdto.totalPayment;
            this.collectionPaymentList.push(pdto);
          }
        }
        )
      }
      });
      this.regularPaymentCount = this.regularPaymentList.length;
      this.cashieringPaymentCount = this.cashieringPaymentList.length;
      this.lossMitPaymentCount = this.lossMitPaymentList.length;
      this.bankRuptcyPaymentCount = this.bankRuptcyPaymentList.length;
      this.collectionPaymentCount = this.collectionPaymentList.length;
      console.log('this.paymentDto', this.paymentDto)
      // this.regularPaymentList = this.statisticsListByMonth.filter(stsDetails=> stsDetails.paymentDto.filter(pdto=> pdto.adviceName==='Regular Payment'));
      console.log('this.regularPaymentList ', this.regularPaymentList)
    }
  }

  activeButton: string;

  isAllClickedWithGrandTotal(type: string) {
    console.log('type', type)
    console.log('*******', this.selectedMonth)
    console.log('%%%%%%%', this.selectedDate)
    if ((this.selectedMonth !== undefined && this.selectedMonth !== '') && (this.selectedDate === undefined || this.selectedDate === '')) {
      console.log('this.selectedMonth', this.selectedMonth);
      switch (type) {
        case 'All': {
          this.activeButton = type;
          this.collapseValue = '';
          this.isStatusClicked = false;
          this.isAllClickedWithMonthTotal(this.selectedMonth);
          break;
        } case 'REG': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.isRegClickedWithMonthTotal(this.selectedMonth);
          break;
        } case 'CSH': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.isCshClickedWithMonthTotal(this.selectedMonth);
          break;
        } case 'LM': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.isLmClickedWithMonthTotal(this.selectedMonth);
          break;
        } case 'BK': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.isBkClickedWithMonthTotal(this.selectedMonth);
          break;
        } case 'COL': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.isColClickedWithMonthTotal(this.selectedMonth);
          break;
        } case 'AGENT': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.collapseValue = '';
          this.expandedIndexForAgent = null;
          this.agentNames = [];
          this.isRegSelectedWithMonth = false;
          this.isCshSelectedWithMonth = false;
          this.isBkSelectedWithMonth = false;
          this.isColSelectedWithMonth = false;
          this.isLmSelectedWithMonth = false;
          this.isAllSelectedWithMonth = false;
          this.isAgentSelectedWithMonth = !this.isAgentSelectedWithMonth;
          this.statisticPaymentList.filter(stsDetails => stsDetails.monthName === this.selectedMonth).forEach(stsDet => {
            if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
            stsDet.paymentDto.forEach(pdto => {
              if (!this.agentNames.includes(pdto.agentName, 0)) {
                this.agentNames.push(pdto.agentName);
              }
            }
            )
          }
          });
          //this.isAgentClickedWithMonthTotal(this.selectedMonth);
          break;
        }
        default: {
          //statements; 
          break;
        }

      }

    } else if ((this.selectedDate !== undefined && this.selectedDate !== '') && (this.selectedMonth === undefined || this.selectedMonth === '')) {
      console.log('this.selectedDate', this.selectedDate);
      switch (type) {
        case 'All': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.collapseValue = ''
          this.isAllClickedWithDate(this.selectedDate);
          break;
        } case 'REG': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.isRegClickedWithDate(this.selectedDate);
          break;
        } case 'CSH': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.isCshClickedWithDate(this.selectedDate);
          break;
        } case 'LM': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.isLmClickedWithDate(this.selectedDate);
          break;
        } case 'BK': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.isBkClickedWithDate(this.selectedDate);
          break;
        } case 'COL': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.isColClickedWithDate(this.selectedDate);
          break;
        } case 'AGENT': {
          this.activeButton = type;
          this.isStatusClicked = false;
          this.collapseValue = '';
          this.expandedIndexForAgent = null;
          this.agentNames = [];
          this.isRegSelectedWithDate = false;
          this.isCshSelectedWithDate = false;
          this.isBkSelectedWithDate = false;
          this.isColSelectedWithDate = false;
          this.isLmSelectedWithDate = false;
          this.isAllSelectedWithDate = false;
          this.isAgentSelectedWithDate = !this.isAgentSelectedWithDate;
          this.statisticPaymentList.filter(stsDetails => stsDetails.date === this.selectedDate).forEach(stsDet => {
            if(stsDet.paymentDto!==null && stsDet.paymentDto.length){
            stsDet.paymentDto.forEach(pdto => {
              if (!this.agentNames.includes(pdto.agentName, 0)) {
                this.agentNames.push(pdto.agentName);
              }
            }
            )
          }
          });
          //this.isAgentClickedWithMonthTotal(this.selectedMonth);
          break;
        }
        default: {
          //statements; 
          break;
        }

      }

    }
    //this.isAllSelectedWithGrandTotal = !this.isAllSelectedWithGrandTotal
  }

  isStatusClicked = false;
  collapseValue: string;
  
  isStatusExpanded(value: string){
    console.log('isStatusExpanded', value)
    this.isStatusClicked = !this.isStatusClicked;
    if(this.isStatusClicked){
      console.log('isStatusExpanded', value)
      this.collapseValue = value
    }else{
      console.log('isStatusExpanded else block', value)
      this.collapseValue = ''
    }
  }

  date1: any;
  date2: any;
  quarterAdjustment: any;

  getExactDates(selectedRadio: string) {
    console.log('selectedRadio', selectedRadio);
    switch (selectedRadio) {
      case 'Month': {
        var x = new Date();
        var y = new Date
        x.setDate(0); // 0 will result in the last day of the previous month
        this.date1 = x;
        this.statisticDetailForm.get('dateTo').setValue(this.date1);
        console.log('this.statisticDetailForm.get(dateTo)', this.statisticDetailForm.get('dateTo').value);
        y.setDate(0);
        y.setDate(1);
        this.date2 = y;
        this.statisticDetailForm.get('dateFrom').setValue(this.date2);
        console.log(this.statisticDetailForm.value)
        break;
      }
      case 'Month to Date': {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

        this.statisticDetailForm.get('dateFrom').setValue(firstDay);
        this.statisticDetailForm.get('dateTo').setValue(date);
        console.log(this.statisticDetailForm.value)
        break;
      }
      case 'Quater': {
        this.quarterAdjustment = (moment().month() % 3) + 1;
        var lastQuarterEndDate = moment().subtract({ months: this.quarterAdjustment }).endOf('month');
        var lastQuarterStartDate = lastQuarterEndDate.clone().subtract(3, 'months').endOf('month').add(1, 'days');

        this.statisticDetailForm.get('dateFrom').setValue(lastQuarterStartDate.toDate());
        this.statisticDetailForm.get('dateTo').setValue(lastQuarterEndDate.toDate());
        console.log(this.statisticDetailForm.value)
        break;
      }
      case 'Quarter to Date': {
        var date = new Date();
        var firstDateOfQuarter = moment().startOf('quarter');
        this.statisticDetailForm.get('dateFrom').setValue(firstDateOfQuarter.toDate());
        this.statisticDetailForm.get('dateTo').setValue(date);
        console.log(this.statisticDetailForm.value)
        break;
      }
      case 'Year': {
        var lastyear = new Date(new Date().getFullYear() - 1, 0, 1);
        var start = (new Date(lastyear.getFullYear(), 0, 1)),
          end = (new Date(lastyear.getFullYear(), 11, 31));
        this.statisticDetailForm.get('dateFrom').setValue(start);
        this.statisticDetailForm.get('dateTo').setValue(end);
        console.log(this.statisticDetailForm.value)
        break;
      }
      case 'Year to Date': {
        var date = new Date();
        var startDate = (new Date(new Date().getFullYear(), 0, 1))
        this.statisticDetailForm.get('dateFrom').setValue(startDate);
        this.statisticDetailForm.get('dateTo').setValue(date);
        console.log(this.statisticDetailForm.value)
        break;
      }

      default: {
        //statements; 
        break;
      }
    }

  }


  onSubmit() {
    this.monthNames = [];
    let fromDate = new Date(this.statisticDetailForm.get('dateFrom').value);
    let toDate = new Date(this.statisticDetailForm.get('dateTo').value);

    const format = 'MM/dd/yyyy';
    const locale = 'en-US';
    //fromDate = (this.statisticDetailForm.get('dateFrom').value);
    console.log('#########', fromDate);

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //var d = new Date();
    var fromMonthName = months[fromDate.getMonth()]; // "July" (or current month)
    var fromYear = fromDate.getUTCFullYear();

    var toMonthName = months[toDate.getMonth()]; // "July" (or current month)
    var toYear = toDate.getUTCFullYear();

    console.log('monthName  ', fromMonthName, 'year ', fromYear);
    console.log('toMonthName  ', toMonthName, 'toYear ', toYear);

    this.startDate = formatDate(fromDate, format, locale);
    console.log('formattedFromDate', this.startDate)

    this.endDate = formatDate(toDate, format, locale);
    console.log('formattedToDate', this.endDate);


    var startDate = moment(fromDate, 'DD-MMM-YYYY');
    var endDate = moment(toDate, 'DD-MMM-YYYY');
    var iterationDate = startDate.clone().add(-1, 'month');


    // while (+(iterationDate.add(1, 'month')) < +endDate.endOf('month')) this.monthNames.push(iterationDate.format('MMM YYYY'));

    console.log('monthNames ', this.monthNames);

    this.appComp.showProgressBar(true);
    this.statisticDetailsService.getStatisticDetails(this.startDate, this.endDate).subscribe(
      statisticRes => {
        this.statisticResponse = statisticRes;
        if (this.statisticResponse.isSuccessful) {
          this.grandTotalYear = moment(this.startDate, 'MM/DD/YYYY').format("YYYY");
          console.log('paymnetProcessingRes  ', this.statisticResponse);
          this.grandTotalAmount = 0;
          this.grandTotalNumber = 0;
          this.statisticPaymentList = this.statisticResponse.statisticPaymentList
          this.statisticPaymentList.forEach(stPayment => {
            this.grandTotalAmount = this.grandTotalAmount + stPayment.totalPayment;
            
            stPayment.monthName = moment(stPayment.date, 'MM/DD/YYYY').format("MMM YYYY");
            if(stPayment.paymentDto!==null){
              this.grandTotalNum=0;
            stPayment.paymentDto.forEach(stPaymentDto => {
              this.grandTotalNum+= 1;
            });
            this.grandTotalNumber+= this.grandTotalNum;
          }
          })
          console.log('statisticPaymentList', this.statisticPaymentList);
          this.appComp.showSuccessMessage(this.statisticResponse.message, null, false);
        } else {
          this.appComp.showErrorMessage(this.statisticResponse.message, null, false);
        }

        while (+(iterationDate.add(1, 'month')) < +endDate.endOf('month')) this.monthNames.push(iterationDate.format('MMM YYYY'));
        this.monthTotalAmount = [];
        this.monthTotalCount = [];
        this.monthNames.forEach(element => {
          var monthTotalamt = 0
          var monthTotalCount = 0;
          this.statisticPaymentList.filter(sts => sts.monthName === element).forEach(st => {
            monthTotalamt = +monthTotalamt + st.totalPayment;
            monthTotalCount = +monthTotalCount + st.paymentCount
          }
          )
          this.monthTotalAmount.push(monthTotalamt);
          this.monthTotalCount.push(monthTotalCount);
        });

      }
    )
  }

}
