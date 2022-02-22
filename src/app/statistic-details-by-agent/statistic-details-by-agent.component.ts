import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { interval } from 'rxjs';
import { AppComponent } from '../app.component';
import { AgentCountDetailDto } from '../model/agent-count-detail-dto';
import { AgentExportDetailDto } from '../model/agent-export-detail-dto';
import { AgentMonthExportDetailDto } from '../model/agent-month-export-detail-dto';
import { GetStatisticAgentDetailsDto } from '../model/get-statistic-agent-details-dto';
import { GetStatisticDetailsDto } from '../model/get-statistic-details-dto';
import { GetStatisticDetailsResponse } from '../model/get-statistic-details-response';
import { StatisticPaymentDto } from '../model/statistic-payment-dto';
import { StatisticsByAgentSearchDto } from '../model/statistics-by-agent-search-dto';
import { StatisticByAgentExportService } from '../service/statistic-by-agent-export.service';
import { StatisticDetailsService } from '../service/statistic-details.service';

interface Post {
  dateFrom: Date;
  dateTo: Date;
}
@Component({
  selector: 'app-statistic-details-by-agent',
  templateUrl: './statistic-details-by-agent.component.html',
  styleUrls: ['./statistic-details-by-agent.component.css']
})
export class StatisticDetailsByAgentComponent implements OnInit {
  userDetails: any;
  statisticDetailAgentForm: FormGroup;
  monthNames = [];
  statisticByAgentData=[];
  statisticByAgentDataForAgent=[];
  startDate: string;
  endDate: string;
  statisticResponse = new GetStatisticDetailsResponse();
  agentDetails: GetStatisticAgentDetailsDto;
  statisticPaymentList: GetStatisticDetailsDto[] = [];
  paymentDto: StatisticPaymentDto[] = [];
  agentNames = [];
  grandTotalAmount: number;
  grandTotalNumber: number;
  grandTotalNum: number;
  grandTotalYear: any;
  selectedMonth: string;
  selectedDate: string;
  selectedDateInMonth: string;
  selectedAgent: string;
  post: Post = {
    dateFrom: new Date(Date.now()),
    dateTo: new Date(Date.now())
  }
  expandedIndex: number;
  agentexpandedIndex: number;
  expandedIndexForAgent: number;
  isExpanded = false;
  isExpandedAgent = false;
  agentsForSelectedRow: string;
  monthForSelectedRow: string;
  agentForSelectedRow: string;
  dateForSelectedRow: string;
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
  IsMonth = false;
  Isdate = false;
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
  waiveFeesCashieringCount: number;
  waiveFeesCollectionsCount: number;
  waiveFeesRegularPaymentCount: number;
  waiveFeesBankruptcyCount: number;
  waiveFeesLossMitCount: number;
  waiveFeesTotalMonthCount: number;
  PmtTypetotalPaymentCount: number;
  totalWaiveFeesAmount: number;
  agentDateArr = [];
  agentMonthName = '';
  adviceCash: boolean;
  adviceBank: boolean;
  adviceColl: boolean;
  adviceLossMit: boolean;
  paymentCash: boolean;
  paymentBank: boolean;
  paymentColl: boolean;
  paymentLossMit: boolean;
  paymentReg: boolean;
  collectionCount: any;
  cashieringAdviceCount: number;
  lossMitAdviceCount: number;
  bankRuptcyAdviceCount: number;
  collectionAdviceCount: number;
  AdviceTypetotalPaymentCount: number;
  OrderType: any;
  allUniqueAgents = [];
  allUniqueAgentsDate = [];
  agentMonthlyTransactionDetails = [];
  agentDateWiseTransactionDetails = [];
  agentList = [];
  cashieringCount: number;
  grandTotalcashieringCount: number;
  grandTotalcollectionCount: number;
  grandTotalRegularCount: number;
  grandTotalLosmitCount: number;
  grandTotalBankruptcyCount: number;
  grandTotalAllAPaymentCount: number;
  grandTotalCashieringWaveCount: number;
  grandTotalcollectionWaveCount: number;
  grandTotalRegularCountgWaveCount: number;
  grandTotallossMitWaveCount: number;
  grandTotalBankruptcyWaveCount: number;
  grandTotalAllWaveCount: number;
  totalcashieringCount: number;
  totalcollectionCount :number;
  totalRegularCount:number;
  totallossMit :number;
  totalBankruptcy :number;
  totalwavefeesCount:number;
  grandTotalcashieringAdviceCount: number;
  grandTotalcollectionAdviceCount: number;
  grandTotalLosmitAdviceCount: number;
  grandTotalBankruptcyAdviceCount: number;
  grandTotalAllAdviceCount: number;
  totalcashieringAdviceCount: number;
  totalcollectionAdviceCount :number;
  totallossMitAdviceCount :number;
  totalBankruptcyAdviceCount :number;
  agentMonthelyCountDetail : AgentCountDetailDto;
  agentMonthelyCountDetailList: AgentCountDetailDto[] = [];
  agentMonthSpecificCountDetail : AgentCountDetailDto;
  agentMonthSpecificCountDetailList: AgentCountDetailDto[] = [];
  agentDateSpecificCountDetail : AgentCountDetailDto;
  agentdateSpecificCountDetailList: AgentCountDetailDto[] = [];
  agentMonthelyCountDetailListForExc: AgentCountDetailDto[] = [];

  agentPayCashCount : number;
  agentPayCollectionCount : number;
  agentPayBankCount : number;
  agentPayRegularCount : number;
  agentPayLosMitCount : number;
  agentPayWaiveCashCount : number;
  agentPayWaiveCollectionCount : number;
  agentPayWaiveBankCount : number;
  agentPayWaiveRegularCount : number;
  agentPayWaiveLosMitCount : number;
  agentAdviceCashCount : number;
  agentAdviceCollectionCount : number;
  agentAdviceBankCount : number;
  agentAdviceLosMitCount : number;
  agentTotalPayCashCount : number;
  agentTotalPayCollectionCount : number;
  agentTotalPayBankCount : number;
  agentTotalPayRegularCount : number;
  agentTotalPayLosMitCount : number;
  agentTotalAllPayAdviceCount : number;
  agentTotalPayWaiveCashCount : number;
  agentTotalPayWaiveCollectionCount : number;
  agentTotalPayWaiveBankCount : number;
  agentTotalPayWaiveRegularCount : number;
  agentTotalPayWaiveLosMitCount : number;
  agentAllTotalPayWaiveLosMitCount : number;
  agentTotalAdviceCashCount : number;
  agentTotalAdviceCollectionCount : number;
  agentTotalAdviceBankCount : number;
  agentTotalAdviceLosMitCount : number;
  agentTotalAllAdviceCount : number;
  agentTotalPayMonthCashCount : number;
  agentTotalPayMonthCollectionCount : number;
  agentTotalPayMonthBankCount : number;
  agentTotalPayMonthRegularCount : number;
  agentTotalPayMonthLosMitCount : number;
  agentTotalAllMonthPayAdviceCount : number;
  agentTotalPayMonthWaiveCashCount : number;
  agentTotalPayMonthWaiveCollectionCount : number;
  agentTotalPayMonthWaiveBankCount : number;
  agentTotalPayMonthWaiveRegularCount : number;
  agentTotalPayMonthWaiveLosMitCount : number;
  agentAllTotalMonthPayWaiveCount : number;
  agentTotalAdviceMonthCashCount : number;
  agentTotalAdviceMonthCollectionCount : number;
  agentTotalAdvicMontheBankCount : number;
  agentTotalAdviceMonthLosMitCount : number;
  agentTotalAllMonthAdviceCount : number;
  agentPayMonthCashCount : number;
  agentPayMonthCollectionCount : number;
  agentPayMonthBankCount : number;
  agentPayMonthRegularCount : number;
  agentPayMonthLosMitCount : number;
  agentPayMonthWaiveCashCount : number;
  agentPayMonthWaiveCollectionCount : number;
  agentPayMonthWaiveBankCount : number;
  agentPayMonthWaiveRegularCount : number;
  agentPayMonthWaiveLosMitCount : number;
  agentAdviceMonthCashCount : number;
  agentAdviceMonthCollectionCount : number;
  agentAdviceMonthBankCount : number;
  agentAdviceMonthLosMitCount : number;
  agentTotalPaydateCashCount : number;
  agentTotalPaydateCollectionCount : number;
  agentTotalPaydateBankCount : number;
  agentTotalPaydateRegularCount : number;
  agentTotalPaydateLosMitCount : number;
  agentTotalAlldatePayAdviceCount : number;
  agentTotalPaydateWaiveCashCount : number;
  agentTotalPaydateWaiveCollectionCount : number;
  agentTotalPaydateWaiveBankCount : number;
  agentTotalPaydateWaiveRegularCount : number;
  agentTotalPaydateWaiveLosMitCount : number;
  agentAllTotaldatePayWaiveCount : number;
  agentTotalAdvicedateCashCount : number;
  agentTotalAdvicedateCollectionCount : number;
  agentTotalAdvicdateeBankCount : number;
  agentTotalAdvicedateLosMitCount : number;
  agentTotalAlldateAdviceCount : number;
  agentPaydateCashCount : number;
  agentPaydateCollectionCount : number;
  agentPaydateBankCount : number;
  agentPaydateRegularCount : number;
  agentPaydateLosMitCount : number;
  agentPaydateWaiveCashCount : number;
  agentPaydateWaiveCollectionCount : number;
  agentPaydateWaiveBankCount : number;
  agentPaydateWaiveRegularCount : number;
  agentPaydateWaiveLosMitCount : number;
  agentAdvicedateCashCount : number;
  agentAdvicedateCollectionCount : number;
  agentAdvicedateBankCount : number;
  agentAdvicedateLosMitCount : number;
  selectOrderType  : string;
  monthsForSelectedRow : string;
  isExpandedOrderByDate = false;
  isExpandedOrderByDateAgent = false;
  expandedMonthIndexOrderByDate: number;
  expandedDateIndexOrderByDate: number;
  agentTransactionDetails = [];
  dateWiseTransactionDetails = [];
  agentListFordateWise = [];
  agentSearchDetail : StatisticsByAgentSearchDto;

  agentMonthelyExportCountDetail : AgentExportDetailDto;
  agentMonthelyExportCountDetailList: AgentExportDetailDto[] = [];

   agentDateWiseExportCountDetail : AgentMonthExportDetailDto;
   agentDateWiseExportCountDetailList: AgentMonthExportDetailDto[] = [];
  dateWiseHeader = [];
  isAgentView = false;
  isAgentMonthView = false;
  isAgentDateView = false;
  PayDayFormat : string;
  paymentColspanVal = 7;
  adviceColspanVal = 5;
  isTotalPayment = true;
  isWaiveFee = true;
  isTotalAdvice = true;

  agentExportPaydateCashCount : number;
  agentExportPaydateCollectionCount : number;
  agentExportPaydateBankCount : number;
  agentExportPaydateRegularCount : number;
  agentExportPaydateLosMitCount : number;
  agentExportPaydateTotalCount : number;
  agentExportAdvicedateTotalCount : number;
  agentExportPaydateWaiveCashCount : number;
  agentExportPaydateWaiveCollectionCount : number;
  agentExportPaydateWaiveBankCount : number;
  agentExportPaydateWaiveRegularCount : number;
  agentExportPaydateWaiveLosMitCount : number;
  agentExportPaydateWaiveTotalCount : number;
  agentExportAdvicedateCashCount : number;
  agentExportAdvicedateCollectionCount : number;
  agentExportAdvicedateBankCount : number;
  agentExportAdvicedateLosMitCount : number;

  agentOrder : string;
  exportFlag  : boolean;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private appComp: AppComponent, private statisticDetailsService: StatisticDetailsService, private excelService:StatisticByAgentExportService) { }

  ngOnInit() {
    this.statisticDetailAgentForm = this.formBuilder.group({
      dateFrom: [formatDate(this.post.dateFrom, 'yyyy-MM-dd', 'en'), [Validators.required]],
      dateTo: [formatDate(this.post.dateTo, 'yyyy-MM-dd', 'en'), [Validators.required]]
    });

    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));

    this.adviceCash = true;
    this.adviceBank = true;
    this.adviceColl = true;
    this.adviceLossMit = true;
    this.paymentCash = true;
    this.paymentBank = true;
    this.paymentColl = true;
    this.paymentLossMit = true;
    this.paymentReg = true;
    this.OrderType = "Agent";
    this.totalcashieringCount = 0;
    this.cashieringCount = 0;
    this.grandTotalcashieringCount = 0;
    this.grandTotalcollectionCount = 0;
    this.grandTotalRegularCount = 0;
    this.grandTotalLosmitCount = 0;
    this.grandTotalBankruptcyCount = 0;
    this.grandTotalAllAPaymentCount  = 0;

    this.grandTotalcashieringAdviceCount = 0;
    this.grandTotalcollectionAdviceCount = 0;
    this.grandTotalLosmitAdviceCount = 0;
    this.grandTotalBankruptcyAdviceCount = 0;
    this.grandTotalAllAdviceCount = 0;
  
    this.totalcashieringAdviceCount = 0;
    this.totalcollectionAdviceCount = 0;
    this.totallossMitAdviceCount = 0;
    this.totalBankruptcyAdviceCount = 0;

    this.grandTotalCashieringWaveCount = 0;
    this.grandTotalcollectionWaveCount = 0;
    this.grandTotalRegularCountgWaveCount = 0;
    this.grandTotallossMitWaveCount = 0;
    this.grandTotalBankruptcyWaveCount = 0;
    this.grandTotalAllWaveCount = 0;

    this.agentPayCashCount = 0;
    this.agentPayCollectionCount = 0;
    this.agentPayBankCount = 0;
    this.agentPayRegularCount = 0;
    this.agentPayLosMitCount = 0;
    this.agentPayWaiveCashCount = 0;
    this.agentPayWaiveCollectionCount = 0;
    this.agentPayWaiveBankCount = 0;
    this.agentPayWaiveRegularCount = 0;
    this.agentPayWaiveLosMitCount = 0;
    this.agentAdviceCashCount = 0;
    this.agentAdviceCollectionCount = 0;
    this.agentAdviceBankCount = 0;
    this.agentAdviceLosMitCount = 0;

    this.agentTotalPayCashCount = 0;
    this.agentTotalPayCollectionCount = 0;
    this.agentTotalPayBankCount = 0;
    this.agentTotalPayRegularCount = 0;
    this.agentTotalPayLosMitCount = 0;
    this.agentTotalAllPayAdviceCount = 0;
    this.agentTotalPayWaiveCashCount = 0;
    this.agentTotalPayWaiveCollectionCount = 0;
    this.agentTotalPayWaiveBankCount = 0;
    this.agentTotalPayWaiveRegularCount = 0;
    this.agentTotalPayWaiveLosMitCount = 0;
    this.agentAllTotalPayWaiveLosMitCount = 0;
    this.agentTotalAdviceCashCount = 0;
    this.agentTotalAdviceCollectionCount = 0;
    this.agentTotalAdviceBankCount = 0;
    this.agentTotalAdviceLosMitCount = 0;
    this.agentTotalAllAdviceCount = 0;

    this.agentTotalPayMonthCashCount  = 0;
    this.agentTotalPayMonthCollectionCount = 0;
    this.agentTotalPayMonthBankCount = 0;
    this.agentTotalPayMonthRegularCount = 0;
    this.agentTotalPayMonthLosMitCount = 0;
    this.agentTotalAllMonthPayAdviceCount = 0;
    this.agentTotalPayMonthWaiveCashCount = 0;
    this.agentTotalPayMonthWaiveCollectionCount = 0;
    this.agentTotalPayMonthWaiveBankCount = 0;
    this.agentTotalPayMonthWaiveRegularCount = 0;
    this.agentTotalPayMonthWaiveLosMitCount = 0;
    this.agentAllTotalMonthPayWaiveCount = 0;
    this.agentTotalAdviceMonthCashCount = 0;
    this.agentTotalAdviceMonthCollectionCount = 0;
    this.agentTotalAdvicMontheBankCount = 0;
    this.agentTotalAdviceMonthLosMitCount = 0;
    this.agentTotalAllMonthAdviceCount = 0;

    this.agentPayMonthCashCount = 0;
    this.agentPayMonthCollectionCount = 0;
    this.agentPayMonthBankCount = 0;
    this.agentPayMonthRegularCount = 0;
    this.agentPayMonthLosMitCount = 0;
    this.agentPayMonthWaiveCashCount = 0;
    this.agentPayMonthWaiveCollectionCount = 0;
    this.agentPayMonthWaiveBankCount = 0;
    this.agentPayMonthWaiveRegularCount = 0;
    this.agentPayMonthWaiveLosMitCount = 0;
    this.agentAdviceMonthCashCount = 0;
    this.agentAdviceMonthCollectionCount = 0;
    this.agentAdviceMonthBankCount = 0;
    this.agentAdviceMonthLosMitCount = 0;

    //datewise 
    this.agentTotalPaydateCashCount = 0;
    this.agentTotalPaydateCollectionCount = 0;
    this.agentTotalPaydateBankCount = 0;
    this.agentTotalPaydateRegularCount = 0;
    this.agentTotalPaydateLosMitCount = 0;
    this.agentTotalAlldatePayAdviceCount = 0;
    this.agentTotalPaydateWaiveCashCount = 0;
    this.agentTotalPaydateWaiveCollectionCount = 0;
    this.agentTotalPaydateWaiveBankCount = 0;
    this.agentTotalPaydateWaiveRegularCount = 0;
    this.agentTotalPaydateWaiveLosMitCount = 0;
    this.agentAllTotaldatePayWaiveCount = 0;
    this.agentTotalAdvicedateCashCount = 0;
    this.agentTotalAdvicedateCollectionCount = 0;
    this.agentTotalAdvicdateeBankCount = 0;
    this.agentTotalAdvicedateLosMitCount = 0;
    this.agentTotalAlldateAdviceCount = 0;

    this.agentPaydateCashCount = 0;
    this.agentPaydateCollectionCount = 0;
    this.agentPaydateBankCount = 0;
    this.agentPaydateRegularCount = 0;
    this.agentPaydateLosMitCount = 0;
    this.agentPaydateWaiveCashCount = 0;
    this.agentPaydateWaiveCollectionCount = 0;
    this.agentPaydateWaiveBankCount = 0;
    this.agentPaydateWaiveRegularCount = 0;
    this.agentPaydateWaiveLosMitCount = 0;
    this.agentAdvicedateCashCount = 0;
    this.agentAdvicedateCollectionCount = 0;
    this.agentAdvicedateBankCount = 0;
    this.agentAdvicedateLosMitCount = 0;
    this.selectOrderType = "Agent";

    this.agentExportPaydateCashCount = 0;
    this.agentExportPaydateCollectionCount = 0;
    this.agentExportPaydateBankCount = 0;
    this.agentExportPaydateRegularCount = 0;
    this.agentExportPaydateLosMitCount = 0;
    this.agentExportPaydateWaiveCashCount = 0;
    this.agentExportPaydateWaiveCollectionCount = 0;
    this.agentExportPaydateWaiveBankCount = 0;
    this.agentExportPaydateWaiveRegularCount = 0;
    this.agentExportPaydateWaiveLosMitCount = 0;
    this.agentExportPaydateWaiveTotalCount = 0;
    this.agentExportAdvicedateCashCount = 0;
    this.agentExportAdvicedateCollectionCount = 0;
    this.agentExportAdvicedateBankCount = 0;
    this.agentExportAdvicedateLosMitCount = 0;
    this.agentExportPaydateTotalCount = 0;
    this.agentExportAdvicedateTotalCount = 0;

  }


  getPaymentAdviceType(paymentType: string, event): void {
    if (paymentType === 'paymentCash') {
      
      this.paymentCash = event.target.checked;
      if(this.paymentCash){
        this.paymentColspanVal = this.paymentColspanVal+1;
      }else{
        this.paymentColspanVal = this.paymentColspanVal-1;
      }
    }
    if (paymentType === 'paymentBank') {
      this.paymentBank = event.target.checked;
      if(this.paymentBank){
        this.paymentColspanVal = this.paymentColspanVal+1;
      }else{
        this.paymentColspanVal = this.paymentColspanVal-1;
      }

    }
    if (paymentType === 'paymentColl') {
      this.paymentColl = event.target.checked;
      if(this.paymentColl){
        this.paymentColspanVal = this.paymentColspanVal+1;
      }else{
        this.paymentColspanVal = this.paymentColspanVal-1;
      }
    }
    if (paymentType === 'paymentLossMit') {
      this.paymentLossMit = event.target.checked;
      if(this.paymentLossMit){
        this.paymentColspanVal = this.paymentColspanVal+1;
      }else{
        this.paymentColspanVal = this.paymentColspanVal-1;
      }
    }
    if (paymentType === 'paymentReg') {
      this.paymentReg = event.target.checked;
      if(this.paymentReg){
        this.paymentColspanVal = this.paymentColspanVal+1;
      }else{
        this.paymentColspanVal = this.paymentColspanVal-1;
      }
    }
    if(!this.paymentCash && !this.paymentBank && !this.paymentColl && !this.paymentLossMit && !this.paymentReg){
      this.paymentColspanVal = this.paymentColspanVal-2;
      this.isTotalPayment = false;
      this.isWaiveFee = false;
    }else{
      if(this.paymentColspanVal<2){
      this.paymentColspanVal = this.paymentColspanVal+2;
      }
      this.isTotalPayment = true;
      this.isWaiveFee = true;
    }
    
  }

  getAdviceType(adviceType: string, event): void {
    if (adviceType === 'adviceCash') {
      this.adviceCash = event.target.checked;
      if(this.adviceCash){
        this.adviceColspanVal = this.adviceColspanVal+1;
      }else{
        this.adviceColspanVal = this.adviceColspanVal-1;
      }
    }
    if (adviceType === 'adviceBank') {
      this.adviceBank = event.target.checked;
      if(this.adviceBank){
        this.adviceColspanVal = this.adviceColspanVal+1;
      }else{
        this.adviceColspanVal = this.adviceColspanVal-1;
      }
    }
    if (adviceType === 'adviceColl') {
      this.adviceColl = event.target.checked;
      if(this.adviceColl){
        this.adviceColspanVal = this.adviceColspanVal+1;
      }else{
        this.adviceColspanVal = this.adviceColspanVal-1;
      }
    }
    if (adviceType === 'adviceLossMit') {
      this.adviceLossMit = event.target.checked;
      if(this.adviceLossMit){
        this.adviceColspanVal = this.adviceColspanVal+1;
      }else{
        this.adviceColspanVal = this.adviceColspanVal-1;
      }
    }
    if(!this.adviceCash && !this.adviceBank && !this.adviceColl && !this.adviceLossMit){
      this.adviceColspanVal = this.adviceColspanVal-1;
      this.isTotalAdvice = false;
    }else{
      if(this.adviceColspanVal===1){
      this.adviceColspanVal = this.adviceColspanVal+1;
      }
      this.isTotalAdvice = true;
    }
  }
  //isTotalAdvice
  //Create functionality for Choose Type
  getOrderType(value) { 
    this.OrderType = value;
    //In case of Agent Choose
    if (value == "Agent") {
      this.OrderType = value;
    }
    else if (value == "Date") {
      this.OrderType = value;
    }
    //In Case of Date Choose
  }

  onSubmit() {
    //this.expandRow(0, "");
    this.agentexpandedIndex = -1;
    this.expandedIndex = -1;
    this.expandedMonthIndexOrderByDate = -1;
    this.expandedDateIndexOrderByDate = -1; 
    this.isAgentView = true;
    this.isAgentMonthView = false;
    this.isAgentDateView = false;

    this.selectedMonth = '';
    this.selectedDate = '';
    this.selectedDateInMonth='';
    this.cashieringPaymentCount = 0;
    this.regularPaymentCount = 0;
    this.lossMitPaymentCount = 0;
    this.bankRuptcyPaymentCount = 0;
    this.collectionPaymentCount = 0;
    this.PmtTypetotalPaymentCount = 0;
    this.cashieringAdviceCount = 0;
    this.lossMitAdviceCount = 0;
    this.bankRuptcyAdviceCount = 0;
    this.collectionAdviceCount = 0;
    this.PmtTypetotalPaymentCount = 0;

    this.waiveFeesCashieringCount = 0;
    this.waiveFeesCollectionsCount = 0;
    this.waiveFeesRegularPaymentCount = 0;
    this.waiveFeesBankruptcyCount = 0;
    this.waiveFeesLossMitCount = 0;
    this.waiveFeesTotalMonthCount = 0;

    this.grandTotalCashieringWaveCount = 0;
    this.grandTotalcollectionWaveCount = 0;
    this.grandTotalRegularCountgWaveCount = 0;
    this.grandTotallossMitWaveCount = 0;
    this.grandTotalBankruptcyWaveCount = 0;
    this.grandTotalAllWaveCount = 0;

    this.AdviceTypetotalPaymentCount = 0;
    this.totalWaiveFeesAmount = 0;

    

    
    let fromDate = new Date(this.statisticDetailAgentForm.get('dateFrom').value);
    let toDate = new Date(this.statisticDetailAgentForm.get('dateTo').value);
    this.monthNames = [];
    this.agentNames = [];
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
    //alert(this.startDate+" "+this.endDate);

    var startDate = moment(fromDate, 'DD-MMMM-YYYY');
    var endDate = moment(toDate, 'DD-MMMM-YYYY');
    var iterationDate = startDate.clone().add(-1, 'month');
    console.log('monthNames ', this.monthNames);
     console.log("start**************" + this.startDate, 'endDate***********:', this.endDate);
    
    this.agentSearchDetail = new StatisticsByAgentSearchDto(); 
    this.agentSearchDetail.startDate = this.startDate;
    this.agentSearchDetail.endDate = this.endDate;
    this.agentSearchDetail.paymentCash = this.paymentCash;
    this.agentSearchDetail.paymentBank = this.paymentBank;
    this.agentSearchDetail.paymentReg = this.paymentReg;
    this.agentSearchDetail.paymentColl = this.paymentColl;
    this.agentSearchDetail.paymentLossMit = this.paymentLossMit;
    this.agentSearchDetail.adviceCash = this.adviceCash;
    this.agentSearchDetail.adviceBank = this.adviceBank;
    this.agentSearchDetail.adviceColl = this.adviceColl;
    this.agentSearchDetail.adviceLossMit = this.adviceLossMit;
    this.agentSearchDetail.OrderType =  this.OrderType;

    console.log("this.agentSearchDetail $$$$$$  : "+this.agentSearchDetail+" "+this.agentSearchDetail.startDate+" "+this.agentSearchDetail.endDate);
    

    this.appComp.showProgressBar(true);
    this.grandTotalcashieringCount = 0;
    this.grandTotalcollectionCount = 0;
    this.grandTotalRegularCount = 0;
    this.grandTotalLosmitCount = 0;
    this.grandTotalBankruptcyCount = 0;
    this.grandTotalAllAPaymentCount = 0;
   
    this.grandTotalcashieringAdviceCount = 0;
    this.grandTotalcollectionAdviceCount = 0;
    this.grandTotalLosmitAdviceCount = 0;
    this.grandTotalBankruptcyAdviceCount = 0;
    this.grandTotalAllAdviceCount = 0;
    this.agentMonthelyCountDetailList = [];
    this.agentMonthelyCountDetailListForExc = [];
    this.agentMonthelyExportCountDetailList = [];
    this.statisticDetailsService.getStatisticDetails(this.startDate, this.endDate).subscribe(
      statisticRes => {
        this.allUniqueAgents = [];
        this.allUniqueAgentsDate = [];
        this.statisticResponse = statisticRes;
              if(this.statisticResponse.statisticPaymentList!==null){
                if(this.OrderType==="Agent")
                  {
                    this.dateWiseHeader = ["Agent","Month","Date","Day"];
                      this.selectOrderType = "Agent";
                      this.agentMonthelyExportCountDetail = new AgentExportDetailDto();
                      statisticRes.statisticPaymentList.forEach((e) => {
                      this.totalcashieringCount = 0;
                      this.totalcollectionCount = 0;
                      this.totalRegularCount = 0;
                      this.totallossMit = 0;
                      this.totalBankruptcy = 0;
                      this.totalcashieringAdviceCount = 0;
                      this.totalcollectionAdviceCount = 0;
                      this.totallossMitAdviceCount = 0;
                      this.totalBankruptcyAdviceCount = 0;
                      this.waiveFeesCashieringCount = 0;
                      this.waiveFeesCollectionsCount = 0;
                      this.waiveFeesRegularPaymentCount = 0;
                      this.waiveFeesBankruptcyCount = 0;
                      this.waiveFeesLossMitCount = 0;
                      this.waiveFeesTotalMonthCount = 0;
                        if (e.paymentDto !== null) {
                          e.paymentDto.forEach(element => {
                            // if (element.adviceName == "Cashiering") {
                            //   this.totalcashieringCount++;
                            // }
                            switch(element.adviceName) { 
                              case  "Cashiering": {
                                if(this.paymentCash){
                                this.totalcashieringCount++;
                                }
                                if(this.adviceCash){
                                this.totalcashieringAdviceCount++;
                              }
                              if(element.waiveFee!==0 && this.paymentCash){
                                  this.waiveFeesCashieringCount++;
                              }
                                break; 
                              } 
                              case "Collections": { 
                                if(this.paymentColl){
                                this.totalcollectionCount++;
                                }
                                if(this.adviceColl){
                                this.totalcollectionAdviceCount++;
                                }
                                if(element.waiveFee!==0 && this.paymentColl){
                                  this.waiveFeesCollectionsCount++;
                              }
                                break; 
                              } 
                              case "Regular Payment": {
                                if(this.paymentReg){ 
                                this.totalRegularCount++;
                                }
                                if(element.waiveFee!==0  && this.paymentReg){
                                  this.waiveFeesRegularPaymentCount++;
                              }
                                break; 
                              }
                              case "Loss Mit": { 
                                if(this.paymentLossMit){ 
                                this.totallossMit++;
                                }
                                if(this.adviceLossMit){
                                this.totallossMitAdviceCount++;
                                }
                                if(element.waiveFee!==0 && this.paymentLossMit){
                                  this.waiveFeesLossMitCount++;
                              }
                                break; 
                              }
                              case "Bankruptcy": { 
                                if(this.paymentBank){ 
                                this.totalBankruptcy++;
                                }
                                if(this.adviceBank){
                                this.totalBankruptcyAdviceCount++;
                                }
                                if(element.waiveFee!==0 && this.paymentBank){
                                  this.waiveFeesBankruptcyCount++;
                              }
                                break; 
                              } 
                              default: { 
                                //statements; 
                                break; 
                              } 
                          } 
                          
                          
                            (this.allUniqueAgents.indexOf(element.agentName) == -1) ? this.allUniqueAgents.push(element.agentName) : null;
                            (this.allUniqueAgentsDate.indexOf(element.dateAgent) == -1) ? this.allUniqueAgentsDate.push(element.dateAgent) : null;
                          });
                        }
                        this.grandTotalcashieringCount += this.totalcashieringCount;
                        this.grandTotalcollectionCount += this.totalcollectionCount;
                        this.grandTotalRegularCount += this.totalRegularCount;
                        this.grandTotalLosmitCount += this.totallossMit;
                        this.grandTotalBankruptcyCount += this.totalBankruptcy;

                        this.grandTotalcashieringAdviceCount+= this.totalcashieringAdviceCount;
                        this.grandTotalcollectionAdviceCount+= this.totalcollectionAdviceCount;
                        this.grandTotalLosmitAdviceCount+= this.totallossMitAdviceCount;
                        this.grandTotalBankruptcyAdviceCount+= this.totalBankruptcyAdviceCount;

                        this.grandTotalCashieringWaveCount+= this.waiveFeesCashieringCount;
                        this.grandTotalcollectionWaveCount+= this.waiveFeesCollectionsCount;
                        this.grandTotalRegularCountgWaveCount+= this.waiveFeesRegularPaymentCount;
                        this.grandTotallossMitWaveCount+= this.waiveFeesLossMitCount;
                        this.grandTotalBankruptcyWaveCount+= this.waiveFeesBankruptcyCount;
                      });   
                        this.grandTotalAllAPaymentCount =    this.grandTotalcashieringCount+this.grandTotalcollectionCount+ this.grandTotalRegularCount+this.grandTotalLosmitCount+this.grandTotalBankruptcyCount; 
                        this.grandTotalAllAdviceCount = this.grandTotalcashieringAdviceCount+this.grandTotalcollectionAdviceCount+this.grandTotalLosmitAdviceCount+this.grandTotalBankruptcyAdviceCount;
                        this.grandTotalAllWaveCount = this.grandTotalCashieringWaveCount+this.grandTotalcollectionWaveCount+this.grandTotalRegularCountgWaveCount+this.grandTotallossMitWaveCount+this.grandTotalBankruptcyWaveCount;
                        
                        this.getAgentTransactionsAgentMonthlyCount(this.allUniqueAgents)
                        if (this.statisticResponse.isSuccessful) {
                          this.grandTotalYear = moment(this.startDate, 'MM/DD/YYYY').format("YYYY");
                          console.log('paymnetProcessingRes  ', this.statisticResponse);
                          this.grandTotalAmount = 0;
                          this.grandTotalNumber = 0;
                          this.statisticPaymentList = this.statisticResponse.statisticPaymentList
                          this.statisticPaymentList.forEach(stPayment => {
                            this.agentexpandedIndex = -1;
                            this.grandTotalAmount = this.grandTotalAmount + stPayment.totalPayment;
                            stPayment.monthName = moment(stPayment.date, 'MM/DD/YYYY').format("MMMM YYYY");
                            if (stPayment.paymentDto !== null) {
                              this.grandTotalNum = 0;
                              stPayment.paymentDto.forEach(stPaymentDto => {
                                this.grandTotalNum += 1;
                                this.agentDetails = new GetStatisticAgentDetailsDto();
                                this.agentDetails.agentName = stPaymentDto.agentName;
                                this.agentDetails.date = stPayment.date;
                                this.agentDetails.dateAgent = moment(stPayment.date, 'MM/DD/YYYY').format('MM/DD/YYYY');
                                this.agentDetails.monthName = stPayment.monthName;
                                this.agentDetails.paymentCount = stPayment.paymentCount;
                                this.agentDetails.adviceName = stPaymentDto.adviceName;
                                this.agentDetails.waiveFee = stPaymentDto.waiveFee;
                                this.agentList = [];
                                (this.agentList.indexOf(stPaymentDto.agentName) == -1) ? this.agentList.push(stPaymentDto.agentName) : null;
                              });
                              
                            }
                           });
                          
                          this.appComp.showProgressBar(false);
                    }
                   //11/26 
                    console.log("this.allUniqueAgents : "+this.allUniqueAgents);
                    this.allUniqueAgents.forEach(stPaymentDto => {
                      
                      this.agentMonthelyCountDetail = new AgentCountDetailDto();
                      this.agentMonthelyCountDetail.agentName = stPaymentDto;
                     // this.agentMonthelyCountDetailListForExc.push(this.agentMonthelyCountDetail);
                    });
                    // this.agentMonthelyCountDetailListForExc.forEach(agentNmae =>{
                    //   console.log("this.agentMonthelyCountDetailListForExc : "+agentNmae.agentName);
                    // });

                    
                    //for full flase excel sheet

                    
                    this.agentMonthelyExportCountDetailList = [];
                  
                    this.allUniqueAgents.forEach(agent => {
                      this.allUniqueAgentsDate.forEach(el => {
                        this.agentExportPaydateCashCount = 0;
                        this.agentExportPaydateCollectionCount = 0;
                        this.agentExportPaydateBankCount = 0;
                        this.agentExportPaydateRegularCount = 0;
                        this.agentExportPaydateLosMitCount = 0;
                        this.agentExportPaydateWaiveCashCount = 0;
                        this.agentExportPaydateWaiveCollectionCount = 0;
                        this.agentExportPaydateWaiveBankCount = 0;
                        this.agentExportPaydateWaiveRegularCount = 0;
                        this.agentExportPaydateWaiveLosMitCount = 0;
                        this.agentExportPaydateWaiveTotalCount = 0;
                        this.agentExportAdvicedateCashCount = 0;
                        this.agentExportAdvicedateCollectionCount = 0;
                        this.agentExportAdvicedateBankCount = 0;
                        this.agentExportAdvicedateLosMitCount = 0;
                        this.agentExportPaydateTotalCount = 0;
                        this.agentExportAdvicedateTotalCount = 0;
                        this.agentMonthelyExportCountDetail = new AgentExportDetailDto();
                    if (this.statisticResponse.isSuccessful) {
                      this.statisticPaymentList.forEach(stPayment => {
                        if (stPayment.paymentDto !== null){
                          stPayment.paymentDto.forEach(stPaymentDto => {
                              if(stPaymentDto.adviceName ==="Cashiering" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.paymentCash){
                                this.agentExportPaydateCashCount++;
                                if(stPaymentDto.waiveFee!=0){
                                  this.agentExportPaydateWaiveCashCount++;
                                  }
                              }

                              if(stPaymentDto.adviceName ==="Regular Payment" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.paymentReg){
                                this.agentExportPaydateRegularCount++;
                                if(stPaymentDto.waiveFee!=0){
                                  this.agentExportPaydateWaiveRegularCount++;
                                  }
                              }

                              if(stPaymentDto.adviceName ==="Bankruptcy" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.paymentBank){
                                this.agentExportPaydateBankCount++;
                                if(stPaymentDto.waiveFee!=0){
                                  this.agentExportPaydateWaiveBankCount++;
                                  }
                              }

                              if(stPaymentDto.adviceName ==="Collections" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.paymentColl){
                                this.agentExportPaydateCollectionCount++;
                                if(stPaymentDto.waiveFee!=0){
                                  this.agentExportPaydateWaiveCollectionCount++;
                                  }
                              }

                              if(stPaymentDto.adviceName ==="Loss Mit" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.paymentLossMit){
                                this.agentExportPaydateLosMitCount++;
                                if(stPaymentDto.waiveFee!=0){
                                  this.agentExportPaydateWaiveLosMitCount++;
                                  }
                              }
                              //advice
                              if(stPaymentDto.adviceName ==="Cashiering" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.adviceCash){
                                this.agentExportAdvicedateCashCount++;
                              }
                              if(stPaymentDto.adviceName ==="Bankruptcy" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.adviceBank){
                                 this.agentExportAdvicedateBankCount++;
                              }

                              if(stPaymentDto.adviceName ==="Collections" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.adviceColl){
                                this.agentExportAdvicedateCollectionCount++;
                              }

                              if(stPaymentDto.adviceName ==="Loss Mit" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.adviceLossMit){
                                this.agentExportAdvicedateLosMitCount++;
                              }
                            });
                        }
                      });
                    }
                    this.agentMonthelyExportCountDetail.AgentName = agent;
                    this.agentMonthelyExportCountDetail.MonthName = moment(el, 'MM/DD/YYYY').format("MMM");
                    this.agentMonthelyExportCountDetail.PayDate = el;
                    this.PayDayFormat = '';
                      if(moment(el, 'MM/DD/YYYY').format("ddd") ==='Thu'){
                        this.PayDayFormat = 'Th';
                      }else if(moment(el, 'MM/DD/YYYY').format("ddd") ==='Sun' || moment(el, 'MM/DD/YYYY').format("ddd") ==='Sat'){
                        this.PayDayFormat = 'H';
                      }else{
                        this.PayDayFormat = moment(el, 'MM/DD/YYYY').format("ddd").charAt(0);
                      }  

                    this.agentMonthelyExportCountDetail.PayDay = this.PayDayFormat;
                    this.agentExportPaydateTotalCount = this.agentExportPaydateCashCount+this.agentExportPaydateRegularCount+this.agentExportPaydateBankCount+this.agentExportPaydateCollectionCount+this.agentExportPaydateLosMitCount;
                    this.agentMonthelyExportCountDetail.PaymentTotal = this.agentExportPaydateTotalCount;
                    this.agentMonthelyExportCountDetail.PaymentReg = this.agentExportPaydateRegularCount;
                    this.agentMonthelyExportCountDetail.PaymentCash = this.agentExportPaydateCashCount;
                    this.agentMonthelyExportCountDetail.PaymentBK = this.agentExportPaydateBankCount;
                    this.agentMonthelyExportCountDetail.PaymentColl = this.agentExportPaydateCollectionCount;
                    this.agentMonthelyExportCountDetail.PaymentLossMit = this.agentExportPaydateLosMitCount;
                    this.agentExportPaydateWaiveTotalCount = this.agentExportPaydateWaiveCashCount+this.agentExportPaydateWaiveRegularCount+this.agentExportPaydateWaiveBankCount+this.agentExportPaydateWaiveCollectionCount+this.agentExportPaydateWaiveLosMitCount;
                    this.agentMonthelyExportCountDetail.FeesWaived = this.agentExportPaydateWaiveTotalCount;
                    this.agentExportAdvicedateTotalCount = this.agentExportAdvicedateCashCount+this.agentExportAdvicedateBankCount+this.agentExportAdvicedateCollectionCount+this.agentExportAdvicedateLosMitCount;
                    this.agentMonthelyExportCountDetail.AdviceTotal = this.agentExportAdvicedateTotalCount;
                    this.agentMonthelyExportCountDetail.AdviceCash = this.agentExportAdvicedateCashCount;
                    this.agentMonthelyExportCountDetail.AdviceBK = this.agentExportAdvicedateBankCount;
                    this.agentMonthelyExportCountDetail.AdviceColl = this.agentExportAdvicedateCollectionCount;
                    this.agentMonthelyExportCountDetail.AdviceLossMit = this.agentExportAdvicedateLosMitCount;

                    //this.agentExportAdvicedateTotalCount = 0;
                    
                    if(this.agentExportPaydateTotalCount != 0){
                    this.agentMonthelyExportCountDetailList.push(this.agentMonthelyExportCountDetail);
                    }else{
                       if(this.agentExportAdvicedateTotalCount!=0){
                      this.agentMonthelyExportCountDetailList.push(this.agentMonthelyExportCountDetail);
                    }
                  }

                    
                  });
                });

                this.sortByAgentMultiLevel(this.agentMonthelyExportCountDetailList);
                // this.agentMonthelyExportCountDetailList.forEach(stPayment => {
                //   console.log("Sort :: "+stPayment.AgentName+" : "+stPayment.MonthName+" : "+stPayment.PayDate);

                // });
                if(this.paymentReg || this.paymentCash || this.paymentBank || this.paymentColl || this.paymentLossMit){
                  this.dateWiseHeader.push("Total");
                }
                if(this.paymentReg){
                  this.dateWiseHeader.push("Reg");
                }
                if(this.paymentCash){
                  this.dateWiseHeader.push("Cash");
                }
                if(this.paymentBank){
                  this.dateWiseHeader.push("BK");
                }
                if(this.paymentColl){
                  this.dateWiseHeader.push("Coll");
                }
                if(this.paymentLossMit){
                  this.dateWiseHeader.push("Loss Mit");
                }
                if(this.paymentReg || this.paymentCash || this.paymentBank || this.paymentColl || this.paymentLossMit){
                this.dateWiseHeader.push("Fees Waived");
                }
               
                if(this.adviceCash || this.adviceBank || this.adviceColl  || this.adviceLossMit){
                this.dateWiseHeader.push("Total");
                }
                if(this.adviceCash){
                  this.dateWiseHeader.push("Cash");
                }
                if(this.adviceBank){
                  this.dateWiseHeader.push("BK");
                }
                if(this.adviceColl){
                  this.dateWiseHeader.push("Coll");
                }
                if(this.adviceLossMit){
                  this.dateWiseHeader.push("Loss Mit");
                }
                //  this.dateWiseHeader = ["Agent","Month","Date","Day","Total", "Reg", "Cash", "BK", "Coll", "Loss Mit","Fees Waived","Total","Cash", "BK", "Coll", "Loss Mit"];
            }
                  
                  if(this.OrderType==="Date"){ 
                    this.dateWiseHeader = ["Month","Date","Agent","Day"];
                    //Date tree view
                    this.selectOrderType = "Date";
                    this.agentMonthelyExportCountDetail = new AgentExportDetailDto();
                        statisticRes.statisticPaymentList.forEach((e) => {

                          this.totalcashieringCount = 0;
                          this.totalcollectionCount = 0;
                          this.totalRegularCount = 0;
                          this.totallossMit = 0;
                          this.totalBankruptcy = 0;
          
                          this.totalcashieringAdviceCount = 0;
                          this.totalcollectionAdviceCount = 0;
                          this.totallossMitAdviceCount = 0;
                          this.totalBankruptcyAdviceCount = 0;
                        
                          this.waiveFeesCashieringCount = 0;
                          this.waiveFeesCollectionsCount = 0;
                          this.waiveFeesRegularPaymentCount = 0;
                          this.waiveFeesBankruptcyCount = 0;
                          this.waiveFeesLossMitCount = 0;
                          this.waiveFeesTotalMonthCount = 0;
          
                          if (e.paymentDto !== null) {
                            e.paymentDto.forEach(element => {
                              // if (element.adviceName == "Cashiering") {
                              //   this.totalcashieringCount++;
                              // }
                              switch(element.adviceName) { 
                                case  "Cashiering": {
                                  if(this.paymentCash){
                                  this.totalcashieringCount++;
                                  }
                                  if(this.adviceCash){
                                  this.totalcashieringAdviceCount++;
                                }
                                if(element.waiveFee!==0 && this.paymentCash){
                                    this.waiveFeesCashieringCount++;
                                }
                                  break; 
                                } 
                                case "Collections": { 
                                  if(this.paymentColl){
                                  this.totalcollectionCount++;
                                  }
                                  if(this.adviceColl){
                                  this.totalcollectionAdviceCount++;
                                  }
                                  if(element.waiveFee!==0 && this.paymentColl){
                                    this.waiveFeesCollectionsCount++;
                                }
                                  break; 
                                } 
                                case "Regular Payment": {
                                  if(this.paymentReg){ 
                                  this.totalRegularCount++;
                                  }
                                  if(element.waiveFee!==0  && this.paymentReg){
                                    this.waiveFeesRegularPaymentCount++;
                                }
                                  break; 
                                }
                                case "Loss Mit": { 
                                  if(this.paymentLossMit){ 
                                  this.totallossMit++;
                                  }
                                  if(this.adviceLossMit){
                                  this.totallossMitAdviceCount++;
                                  }
                                  if(element.waiveFee!==0 && this.paymentLossMit){
                                    this.waiveFeesLossMitCount++;
                                }
                                  break; 
                                }
                                case "Bankruptcy": { 
                                  if(this.paymentBank){ 
                                  this.totalBankruptcy++;
                                  }
                                  if(this.adviceBank){
                                  this.totalBankruptcyAdviceCount++;
                                  }
                                  if(element.waiveFee!==0 && this.paymentBank){
                                    this.waiveFeesBankruptcyCount++;
                                }
                                  break; 
                                } 
                                default: { 
                                  //statements; 
                                  break; 
                                } 
                            } 
                            
                            
                            (this.allUniqueAgents.indexOf(element.agentName) == -1) ? this.allUniqueAgents.push(element.agentName) : null;
                            (this.allUniqueAgentsDate.indexOf(element.dateAgent) == -1) ? this.allUniqueAgentsDate.push(element.dateAgent) : null;
                            });
                          }
                          this.grandTotalcashieringCount += this.totalcashieringCount;
                          this.grandTotalcollectionCount += this.totalcollectionCount;
                          this.grandTotalRegularCount += this.totalRegularCount;
                          this.grandTotalLosmitCount += this.totallossMit;
                          this.grandTotalBankruptcyCount += this.totalBankruptcy;
          
                          this.grandTotalcashieringAdviceCount+= this.totalcashieringAdviceCount;
                          this.grandTotalcollectionAdviceCount+= this.totalcollectionAdviceCount;
                          this.grandTotalLosmitAdviceCount+= this.totallossMitAdviceCount;
                          this.grandTotalBankruptcyAdviceCount+= this.totalBankruptcyAdviceCount;
          
                          this.grandTotalCashieringWaveCount+= this.waiveFeesCashieringCount;
                          this.grandTotalcollectionWaveCount+= this.waiveFeesCollectionsCount;
                          this.grandTotalRegularCountgWaveCount+= this.waiveFeesRegularPaymentCount;
                          this.grandTotallossMitWaveCount+= this.waiveFeesLossMitCount;
                          this.grandTotalBankruptcyWaveCount+= this.waiveFeesBankruptcyCount;
                        });   
                        this.grandTotalAllAPaymentCount =    this.grandTotalcashieringCount+this.grandTotalcollectionCount+ this.grandTotalRegularCount+this.grandTotalLosmitCount+this.grandTotalBankruptcyCount; 
                        this.grandTotalAllAdviceCount = this.grandTotalcashieringAdviceCount+this.grandTotalcollectionAdviceCount+this.grandTotalLosmitAdviceCount+this.grandTotalBankruptcyAdviceCount;
                        this.grandTotalAllWaveCount = this.grandTotalCashieringWaveCount+this.grandTotalcollectionWaveCount+this.grandTotalRegularCountgWaveCount+this.grandTotallossMitWaveCount+this.grandTotalBankruptcyWaveCount;
                        console.log("this.allUniqueAgents >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>111 : " + this.allUniqueAgents);
                        console.log("grandTotalcashieringCount : " + this.grandTotalcashieringCount);
                        console.log("grandTotalcollectionCount : " + this.grandTotalcollectionCount);
                        console.log("grandTotalRegularCount : " + this.grandTotalRegularCount);
                        console.log("grandTotalLosmitCount : " + this.grandTotalLosmitCount);
                        console.log("grandTotalBankruptcyCount : " + this.grandTotalBankruptcyCount);
                       

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
                          console.log("this.grandTotalNumber***** : "+this.grandTotalNumber);
                          //.appComp.showSuccessMessage(this.statisticResponse.message, null, false);
                        } else {
                          //this.appComp.showErrorMessage(this.statisticResponse.message, null, false);
                        }
              
                      while (+(iterationDate.add(1, 'month')) < +endDate.endOf('month')) this.monthNames.push(iterationDate.format('MMMM YYYY'));
                     
                      this.getOrderByDateMonthlyCount(this.monthNames);

                       //for Date full flase excel sheet

                    
                    this.agentMonthelyExportCountDetailList = [];
                  
                    this.allUniqueAgents.forEach(agent => {
                      this.allUniqueAgentsDate.forEach(el => {
                        this.agentExportPaydateCashCount = 0;
                        this.agentExportPaydateCollectionCount = 0;
                        this.agentExportPaydateBankCount = 0;
                        this.agentExportPaydateRegularCount = 0;
                        this.agentExportPaydateLosMitCount = 0;
                        this.agentExportPaydateWaiveCashCount = 0;
                        this.agentExportPaydateWaiveCollectionCount = 0;
                        this.agentExportPaydateWaiveBankCount = 0;
                        this.agentExportPaydateWaiveRegularCount = 0;
                        this.agentExportPaydateWaiveLosMitCount = 0;
                        this.agentExportPaydateWaiveTotalCount = 0;
                        this.agentExportAdvicedateCashCount = 0;
                        this.agentExportAdvicedateCollectionCount = 0;
                        this.agentExportAdvicedateBankCount = 0;
                        this.agentExportAdvicedateLosMitCount = 0;
                        this.agentExportPaydateTotalCount = 0;
                        this.agentExportAdvicedateTotalCount = 0;
                        this.agentMonthelyExportCountDetail = new AgentExportDetailDto();
                    if (this.statisticResponse.isSuccessful) {
                      this.statisticPaymentList.forEach(stPayment => {
                        if (stPayment.paymentDto !== null){
                          stPayment.paymentDto.forEach(stPaymentDto => {
                              if(stPaymentDto.adviceName ==="Cashiering" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.paymentCash){
                                this.agentExportPaydateCashCount++;
                                if(stPaymentDto.waiveFee!=0){
                                  this.agentExportPaydateWaiveCashCount++;
                                  }
                              }

                              if(stPaymentDto.adviceName ==="Regular Payment" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.paymentReg){
                                this.agentExportPaydateRegularCount++;
                                if(stPaymentDto.waiveFee!=0){
                                  this.agentExportPaydateWaiveRegularCount++;
                                  }
                              }

                              if(stPaymentDto.adviceName ==="Bankruptcy" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.paymentBank){
                                this.agentExportPaydateBankCount++;
                                if(stPaymentDto.waiveFee!=0){
                                  this.agentExportPaydateWaiveBankCount++;
                                  }
                              }

                              if(stPaymentDto.adviceName ==="Collections" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.paymentColl){
                                this.agentExportPaydateCollectionCount++;
                                if(stPaymentDto.waiveFee!=0){
                                  this.agentExportPaydateWaiveCollectionCount++;
                                  }
                              }

                              if(stPaymentDto.adviceName ==="Loss Mit" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.paymentLossMit){
                                this.agentExportPaydateLosMitCount++;
                                if(stPaymentDto.waiveFee!=0){
                                  this.agentExportPaydateWaiveLosMitCount++;
                                  }
                              }


                              //advice

                              if(stPaymentDto.adviceName ==="Cashiering" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.adviceCash){
                                this.agentExportAdvicedateCashCount++;
                              }
                              if(stPaymentDto.adviceName ==="Bankruptcy" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.adviceBank){
                                 this.agentExportAdvicedateBankCount++;
                              }

                              if(stPaymentDto.adviceName ==="Collections" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.adviceColl){
                                this.agentExportAdvicedateCollectionCount++;
                              }

                              if(stPaymentDto.adviceName ==="Loss Mit" && stPaymentDto.agentName === agent &&  el === stPaymentDto.dateAgent && this.adviceLossMit){
                                this.agentExportAdvicedateLosMitCount++;
                              }
                            });
                        }
                      });
                    }
                    
                    this.agentMonthelyExportCountDetail.MonthName = moment(el, 'MM/DD/YYYY').format("MMM");
                    this.agentMonthelyExportCountDetail.PayDate = el;
                    this.agentMonthelyExportCountDetail.AgentName = agent;
                    this.PayDayFormat = '';
                      if(moment(el, 'MM/DD/YYYY').format("ddd") ==='Thu'){
                        this.PayDayFormat = 'Th';
                      }else if(moment(el, 'MM/DD/YYYY').format("ddd") ==='Sun' || moment(el, 'MM/DD/YYYY').format("ddd") ==='Sat'){
                        this.PayDayFormat = 'H';
                      }else{
                        this.PayDayFormat = moment(el, 'MM/DD/YYYY').format("ddd").charAt(0);
                      }  

                    this.agentMonthelyExportCountDetail.PayDay = this.PayDayFormat;
                    this.agentExportPaydateTotalCount = this.agentExportPaydateCashCount+this.agentExportPaydateRegularCount+this.agentExportPaydateBankCount+this.agentExportPaydateCollectionCount+this.agentExportPaydateLosMitCount;
                    this.agentMonthelyExportCountDetail.PaymentTotal = this.agentExportPaydateTotalCount;
                   
                    this.agentMonthelyExportCountDetail.PaymentReg = this.agentExportPaydateRegularCount;
                   
                    this.agentMonthelyExportCountDetail.PaymentCash = this.agentExportPaydateCashCount;
                    this.agentMonthelyExportCountDetail.PaymentBK = this.agentExportPaydateBankCount;
                    this.agentMonthelyExportCountDetail.PaymentColl = this.agentExportPaydateCollectionCount;
                    this.agentMonthelyExportCountDetail.PaymentLossMit = this.agentExportPaydateLosMitCount;
                    this.agentExportPaydateWaiveTotalCount = this.agentExportPaydateWaiveCashCount+this.agentExportPaydateWaiveRegularCount+this.agentExportPaydateWaiveBankCount+this.agentExportPaydateWaiveCollectionCount+this.agentExportPaydateWaiveLosMitCount;
                    this.agentMonthelyExportCountDetail.FeesWaived = this.agentExportPaydateWaiveTotalCount;
                    this.agentExportAdvicedateTotalCount = this.agentExportAdvicedateCashCount+this.agentExportAdvicedateBankCount+this.agentExportAdvicedateCollectionCount+this.agentExportAdvicedateLosMitCount;
                    this.agentMonthelyExportCountDetail.AdviceTotal = this.agentExportAdvicedateTotalCount;
                    this.agentMonthelyExportCountDetail.AdviceCash = this.agentExportAdvicedateCashCount;
                    this.agentMonthelyExportCountDetail.AdviceBK = this.agentExportAdvicedateBankCount;
                    this.agentMonthelyExportCountDetail.AdviceColl = this.agentExportAdvicedateCollectionCount;
                    this.agentMonthelyExportCountDetail.AdviceLossMit = this.agentExportAdvicedateLosMitCount;

                    //this.agentExportAdvicedateTotalCount = 0;
                    // if(this.agentExportPaydateTotalCount != 0){
                    // this.agentMonthelyExportCountDetailList.push(this.agentMonthelyExportCountDetail);
                    // }
                    if(this.agentExportPaydateTotalCount != 0){
                      this.agentMonthelyExportCountDetailList.push(this.agentMonthelyExportCountDetail);
                      }else{
                         if(this.agentExportAdvicedateTotalCount!=0){
                        this.agentMonthelyExportCountDetailList.push(this.agentMonthelyExportCountDetail);
                      }
                    }
                  });
                });

                this.sortByDateMultiLevel(this.agentMonthelyExportCountDetailList);
                //   this.agentMonthelyExportCountDetailList.forEach(stPayment => {
                //    console.log("Sort :: "+stPayment.MonthName+" : "+stPayment.PayDate+" : "+stPayment.AgentName);
                //  });
                if(this.paymentReg || this.paymentCash || this.paymentBank || this.paymentColl || this.paymentLossMit){
                  this.dateWiseHeader.push("Total");
                }
                if(this.paymentReg){
                  this.dateWiseHeader.push("Reg");
                }
                if(this.paymentCash){
                  this.dateWiseHeader.push("Cash");
                }
                if(this.paymentBank){
                  this.dateWiseHeader.push("BK");
                }
                if(this.paymentColl){
                  this.dateWiseHeader.push("Coll");
                }
                if(this.paymentLossMit){
                  this.dateWiseHeader.push("Loss Mit");
                }
                if(this.paymentReg || this.paymentCash || this.paymentBank || this.paymentColl || this.paymentLossMit){
                  this.dateWiseHeader.push("Fees Waived");
                }
                if(this.adviceCash || this.adviceBank || this.adviceColl  || this.adviceLossMit){
                  this.dateWiseHeader.push("Total");
                  }
               
                if(this.adviceCash){
                  this.dateWiseHeader.push("Cash");
                }
                if(this.adviceBank){
                  this.dateWiseHeader.push("BK");
                }
                if(this.adviceColl){
                  this.dateWiseHeader.push("Coll");
                }
                if(this.adviceLossMit){
                  this.dateWiseHeader.push("Loss Mit");
                }
            }
              }
            this.appComp.showProgressBar(false);
          }
    )
  }

  
  sortByAgentMultiLevel(agentMonthelyExportCountDetailList: AgentExportDetailDto[] = []) {
        agentMonthelyExportCountDetailList.sort(
          function(a, b) {          
             if (a.AgentName === b.AgentName) {
              return new Date(a.PayDate) > new Date(b.PayDate) ? 1:-1;
             }else{
              return  a.AgentName.toString().localeCompare(b.AgentName);   
             }
          });
  }

  sortByDateMultiLevel(agentMonthelyExportCountDetailList: AgentExportDetailDto[] = []) {
    agentMonthelyExportCountDetailList.sort(
    function(a, b) {          
       if (a.PayDate === b.PayDate) {
        return  a.AgentName.toString().localeCompare(b.AgentName);
       }else{
        return new Date(a.PayDate) > new Date(b.PayDate) ? 1:-1;
       }
    });
  }

  sortByAgent(allUniqueAgents = []){
    allUniqueAgents.sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
  });
  }
  highlightRowforMonth(month) {

    this.selectedMonth = month;
    this.selectedDate = '';
    this.selectedAgent = '';
    // this.activeButton = 'All'
    // this.isAllSelectedWithMonth = true;
    // this.isAllClickedWithMonthTotal(month);
  }


  expandRow(index: number, agentName: string): void {
    this.IsMonth = true;
    console.log("check index : " + index + "    " + agentName);
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      console.log("Inn");
      this.agentsForSelectedRow = agentName;
    } else {
      console.log("Out");;
      this.agentsForSelectedRow = '';
    }
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
    this.getAgentTransactionsMonthly(agentName);
    this.monthForSelectedRow = '';
    this.selectedMonth = '';
    this.selectedDate = '';
    //  this.getAgentNameForSpecificMonth(month);
   // alert("this.agentsForSelectedRow : "+this.agentsForSelectedRow+" : "+this.isAgentView+" : "+this.isAgentMonthView);
    // if(this.agentsForSelectedRow === '' && this.isAgentView){
    //   this.isAgentView = true;
    //   this.isAgentMonthView = false;
    // }else if(this.agentsForSelectedRow !== '' && this.isAgentView){
    //   this.isAgentView = true;
    //   this.isAgentMonthView = false;
    // }
    this.isAgentView = !this.isAgentView;
    this.isAgentMonthView = !this.isAgentMonthView;
    this.isAgentDateView = this.isAgentDateView;
    
  }
  expandRowAgent(index: number, agent: string, agentMonthName: string, date: string): void { 
    this.Isdate = true;
    this.isExpandedAgent = !this.isExpandedAgent;
    if (this.isExpandedAgent) {
      this.monthForSelectedRow = agentMonthName;
    } else {
      this.monthForSelectedRow = '';
    }

    this.agentexpandedIndex = index === this.agentexpandedIndex ? -1 : index;
    this.selectedMonth = agentMonthName;
    this.selectedDate = '';
    this.agentsForSelectedRow = ''

    this.getAgentTransactionsDateWise(agent, agentMonthName)

    // this.getDateForAgent(agent,agentMonthName,date);
    this.isAgentView = this.isAgentView;
    this.isAgentMonthView = !this.isAgentMonthView;
    this.isAgentDateView = !this.isAgentDateView;
  }

  expandMonthRowOrderByDate(index: number, month: string): void { 
    this.IsMonth = true;
    this.isExpandedOrderByDate = !this.isExpandedOrderByDate;
    if (this.isExpandedOrderByDate) {
      console.log("Inn");
      this.monthsForSelectedRow = month;
    } else {
      console.log("Out");;
      this.monthsForSelectedRow = '';
    }
    this.expandedMonthIndexOrderByDate = index === this.expandedMonthIndexOrderByDate ? -1 : index;
    
    this.getTransactionsDateWise(month);
    this.dateForSelectedRow = '';
    this.selectedDateInMonth = '';
    this.isExpandedOrderByDateAgent = false;
    this.expandedDateIndexOrderByDate = -1;
    this.selectedDate = '';
    this.isAgentView = !this.isAgentView;
    this.isAgentMonthView = !this.isAgentMonthView;
    this.isAgentDateView = this.isAgentDateView;
   }


  expandDateRowOrderByDate(index: number, agentMonthName: string, date: string): void { 
    this.Isdate = true;
    this.isExpandedOrderByDateAgent = !this.isExpandedOrderByDateAgent;
    if (this.isExpandedOrderByDateAgent) {
      this.dateForSelectedRow = date;
    } else {
      this.dateForSelectedRow = '';
    }

    this.expandedDateIndexOrderByDate = index === this.expandedDateIndexOrderByDate ? -1 : index;
    this.monthsForSelectedRow = '';
    this.selectedDate = date;
    this.getAgentListDateWise(date, agentMonthName);
    this.isAgentView = this.isAgentView;
    this.isAgentMonthView = !this.isAgentMonthView;
    this.isAgentDateView = !this.isAgentDateView;
    
    }


  highlightRowforDate(date: string, month) {

    this.isExpanded = true;
    this.monthForSelectedRow = month;
    this.selectedMonth = '';
    this.selectedDate = date;
    // this.activeButton = 'All'
    // this.isAllSelectedWithDate = true;
    // this.isAllClickedWithDate(date);
  }

  highlightRowforAgent(index: number, agent: string, month, date) {
    this.isExpanded = true;
    this.monthForSelectedRow = '';
    this.selectedMonth = '';
    this.selectedAgent = date;
    this.selectedDate = '';
    // this.activeButton = 'All'
    //this.isAllSelectedWithDate = true;
    //this.isAllClickedWithDate(date);

  }
  highlightRowforAgentDate(index: number, date, agent: string, month) {
    this.isExpanded = true;
    this.monthForSelectedRow = month;
    this.agentForSelectedRow = agent;
    this.selectedMonth = '';
    this.selectedAgent = ''; //'';
    this.selectedDate = date;
   
  }
  
  getAgentNameForSpecificMonthy(month) {
    this.agentMonthName = moment(month, "MMMM YYYY").format('MM/DD/YYYY');

  }
  getAgentTransactionsAgentMonthlyCount(agentName) {

    //sortAgent
    //allUniqueAgents
    this.sortByAgent(agentName);


        agentName.forEach(agentNameelement => {
          this.agentMonthelyCountDetail = new AgentCountDetailDto();
          this.agentMonthelyExportCountDetail = new AgentExportDetailDto();
          this.agentTotalPayCashCount = 0;
          this.agentTotalPayCollectionCount = 0;
          this.agentTotalPayBankCount = 0;
          this.agentTotalPayRegularCount = 0;
          this.agentTotalPayLosMitCount = 0;
          this.agentTotalAllPayAdviceCount = 0;
          this.agentTotalPayWaiveCashCount = 0;
          this.agentTotalPayWaiveCollectionCount = 0;
          this.agentTotalPayWaiveBankCount = 0;
          this.agentTotalPayWaiveRegularCount = 0;
          this.agentTotalPayWaiveLosMitCount = 0;
          this.agentAllTotalPayWaiveLosMitCount = 0;
          this.agentTotalAdviceCashCount = 0;
          this.agentTotalAdviceCollectionCount = 0;
          this.agentTotalAdviceBankCount = 0;
          this.agentTotalAdviceLosMitCount = 0;
          this.agentTotalAllAdviceCount =0;
          
        this.statisticResponse.statisticPaymentList.forEach((e) => {
                    if (e.paymentDto !== null) {
                      
                          this.agentPayCashCount = 0;
                          this.agentPayCollectionCount = 0;
                          this.agentPayBankCount = 0;
                          this.agentPayRegularCount = 0;
                          this.agentPayLosMitCount = 0;
                          this.agentAdviceCashCount = 0;
                          this.agentAdviceCollectionCount = 0;
                          this.agentAdviceBankCount = 0;
                          this.agentAdviceLosMitCount = 0;
                          this.agentPayWaiveCashCount = 0;
                          this.agentPayWaiveCollectionCount = 0;
                          this.agentPayWaiveBankCount = 0;
                          this.agentPayWaiveRegularCount = 0;
                          this.agentPayWaiveLosMitCount = 0;
                          e.paymentDto.forEach(element => {
                          
                              if(element.adviceName ==="Regular Payment" && element.agentName ===agentNameelement && this.paymentReg){
                                this.agentPayRegularCount++;
                                if(element.waiveFee!=0){
                                this.agentPayWaiveRegularCount++;
                                }
                              }
                              if(element.adviceName ==="Cashiering" && element.agentName ===agentNameelement && this.paymentCash){
                                this.agentPayCashCount++;
                                if(element.waiveFee!=0){
                                this.agentPayWaiveCashCount++;
                                }
                              }
                              if(element.adviceName ==="Bankruptcy" && element.agentName ===agentNameelement && this.paymentBank){
                                this.agentPayBankCount++;
                                if(element.waiveFee!=0){
                                this.agentPayWaiveBankCount++;
                                }
                              }
                              if(element.adviceName ==="Collections" && element.agentName ===agentNameelement && this.paymentColl){
                                this.agentPayCollectionCount++;
                                if(element.waiveFee!=0){
                                this.agentPayWaiveCollectionCount++
                                }
                              }
                              if(element.adviceName ==="Loss Mit" && element.agentName ===agentNameelement && this.paymentLossMit){
                                this.agentPayLosMitCount++;
                                if(element.waiveFee!=0){
                                this.agentPayWaiveLosMitCount++
                                }
                              }

                             
                              if(element.adviceName ==="Cashiering" && element.agentName ===agentNameelement && this.adviceCash){
                                this.agentAdviceCashCount++;
                              }
                              if(element.adviceName ==="Bankruptcy" && element.agentName ===agentNameelement && this.adviceBank){
                                this.agentAdviceBankCount++;
                              }
                              if(element.adviceName ==="Collections" && element.agentName ===agentNameelement && this.adviceColl){
                                this.agentAdviceCollectionCount++;
                              }
                              if(element.adviceName ==="Loss Mit" && element.agentName ===agentNameelement && this.adviceLossMit){
                                this.agentAdviceLosMitCount++;
                              }
                          });
                          this.agentTotalPayCashCount+= this.agentPayCashCount;  
                          this.agentTotalPayCollectionCount+= this.agentPayCollectionCount;
                          this.agentTotalPayBankCount+= this.agentPayBankCount;
                          this.agentTotalPayRegularCount+= this.agentPayRegularCount;
                          this.agentTotalPayLosMitCount+= this.agentPayLosMitCount;
                          this.agentTotalAllPayAdviceCount = this.agentTotalPayCashCount+this.agentTotalPayCollectionCount+this.agentTotalPayBankCount+this.agentTotalPayRegularCount+this.agentTotalPayLosMitCount;
                          this.agentTotalPayWaiveCashCount+= this.agentPayWaiveCashCount;
                          this.agentTotalPayWaiveCollectionCount+= this.agentPayWaiveCollectionCount;
                          this.agentTotalPayWaiveBankCount+= this.agentPayWaiveBankCount;
                          this.agentTotalPayWaiveRegularCount+= this.agentPayWaiveRegularCount;
                          this.agentTotalPayWaiveLosMitCount+= this.agentPayWaiveLosMitCount;
                          this.agentAllTotalPayWaiveLosMitCount = this.agentTotalPayWaiveCashCount+this.agentTotalPayWaiveCollectionCount+this.agentTotalPayWaiveBankCount+this.agentTotalPayWaiveRegularCount+this.agentTotalPayWaiveLosMitCount;
                          this.agentTotalAdviceCashCount+= this.agentAdviceCashCount;
                          this.agentTotalAdviceCollectionCount+= this.agentAdviceCollectionCount;
                          this.agentTotalAdviceBankCount+= this.agentAdviceBankCount;
                          this.agentTotalAdviceLosMitCount+= this.agentAdviceLosMitCount;
                          this.agentTotalAllAdviceCount = this.agentTotalAdviceCashCount+this.agentTotalAdviceCollectionCount+this.agentTotalAdviceBankCount+this.agentTotalAdviceLosMitCount;
                    }
          });
         
          this.agentMonthelyCountDetail.cashieringPaymentCount = this.agentTotalPayCashCount;
          this.agentMonthelyCountDetail.collectionsPaymentCount = this.agentTotalPayCollectionCount;
          this.agentMonthelyCountDetail.BankruptcyPaymentCount = this.agentTotalPayBankCount;
          this.agentMonthelyCountDetail.regularPaymentCount = this.agentTotalPayRegularCount;
          this.agentMonthelyCountDetail.losMitPaymentCount = this.agentTotalPayLosMitCount;
          this.agentMonthelyCountDetail.totalPaymentAdviceCount = this.agentTotalAllPayAdviceCount;
          this.agentMonthelyCountDetail.waiveFeeCount = this.agentAllTotalPayWaiveLosMitCount;

          this.agentMonthelyCountDetail.cashieringAdviceCount = this.agentTotalAdviceCashCount;
          this.agentMonthelyCountDetail.collectionsAdviceCount = this.agentTotalAdviceCollectionCount;
          this.agentMonthelyCountDetail.BankruptcyAdviceCount = this.agentTotalAdviceBankCount;
          this.agentMonthelyCountDetail.losMitAdviceCount = this.agentTotalAdviceLosMitCount;
          this.agentMonthelyCountDetail.totalAdviceCount = this.agentTotalAllAdviceCount;
          this.agentMonthelyCountDetail.agentName = agentNameelement;
          this.agentMonthelyCountDetailList.push(this.agentMonthelyCountDetail);


        })
      }
  getAgentTransactionsMonthly(agentName) {
    this.agentMonthlyTransactionDetails = [];
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    this.statisticResponse.statisticPaymentList.forEach((e) => {
      if (e.paymentDto !== null) {
        e.paymentDto.forEach(element => {
          if(element.agentName === agentName)
          {

            (this.agentMonthlyTransactionDetails.indexOf(e.monthName) == -1) ? this.agentMonthlyTransactionDetails.push(e.monthName) : null
          } 
        });
      }
    })

    console.log("this.agentMonthlyTransactionDetails >>>>>>>>>>>>>>>>>>>>>: "+this.agentMonthlyTransactionDetails);
    this.getAgentTransactionsMonthlyCount(this.agentMonthlyTransactionDetails, agentName);
  }
  getAgentTransactionsMonthlyCount(agentMonthlyTransactionDetails, agentName){
    this.agentMonthSpecificCountDetailList = [];
    //this.agentMonthWiseExportCountDetailList = [];
    agentMonthlyTransactionDetails.forEach(element => {
    this.agentMonthSpecificCountDetail = new AgentCountDetailDto();
    this.agentTotalPayMonthCashCount  = 0;
    this.agentTotalPayMonthCollectionCount = 0;
    this.agentTotalPayMonthBankCount = 0;
    this.agentTotalPayMonthRegularCount = 0;
    this.agentTotalPayMonthLosMitCount = 0;
    this.agentTotalAllMonthPayAdviceCount = 0;
    this.agentTotalPayMonthWaiveCashCount = 0;
    this.agentTotalPayMonthWaiveCollectionCount = 0;
    this.agentTotalPayMonthWaiveBankCount = 0;
    this.agentTotalPayMonthWaiveRegularCount = 0;
    this.agentTotalPayMonthWaiveLosMitCount = 0;
    this.agentAllTotalMonthPayWaiveCount = 0;
    this.agentTotalAdviceMonthCashCount = 0;
    this.agentTotalAdviceMonthCollectionCount = 0;
    this.agentTotalAdvicMontheBankCount = 0;
    this.agentTotalAdviceMonthLosMitCount = 0;
    this.agentTotalAllMonthAdviceCount = 0;
      this.statisticResponse.statisticPaymentList.forEach((e) => { 
        this.agentPayMonthCashCount = 0;
        this.agentPayMonthCollectionCount = 0;
        this.agentPayMonthBankCount = 0;
        this.agentPayMonthRegularCount = 0;
        this.agentPayMonthLosMitCount = 0;
        this.agentPayMonthWaiveCashCount = 0;
        this.agentPayMonthWaiveCollectionCount = 0;
        this.agentPayMonthWaiveBankCount = 0;
        this.agentPayMonthWaiveRegularCount = 0;
        this.agentPayMonthWaiveLosMitCount = 0;
        this.agentAdviceMonthCashCount = 0;
        this.agentAdviceMonthCollectionCount = 0;
        this.agentAdviceMonthBankCount = 0;
        this.agentAdviceMonthLosMitCount = 0;
        if(e.paymentDto !=null){
            e.paymentDto.forEach(pdto => {
              if(pdto.adviceName ==="Cashiering" && pdto.agentName === agentName && e.monthName ===element && this.paymentCash){
                this.agentPayMonthCashCount++;
                if(pdto.waiveFee!=0){
                  this.agentPayMonthWaiveCashCount++;
                  }
              }
              if(pdto.adviceName ==="Regular Payment" && pdto.agentName === agentName && e.monthName ===element && this.paymentReg){
                this.agentPayMonthRegularCount++;
                if(pdto.waiveFee!=0){
                  this.agentPayMonthWaiveRegularCount++;
                  }
              }
              if(pdto.adviceName ==="Bankruptcy" && pdto.agentName === agentName && e.monthName ===element && this.paymentBank){
                this.agentPayMonthBankCount++;
                if(pdto.waiveFee!=0){
                  this.agentPayMonthWaiveBankCount++;
                  }
              }
              if(pdto.adviceName ==="Collections" && pdto.agentName === agentName && e.monthName ===element && this.paymentColl){
                this.agentPayMonthCollectionCount++;
                if(pdto.waiveFee!=0){
                  this.agentPayMonthWaiveCollectionCount++;
                  }
              }
              if(pdto.adviceName ==="Loss Mit" && pdto.agentName === agentName && e.monthName ===element && this.paymentLossMit){
                this.agentPayMonthLosMitCount++;
                if(pdto.waiveFee!=0){
                  this.agentPayMonthWaiveLosMitCount++;
                  }
              }

              if(pdto.adviceName ==="Cashiering" && pdto.agentName === agentName && e.monthName ===element && this.adviceCash){
                this.agentAdviceMonthCashCount++;
              }
              if(pdto.adviceName ==="Bankruptcy" && pdto.agentName === agentName && e.monthName ===element && this.adviceBank){
                this.agentAdviceMonthBankCount++;
              }
              if(pdto.adviceName ==="Collections" && pdto.agentName === agentName && e.monthName ===element && this.adviceColl){
                this.agentAdviceMonthCollectionCount++;
              }
              if(pdto.adviceName ==="Loss Mit" && pdto.agentName === agentName && e.monthName ===element && this.adviceLossMit){
                this.agentAdviceMonthLosMitCount++;
              }
            });
          }
            this.agentTotalPayMonthCashCount+= this.agentPayMonthCashCount;
            this.agentTotalPayMonthCollectionCount+= this.agentPayMonthCollectionCount;
            this.agentTotalPayMonthBankCount+= this.agentPayMonthBankCount;
            this.agentTotalPayMonthRegularCount+= this.agentPayMonthRegularCount;
            this.agentTotalPayMonthLosMitCount+= this.agentPayMonthLosMitCount;
            this.agentTotalAllMonthPayAdviceCount = this.agentTotalPayMonthCashCount+this.agentTotalPayMonthCollectionCount+this.agentTotalPayMonthBankCount+this.agentTotalPayMonthRegularCount+this.agentTotalPayMonthLosMitCount;
            this.agentTotalPayMonthWaiveCashCount+= this.agentPayMonthWaiveCashCount;
            this.agentTotalPayMonthWaiveCollectionCount+= this.agentPayMonthWaiveCollectionCount;
            this.agentTotalPayMonthWaiveBankCount+= this.agentPayMonthWaiveBankCount;
            this.agentTotalPayMonthWaiveRegularCount+= this.agentPayMonthWaiveRegularCount;
            this.agentTotalPayMonthWaiveLosMitCount+= this.agentPayMonthWaiveLosMitCount;
            this.agentAllTotalMonthPayWaiveCount = this.agentTotalPayMonthWaiveCashCount+this.agentTotalPayMonthWaiveCollectionCount+this.agentTotalPayMonthWaiveBankCount+this.agentTotalPayMonthWaiveRegularCount+this.agentTotalPayMonthWaiveLosMitCount;
            this.agentTotalAdviceMonthCashCount+= this.agentAdviceMonthCashCount;
            this.agentTotalAdviceMonthCollectionCount+= this.agentAdviceMonthCollectionCount;
            this.agentTotalAdvicMontheBankCount+= this.agentAdviceMonthBankCount;
            this.agentTotalAdviceMonthLosMitCount+= this.agentAdviceMonthLosMitCount;
            this.agentTotalAllMonthAdviceCount = this.agentTotalAdviceMonthCashCount+this.agentTotalAdviceMonthCollectionCount+this.agentTotalAdvicMontheBankCount+this.agentTotalAdviceMonthLosMitCount;
          });
        this.agentMonthSpecificCountDetail.cashieringPaymentCount = this.agentTotalPayMonthCashCount;
        this.agentMonthSpecificCountDetail.collectionsPaymentCount = this.agentTotalPayMonthCollectionCount;
        this.agentMonthSpecificCountDetail.BankruptcyPaymentCount =  this.agentTotalPayMonthBankCount;
        this.agentMonthSpecificCountDetail.regularPaymentCount = this.agentTotalPayMonthRegularCount;
        this.agentMonthSpecificCountDetail.losMitPaymentCount = this.agentTotalPayMonthLosMitCount;
        this.agentMonthSpecificCountDetail.totalPaymentAdviceCount =  this.agentTotalAllMonthPayAdviceCount;
        this.agentMonthSpecificCountDetail.waiveFeeCount = this.agentAllTotalMonthPayWaiveCount;
        this.agentMonthSpecificCountDetail.cashieringAdviceCount = this.agentTotalAdviceMonthCashCount;
        this.agentMonthSpecificCountDetail.collectionsAdviceCount = this.agentTotalAdviceMonthCollectionCount;
        this.agentMonthSpecificCountDetail.BankruptcyAdviceCount = this.agentTotalAdvicMontheBankCount;
        this.agentMonthSpecificCountDetail.losMitAdviceCount = this.agentTotalAdviceMonthLosMitCount;
        this.agentMonthSpecificCountDetail.totalAdviceCount = this.agentTotalAllMonthAdviceCount;
        this.agentMonthSpecificCountDetail.monthName = element;
        this.agentMonthSpecificCountDetailList.push(this.agentMonthSpecificCountDetail);

        });
        
       
  }
  getAgentTransactionsDateWise(agentName, monthName) {
    this.agentDateWiseTransactionDetails = [];
    this.statisticResponse.statisticPaymentList.forEach((e) => {
      let date = moment(e.date, 'MM/DD/YYYY').format("MM/DD/YYYY");
      if (e.monthName === monthName) {
    if (e.paymentDto !== null) {
          e.paymentDto.forEach(element => {
            (element.agentName === agentName) ? (this.agentDateWiseTransactionDetails.indexOf(date) == -1) ? this.agentDateWiseTransactionDetails.push(date) : null : null;
          });
        }
      }
    })
    this.getAgentTransactionsDateWiseCount(this.agentDateWiseTransactionDetails, agentName, monthName);  
  }
  getAgentTransactionsDateWiseCount(agentDateWiseTransactionDetails, agentName, monthName){
    this.agentdateSpecificCountDetailList = [];
    agentDateWiseTransactionDetails.forEach(dateElement => {
     this.agentDateSpecificCountDetail = new AgentCountDetailDto();
     this.agentTotalPaydateCashCount = 0;
     this.agentTotalPaydateCollectionCount = 0;
     this.agentTotalPaydateBankCount = 0;
     this.agentTotalPaydateRegularCount = 0;
     this.agentTotalPaydateLosMitCount = 0;
     this.agentTotalAlldatePayAdviceCount = 0;
     this.agentTotalPaydateWaiveCashCount = 0;
     this.agentTotalPaydateWaiveCollectionCount = 0;
     this.agentTotalPaydateWaiveBankCount = 0;
     this.agentTotalPaydateWaiveRegularCount = 0;
     this.agentTotalPaydateWaiveLosMitCount = 0;
     this.agentAllTotaldatePayWaiveCount = 0;
     this.agentTotalAdvicedateCashCount = 0;
     this.agentTotalAdvicedateCollectionCount = 0;
     this.agentTotalAdvicdateeBankCount = 0;
     this.agentTotalAdvicedateLosMitCount = 0;
     this.agentTotalAlldateAdviceCount = 0;
      this.statisticResponse.statisticPaymentList.forEach((e) => { 
        this.agentPaydateCashCount = 0;
        this.agentPaydateCollectionCount = 0;
        this.agentPaydateBankCount = 0;
        this.agentPaydateRegularCount = 0;
        this.agentPaydateLosMitCount = 0;
        this.agentPaydateWaiveCashCount = 0;
        this.agentPaydateWaiveCollectionCount = 0;
        this.agentPaydateWaiveBankCount = 0;
        this.agentPaydateWaiveRegularCount = 0;
        this.agentPaydateWaiveLosMitCount = 0;
        this.agentAdvicedateCashCount = 0;
        this.agentAdvicedateCollectionCount = 0;
        this.agentAdvicedateBankCount = 0;
        this.agentAdvicedateLosMitCount = 0;
        if(e.paymentDto!=null){
            e.paymentDto.forEach(pdto => {
              if(pdto.adviceName ==="Cashiering" && pdto.agentName === agentName && e.monthName ===monthName && e.dateAgent === dateElement && this.paymentCash){
                this.agentPaydateCashCount++;
                if(pdto.waiveFee!=0){
                  this.agentPaydateWaiveCashCount++;
                  }
              }

              if(pdto.adviceName ==="Regular Payment" && pdto.agentName === agentName && e.monthName ===monthName && e.dateAgent === dateElement && this.paymentReg){
                this.agentPaydateRegularCount++;
                if(pdto.waiveFee!=0){
                  this.agentPaydateWaiveRegularCount++;
                  }
              }

              if(pdto.adviceName ==="Bankruptcy" && pdto.agentName === agentName && e.monthName ===monthName && e.dateAgent === dateElement && this.paymentBank){
                this.agentPaydateBankCount++;
                if(pdto.waiveFee!=0){
                  this.agentPaydateWaiveBankCount++;
                  }
              }

              if(pdto.adviceName ==="Collections" && pdto.agentName === agentName && e.monthName ===monthName && e.dateAgent === dateElement && this.paymentColl){
                this.agentPaydateCollectionCount++;
                if(pdto.waiveFee!=0){
                  this.agentPaydateWaiveCollectionCount++;
                  }
              }

              if(pdto.adviceName ==="Loss Mit" && pdto.agentName === agentName && e.monthName ===monthName && e.dateAgent === dateElement && this.paymentLossMit){
                this.agentPaydateLosMitCount++;
                if(pdto.waiveFee!=0){
                  this.agentPaydateWaiveLosMitCount++;
                  }
              }


              if(pdto.adviceName ==="Cashiering" && pdto.agentName === agentName && e.monthName ===monthName && e.dateAgent === dateElement && this.adviceCash){
                this.agentAdvicedateCashCount++;
              }
              if(pdto.adviceName ==="Collections" && pdto.agentName === agentName && e.monthName ===monthName && e.dateAgent === dateElement && this.adviceColl){
                this.agentAdvicedateCollectionCount++;
              }
              if(pdto.adviceName ==="Bankruptcy" && pdto.agentName === agentName && e.monthName ===monthName && e.dateAgent === dateElement && this.adviceBank){
                this.agentAdvicedateBankCount++;
              }
              if(pdto.adviceName ==="Loss Mit" && pdto.agentName === agentName && e.monthName ===monthName && e.dateAgent === dateElement && this.adviceLossMit
              ){
                this.agentAdvicedateLosMitCount++;
              }
            
            });
          }
             this.agentTotalPaydateCashCount+= this.agentPaydateCashCount;
             this.agentTotalPaydateRegularCount+= this.agentPaydateRegularCount;
             this.agentTotalPaydateBankCount+= this.agentPaydateBankCount;
             this.agentTotalPaydateCollectionCount+= this.agentPaydateCollectionCount;
             this.agentTotalPaydateLosMitCount+= this.agentPaydateLosMitCount;
            this.agentTotalAlldatePayAdviceCount = this.agentTotalPaydateCashCount+this.agentTotalPaydateRegularCount+this.agentTotalPaydateBankCount+this.agentTotalPaydateCollectionCount+this.agentTotalPaydateLosMitCount;
            
             this.agentTotalPaydateWaiveCashCount+= this.agentPaydateWaiveCashCount;
             this.agentTotalPaydateWaiveCollectionCount+= this.agentPaydateWaiveCollectionCount;
             this.agentTotalPaydateWaiveBankCount+= this.agentPaydateWaiveBankCount;
             this.agentTotalPaydateWaiveRegularCount+= this.agentPaydateWaiveRegularCount;
             this.agentTotalPaydateWaiveLosMitCount+= this.agentPaydateWaiveLosMitCount;
             this.agentAllTotaldatePayWaiveCount = this.agentTotalPaydateWaiveCashCount+this.agentTotalPaydateWaiveCollectionCount+this.agentTotalPaydateWaiveBankCount+this.agentTotalPaydateWaiveRegularCount+this.agentTotalPaydateWaiveLosMitCount;
            
             this.agentTotalAdvicedateCashCount+= this.agentAdvicedateCashCount;
            this.agentTotalAdvicedateCollectionCount+= this.agentAdvicedateCollectionCount;
            this.agentTotalAdvicdateeBankCount+= this.agentAdvicedateBankCount;
            this.agentTotalAdvicedateLosMitCount+= this.agentAdvicedateLosMitCount;
            this.agentTotalAlldateAdviceCount = this.agentTotalAdvicedateCashCount+this.agentTotalAdvicedateCollectionCount+this.agentTotalAdvicdateeBankCount+this.agentTotalAdvicedateLosMitCount;
            
          });
         this.agentDateSpecificCountDetail.cashieringPaymentCount= this.agentTotalPaydateCashCount;
         this.agentDateSpecificCountDetail.collectionsPaymentCount = this.agentTotalPaydateCollectionCount;
         this.agentDateSpecificCountDetail.BankruptcyPaymentCount = this.agentTotalPaydateBankCount;
         this.agentDateSpecificCountDetail.regularPaymentCount = this.agentTotalPaydateRegularCount;
         this.agentDateSpecificCountDetail.losMitPaymentCount = this.agentTotalPaydateLosMitCount;
         this.agentDateSpecificCountDetail.totalPaymentAdviceCount = this.agentTotalAlldatePayAdviceCount;
         this.agentDateSpecificCountDetail.waiveFeeCount = this.agentAllTotaldatePayWaiveCount;

         this.agentDateSpecificCountDetail.cashieringAdviceCount= this.agentTotalAdvicedateCashCount;
         this.agentDateSpecificCountDetail.collectionsAdviceCount = this.agentTotalAdvicedateCollectionCount;
         this.agentDateSpecificCountDetail.BankruptcyAdviceCount = this.agentTotalAdvicdateeBankCount;
         this.agentDateSpecificCountDetail.losMitAdviceCount = this.agentTotalAdvicedateLosMitCount;
         this.agentDateSpecificCountDetail.totalAdviceCount = this.agentTotalAlldateAdviceCount;
        this.agentMonthSpecificCountDetail.agentPayDate = dateElement;
        this.agentdateSpecificCountDetailList.push(this.agentDateSpecificCountDetail);

        });
        console.log("length  :"+this.agentdateSpecificCountDetailList.length +" : : "+this.agentdateSpecificCountDetailList);
        this.agentdateSpecificCountDetailList.forEach(pdto => {
         console.log(pdto.agentPayDate+" : "+pdto.cashieringPaymentCount);   
        });
      }

// Order By Dtae Date unique list
getOrderByDateMonthlyCount(monthName) {
  monthName.forEach(agentNameelement => {
    this.agentMonthelyCountDetail = new AgentCountDetailDto();
    this.agentMonthelyExportCountDetail = new AgentExportDetailDto();
    this.agentTotalPayCashCount = 0;
    this.agentTotalPayCollectionCount = 0;
    this.agentTotalPayBankCount = 0;
    this.agentTotalPayRegularCount = 0;
    this.agentTotalPayLosMitCount = 0;
    this.agentTotalAllPayAdviceCount = 0;
    this.agentTotalPayWaiveCashCount = 0;
    this.agentTotalPayWaiveCollectionCount = 0;
    this.agentTotalPayWaiveBankCount = 0;
    this.agentTotalPayWaiveRegularCount = 0;
    this.agentTotalPayWaiveLosMitCount = 0;
    this.agentAllTotalPayWaiveLosMitCount = 0;
    this.agentTotalAdviceCashCount = 0;
    this.agentTotalAdviceCollectionCount = 0;
    this.agentTotalAdviceBankCount = 0;
    this.agentTotalAdviceLosMitCount = 0;
    this.agentTotalAllAdviceCount =0;
    this.statisticResponse.statisticPaymentList.forEach((e) => {
              if (e.paymentDto !== null) {
                    this.agentPayCashCount = 0;
                    this.agentPayCollectionCount = 0;
                    this.agentPayBankCount = 0;
                    this.agentPayRegularCount = 0;
                    this.agentPayLosMitCount = 0;
                    this.agentAdviceCashCount = 0;
                    this.agentAdviceCollectionCount = 0;
                    this.agentAdviceBankCount = 0;
                    this.agentAdviceLosMitCount = 0;
                    this.agentPayWaiveCashCount = 0;
                    this.agentPayWaiveCollectionCount = 0;
                    this.agentPayWaiveBankCount = 0;
                    this.agentPayWaiveRegularCount = 0;
                    this.agentPayWaiveLosMitCount = 0;
                    e.paymentDto.forEach(element => {
                    var month =  moment(e.monthName, 'MMM YYYY').format("MMMM YYYY");
                        if(element.adviceName ==="Regular Payment" && month ===agentNameelement && this.paymentReg){
                          this.agentPayRegularCount++;
                          if(element.waiveFee!=0){
                          this.agentPayWaiveRegularCount++;
                          }
                        }
                        if(element.adviceName ==="Cashiering" && month ===agentNameelement && this.paymentCash){
                          this.agentPayCashCount++;
                          if(element.waiveFee!=0){
                          this.agentPayWaiveCashCount++;
                          }
                        }
                        if(element.adviceName ==="Bankruptcy" && month ===agentNameelement && this.paymentBank){
                          this.agentPayBankCount++;
                          if(element.waiveFee!=0){
                          this.agentPayWaiveBankCount++;
                          }
                        }
                        if(element.adviceName ==="Collections" && month ===agentNameelement && this.paymentColl){
                          this.agentPayCollectionCount++;
                          if(element.waiveFee!=0){
                          this.agentPayWaiveCollectionCount++
                          }
                        }
                        if(element.adviceName ==="Loss Mit" && month ===agentNameelement && this.paymentLossMit){
                          this.agentPayLosMitCount++;
                          if(element.waiveFee!=0){
                          this.agentPayWaiveLosMitCount++
                          }
                        }

                       
                        if(element.adviceName ==="Cashiering" && month ===agentNameelement && this.adviceCash){
                          this.agentAdviceCashCount++;
                        }
                        if(element.adviceName ==="Bankruptcy" && month ===agentNameelement && this.adviceBank){
                          this.agentAdviceBankCount++;
                        }
                        if(element.adviceName ==="Collections" && month ===agentNameelement && this.adviceColl){
                          this.agentAdviceCollectionCount++;
                        }
                        if(element.adviceName ==="Loss Mit" && month ===agentNameelement && this.adviceLossMit){
                          this.agentAdviceLosMitCount++;
                        }
                    });
                    this.agentTotalPayCashCount+= this.agentPayCashCount;  
                    this.agentTotalPayCollectionCount+= this.agentPayCollectionCount;
                    this.agentTotalPayBankCount+= this.agentPayBankCount;
                    this.agentTotalPayRegularCount+= this.agentPayRegularCount;
                    this.agentTotalPayLosMitCount+= this.agentPayLosMitCount;
                    this.agentTotalAllPayAdviceCount = this.agentTotalPayCashCount+this.agentTotalPayCollectionCount+this.agentTotalPayBankCount+this.agentTotalPayRegularCount+this.agentTotalPayLosMitCount;
                    this.agentTotalPayWaiveCashCount+= this.agentPayWaiveCashCount;
                    this.agentTotalPayWaiveCollectionCount+= this.agentPayWaiveCollectionCount;
                    this.agentTotalPayWaiveBankCount+= this.agentPayWaiveBankCount;
                    this.agentTotalPayWaiveRegularCount+= this.agentPayWaiveRegularCount;
                    this.agentTotalPayWaiveLosMitCount+= this.agentPayWaiveLosMitCount;
                    this.agentAllTotalPayWaiveLosMitCount = this.agentTotalPayWaiveCashCount+this.agentTotalPayWaiveCollectionCount+this.agentTotalPayWaiveBankCount+this.agentTotalPayWaiveRegularCount+this.agentTotalPayWaiveLosMitCount;
                    this.agentTotalAdviceCashCount+= this.agentAdviceCashCount;
                    this.agentTotalAdviceCollectionCount+= this.agentAdviceCollectionCount;
                    this.agentTotalAdviceBankCount+= this.agentAdviceBankCount;
                    this.agentTotalAdviceLosMitCount+= this.agentAdviceLosMitCount;
                    this.agentTotalAllAdviceCount = this.agentTotalAdviceCashCount+this.agentTotalAdviceCollectionCount+this.agentTotalAdviceBankCount+this.agentTotalAdviceLosMitCount;
              }
    });
   
    this.agentMonthelyCountDetail.cashieringPaymentCount = this.agentTotalPayCashCount;
    this.agentMonthelyCountDetail.collectionsPaymentCount = this.agentTotalPayCollectionCount;
    this.agentMonthelyCountDetail.BankruptcyPaymentCount = this.agentTotalPayBankCount;
    this.agentMonthelyCountDetail.regularPaymentCount = this.agentTotalPayRegularCount;
    this.agentMonthelyCountDetail.losMitPaymentCount = this.agentTotalPayLosMitCount;
    this.agentMonthelyCountDetail.totalPaymentAdviceCount = this.agentTotalAllPayAdviceCount;
    this.agentMonthelyCountDetail.waiveFeeCount = this.agentAllTotalPayWaiveLosMitCount;
    this.agentMonthelyCountDetail.cashieringAdviceCount = this.agentTotalAdviceCashCount;
    this.agentMonthelyCountDetail.collectionsAdviceCount = this.agentTotalAdviceCollectionCount;
    this.agentMonthelyCountDetail.BankruptcyAdviceCount = this.agentTotalAdviceBankCount;
    this.agentMonthelyCountDetail.losMitAdviceCount = this.agentTotalAdviceLosMitCount;
    this.agentMonthelyCountDetail.totalAdviceCount = this.agentTotalAllAdviceCount;
    this.agentMonthelyCountDetail.monthName = monthName;
    this.agentMonthelyCountDetailList.push(this.agentMonthelyCountDetail);

  });
}
      getTransactionsDateWise(monthName) {
        
        this.dateWiseTransactionDetails = [];
        let monthsName = moment(monthName, 'MMMM YYYY').format("MMM YYYY");
        this.statisticResponse.statisticPaymentList.forEach((e) => {
          let date = moment(e.date, 'MM/DD/YYYY').format("MM/DD/YYYY");
          if (e.monthName === monthsName) {
        if (e.paymentDto !== null) {
              e.paymentDto.forEach(element => {
                (this.dateWiseTransactionDetails.indexOf(date) == -1) ? this.dateWiseTransactionDetails.push(date) : null;
              });
            }
          }
        });
        this.getDateTransactionsOrderByDateCount(this.dateWiseTransactionDetails, monthName);
      }
      getDateTransactionsOrderByDateCount(dateWiseTransactionDetails, monthName){
        this.agentMonthSpecificCountDetailList = [];
       // this.agentMonthWiseExportCountDetailList=[];
        dateWiseTransactionDetails.forEach(element => {
        this.agentMonthSpecificCountDetail = new AgentCountDetailDto();
        this.agentTotalPayMonthCashCount  = 0;
        this.agentTotalPayMonthCollectionCount = 0;
        this.agentTotalPayMonthBankCount = 0;
        this.agentTotalPayMonthRegularCount = 0;
        this.agentTotalPayMonthLosMitCount = 0;
        this.agentTotalAllMonthPayAdviceCount = 0;
        this.agentTotalPayMonthWaiveCashCount = 0;
        this.agentTotalPayMonthWaiveCollectionCount = 0;
        this.agentTotalPayMonthWaiveBankCount = 0;
        this.agentTotalPayMonthWaiveRegularCount = 0;
        this.agentTotalPayMonthWaiveLosMitCount = 0;
        this.agentAllTotalMonthPayWaiveCount = 0;
        this.agentTotalAdviceMonthCashCount = 0;
        this.agentTotalAdviceMonthCollectionCount = 0;
        this.agentTotalAdvicMontheBankCount = 0;
        this.agentTotalAdviceMonthLosMitCount = 0;
        this.agentTotalAllMonthAdviceCount = 0;
          this.statisticResponse.statisticPaymentList.forEach((e) => { 
            this.agentPayMonthCashCount = 0;
            this.agentPayMonthCollectionCount = 0;
            this.agentPayMonthBankCount = 0;
            this.agentPayMonthRegularCount = 0;
            this.agentPayMonthLosMitCount = 0;
            this.agentPayMonthWaiveCashCount = 0;
            this.agentPayMonthWaiveCollectionCount = 0;
            this.agentPayMonthWaiveBankCount = 0;
            this.agentPayMonthWaiveRegularCount = 0;
            this.agentPayMonthWaiveLosMitCount = 0;
            this.agentAdviceMonthCashCount = 0;
            this.agentAdviceMonthCollectionCount = 0;
            this.agentAdviceMonthBankCount = 0;
            this.agentAdviceMonthLosMitCount = 0;
            if(e.paymentDto!=null){
                e.paymentDto.forEach(pdto => {
                  var month =  moment(e.monthName, 'MMM YYYY').format("MMMM YYYY");
                  if(pdto.adviceName ==="Cashiering" && month === monthName && e.dateAgent ===element && this.paymentCash){
                    this.agentPayMonthCashCount++;
                    if(pdto.waiveFee!=0){
                      this.agentPayMonthWaiveCashCount++;
                      }
                  }
                  if(pdto.adviceName ==="Regular Payment" && month === monthName && e.dateAgent ===element && this.paymentReg){
                    this.agentPayMonthRegularCount++;
                    if(pdto.waiveFee!=0){
                      this.agentPayMonthWaiveRegularCount++;
                      }
                  }
                  if(pdto.adviceName ==="Bankruptcy" && month === monthName && e.dateAgent ===element && this.paymentBank){
                    this.agentPayMonthBankCount++;
                    if(pdto.waiveFee!=0){
                      this.agentPayMonthWaiveBankCount++;
                      }
                  }
                  if(pdto.adviceName ==="Collections" && month === monthName && e.dateAgent ===element && this.paymentColl){
                    this.agentPayMonthCollectionCount++;
                    if(pdto.waiveFee!=0){
                      this.agentPayMonthWaiveCollectionCount++;
                      }
                  }
                  if(pdto.adviceName ==="Loss Mit" && month === monthName && e.dateAgent ===element && this.paymentLossMit){
                    this.agentPayMonthLosMitCount++;
                    if(pdto.waiveFee!=0){
                      this.agentPayMonthWaiveLosMitCount++;
                      }
                  }
                  if(pdto.adviceName ==="Cashiering" && month === monthName && e.dateAgent ===element && this.adviceCash){
                    this.agentAdviceMonthCashCount++;
                  }
                  if(pdto.adviceName ==="Bankruptcy" && month === monthName && e.dateAgent ===element && this.adviceBank){
                    this.agentAdviceMonthBankCount++;
                  }
                  if(pdto.adviceName ==="Collections" && month === monthName && e.dateAgent ===element && this.adviceColl){
                    this.agentAdviceMonthCollectionCount++;
                  }
                  if(pdto.adviceName ==="Loss Mit" && month === monthName && e.dateAgent ===element && this.adviceLossMit){
                    this.agentAdviceMonthLosMitCount++;
                  }
                });
              }
                this.agentTotalPayMonthCashCount+= this.agentPayMonthCashCount;
                this.agentTotalPayMonthCollectionCount+= this.agentPayMonthCollectionCount;
                this.agentTotalPayMonthBankCount+= this.agentPayMonthBankCount;
                this.agentTotalPayMonthRegularCount+= this.agentPayMonthRegularCount;
                this.agentTotalPayMonthLosMitCount+= this.agentPayMonthLosMitCount;
                this.agentTotalAllMonthPayAdviceCount = this.agentTotalPayMonthCashCount+this.agentTotalPayMonthCollectionCount+this.agentTotalPayMonthBankCount+this.agentTotalPayMonthRegularCount+this.agentTotalPayMonthLosMitCount;
                this.agentTotalPayMonthWaiveCashCount+= this.agentPayMonthWaiveCashCount;
                this.agentTotalPayMonthWaiveCollectionCount+= this.agentPayMonthWaiveCollectionCount;
                this.agentTotalPayMonthWaiveBankCount+= this.agentPayMonthWaiveBankCount;
                this.agentTotalPayMonthWaiveRegularCount+= this.agentPayMonthWaiveRegularCount;
                this.agentTotalPayMonthWaiveLosMitCount+= this.agentPayMonthWaiveLosMitCount;
                this.agentAllTotalMonthPayWaiveCount = this.agentTotalPayMonthWaiveCashCount+this.agentTotalPayMonthWaiveCollectionCount+this.agentTotalPayMonthWaiveBankCount+this.agentTotalPayMonthWaiveRegularCount+this.agentTotalPayMonthWaiveLosMitCount;
                this.agentTotalAdviceMonthCashCount+= this.agentAdviceMonthCashCount;
                this.agentTotalAdviceMonthCollectionCount+= this.agentAdviceMonthCollectionCount;
                this.agentTotalAdvicMontheBankCount+= this.agentAdviceMonthBankCount;
                this.agentTotalAdviceMonthLosMitCount+= this.agentAdviceMonthLosMitCount;
                this.agentTotalAllMonthAdviceCount = this.agentTotalAdviceMonthCashCount+this.agentTotalAdviceMonthCollectionCount+this.agentTotalAdvicMontheBankCount+this.agentTotalAdviceMonthLosMitCount;
              });
            this.agentMonthSpecificCountDetail.cashieringPaymentCount = this.agentTotalPayMonthCashCount;
            this.agentMonthSpecificCountDetail.collectionsPaymentCount = this.agentTotalPayMonthCollectionCount;
            this.agentMonthSpecificCountDetail.BankruptcyPaymentCount =  this.agentTotalPayMonthBankCount;
            this.agentMonthSpecificCountDetail.regularPaymentCount = this.agentTotalPayMonthRegularCount;
            this.agentMonthSpecificCountDetail.losMitPaymentCount = this.agentTotalPayMonthLosMitCount;
            this.agentMonthSpecificCountDetail.totalPaymentAdviceCount =  this.agentTotalAllMonthPayAdviceCount;
            this.agentMonthSpecificCountDetail.waiveFeeCount = this.agentAllTotalMonthPayWaiveCount;
            this.agentMonthSpecificCountDetail.cashieringAdviceCount = this.agentTotalAdviceMonthCashCount;
            this.agentMonthSpecificCountDetail.collectionsAdviceCount = this.agentTotalAdviceMonthCollectionCount;
            this.agentMonthSpecificCountDetail.BankruptcyAdviceCount = this.agentTotalAdvicMontheBankCount;
            this.agentMonthSpecificCountDetail.losMitAdviceCount = this.agentTotalAdviceMonthLosMitCount;
            this.agentMonthSpecificCountDetail.totalAdviceCount = this.agentTotalAllMonthAdviceCount;
            this.agentMonthSpecificCountDetail.agentPayDate = element;
            this.agentMonthSpecificCountDetailList.push(this.agentMonthSpecificCountDetail);
          
            });
            console.log("length 1212>>. : "+this.agentMonthSpecificCountDetailList.length);
      }
      getAgentListDateWise(date, monthName) {
        this.agentListFordateWise = [];
        this.statisticResponse.statisticPaymentList.forEach((e) => {
          if (e.dateAgent === date) {
        if (e.paymentDto !== null) {
              e.paymentDto.forEach(element => {
                (this.agentListFordateWise.indexOf(element.agentName) == -1) ? this.agentListFordateWise.push(element.agentName) : null;
              });
            }
          }
        });
      this.sortByAgent(this.agentListFordateWise);
      this.getAgentTransDateWiseCountOrderByDate(this.agentListFordateWise, date, monthName); 
      }
      getAgentTransDateWiseCountOrderByDate(agentListFordateWise, date, monthName){ 
        this.agentdateSpecificCountDetailList = [];
        agentListFordateWise.forEach(agentElement => {
         this.agentDateSpecificCountDetail = new AgentCountDetailDto();
         this.agentTotalPaydateCashCount = 0;
         this.agentTotalPaydateCollectionCount = 0;
         this.agentTotalPaydateBankCount = 0;
         this.agentTotalPaydateRegularCount = 0;
         this.agentTotalPaydateLosMitCount = 0;
         this.agentTotalAlldatePayAdviceCount = 0;
         this.agentTotalPaydateWaiveCashCount = 0;
         this.agentTotalPaydateWaiveCollectionCount = 0;
         this.agentTotalPaydateWaiveBankCount = 0;
         this.agentTotalPaydateWaiveRegularCount = 0;
         this.agentTotalPaydateWaiveLosMitCount = 0;
         this.agentAllTotaldatePayWaiveCount = 0;
         this.agentTotalAdvicedateCashCount = 0;
         this.agentTotalAdvicedateCollectionCount = 0;
         this.agentTotalAdvicdateeBankCount = 0;
         this.agentTotalAdvicedateLosMitCount = 0;
         this.agentTotalAlldateAdviceCount = 0;
         this.agentOrder = agentElement;
          this.statisticResponse.statisticPaymentList.forEach((e) => { 
            this.agentPaydateCashCount = 0;
            this.agentPaydateCollectionCount = 0;
            this.agentPaydateBankCount = 0;
            this.agentPaydateRegularCount = 0;
            this.agentPaydateLosMitCount = 0;
            this.agentPaydateWaiveCashCount = 0;
            this.agentPaydateWaiveCollectionCount = 0;
            this.agentPaydateWaiveBankCount = 0;
            this.agentPaydateWaiveRegularCount = 0;
            this.agentPaydateWaiveLosMitCount = 0;
            this.agentAdvicedateCashCount = 0;
            this.agentAdvicedateCollectionCount = 0;
            this.agentAdvicedateBankCount = 0;
            this.agentAdvicedateLosMitCount = 0;
            if(e.paymentDto!=null){
                e.paymentDto.forEach(pdto => {
                  var month =  moment(e.monthName, 'MMM YYYY').format("MMMM YYYY");
                  if(pdto.adviceName ==="Cashiering" && pdto.agentName === agentElement && month ===monthName && e.dateAgent === date && this.paymentCash){
                    this.agentPaydateCashCount++;
                    if(pdto.waiveFee!=0){
                      this.agentPaydateWaiveCashCount++;
                      }
                  }
                  if(pdto.adviceName ==="Regular Payment" && pdto.agentName === agentElement && month ===monthName && e.dateAgent === date && this.paymentReg){
                    this.agentPaydateRegularCount++;
                    if(pdto.waiveFee!=0){
                      this.agentPaydateWaiveRegularCount++;
                      }
                  }
                  if(pdto.adviceName ==="Bankruptcy" && pdto.agentName === agentElement && month ===monthName && e.dateAgent === date && this.paymentBank){
                    this.agentPaydateBankCount++;
                    if(pdto.waiveFee!=0){
                      this.agentPaydateWaiveBankCount++;
                      }
                  }
    
                  if(pdto.adviceName ==="Collections" && pdto.agentName === agentElement && month ===monthName && e.dateAgent === date && this.paymentColl){
                    this.agentPaydateCollectionCount++;
                    if(pdto.waiveFee!=0){
                      this.agentPaydateWaiveCollectionCount++;
                      }
                  }
    
                  if(pdto.adviceName ==="Loss Mit" && pdto.agentName === agentElement && month ===monthName && e.dateAgent === date && this.paymentLossMit){
                    this.agentPaydateLosMitCount++;
                    if(pdto.waiveFee!=0){
                      this.agentPaydateWaiveLosMitCount++;
                      }
                  }
    
    
                  if(pdto.adviceName ==="Cashiering" && pdto.agentName === agentElement && month ===monthName && e.dateAgent === date && this.adviceCash){
                    this.agentAdvicedateCashCount++;
                  }
                  if(pdto.adviceName ==="Collections" && pdto.agentName === agentElement && month ===monthName && e.dateAgent === date && this.adviceColl){
                    this.agentAdvicedateCollectionCount++;
                  }
                  if(pdto.adviceName ==="Bankruptcy" && pdto.agentName === agentElement && month ===monthName && e.dateAgent === date && this.adviceBank){
                    this.agentAdvicedateBankCount++;
                  }
                  if(pdto.adviceName ==="Loss Mit" && pdto.agentName === agentElement && month ===monthName && e.dateAgent === date && this.adviceLossMit){
                    this.agentAdvicedateLosMitCount++;
                  }
                
                });
              }
                 this.agentTotalPaydateCashCount+= this.agentPaydateCashCount;
                 this.agentTotalPaydateRegularCount+= this.agentPaydateRegularCount;
                 this.agentTotalPaydateBankCount+= this.agentPaydateBankCount;
                 this.agentTotalPaydateCollectionCount+= this.agentPaydateCollectionCount;
                 this.agentTotalPaydateLosMitCount+= this.agentPaydateLosMitCount;
                this.agentTotalAlldatePayAdviceCount = this.agentTotalPaydateCashCount+this.agentTotalPaydateRegularCount+this.agentTotalPaydateBankCount+this.agentTotalPaydateCollectionCount+this.agentTotalPaydateLosMitCount;
                 this.agentTotalPaydateWaiveCashCount+= this.agentPaydateWaiveCashCount;
                 this.agentTotalPaydateWaiveCollectionCount+= this.agentPaydateWaiveCollectionCount;
                 this.agentTotalPaydateWaiveBankCount+= this.agentPaydateWaiveBankCount;
                 this.agentTotalPaydateWaiveRegularCount+= this.agentPaydateWaiveRegularCount;
                 this.agentTotalPaydateWaiveLosMitCount+= this.agentPaydateWaiveLosMitCount;
                 this.agentAllTotaldatePayWaiveCount = this.agentTotalPaydateWaiveCashCount+this.agentTotalPaydateWaiveCollectionCount+this.agentTotalPaydateWaiveBankCount+this.agentTotalPaydateWaiveRegularCount+this.agentTotalPaydateWaiveLosMitCount;
                 this.agentTotalAdvicedateCashCount+= this.agentAdvicedateCashCount;
                this.agentTotalAdvicedateCollectionCount+= this.agentAdvicedateCollectionCount;
                this.agentTotalAdvicdateeBankCount+= this.agentAdvicedateBankCount;
                this.agentTotalAdvicedateLosMitCount+= this.agentAdvicedateLosMitCount;
                this.agentTotalAlldateAdviceCount = this.agentTotalAdvicedateCashCount+this.agentTotalAdvicedateCollectionCount+this.agentTotalAdvicdateeBankCount+this.agentTotalAdvicedateLosMitCount;
                  });
             this.agentDateSpecificCountDetail.cashieringPaymentCount= this.agentTotalPaydateCashCount;
             this.agentDateSpecificCountDetail.collectionsPaymentCount = this.agentTotalPaydateCollectionCount;
             this.agentDateSpecificCountDetail.BankruptcyPaymentCount = this.agentTotalPaydateBankCount;
             this.agentDateSpecificCountDetail.regularPaymentCount = this.agentTotalPaydateRegularCount;
             this.agentDateSpecificCountDetail.losMitPaymentCount = this.agentTotalPaydateLosMitCount;
             this.agentDateSpecificCountDetail.totalPaymentAdviceCount = this.agentTotalAlldatePayAdviceCount;
             this.agentDateSpecificCountDetail.waiveFeeCount = this.agentAllTotaldatePayWaiveCount;
             this.agentDateSpecificCountDetail.cashieringAdviceCount= this.agentTotalAdvicedateCashCount;
             this.agentDateSpecificCountDetail.collectionsAdviceCount = this.agentTotalAdvicedateCollectionCount;
             this.agentDateSpecificCountDetail.BankruptcyAdviceCount = this.agentTotalAdvicdateeBankCount;
             this.agentDateSpecificCountDetail.losMitAdviceCount = this.agentTotalAdvicedateLosMitCount;
             this.agentDateSpecificCountDetail.totalAdviceCount = this.agentTotalAlldateAdviceCount;
            this.agentDateSpecificCountDetail.agentName = agentElement;
            this.agentdateSpecificCountDetailList.push(this.agentDateSpecificCountDetail);

            });
           
          }

          exportAsXLSX():void {
          this.exportFlag = true;
          this.onSubmit();
          //   setTimeout(function () {alert("121");
          //       this.excelService.exportAsExcelFile(this.agentMonthelyExportCountDetailList,this.dateWiseHeader,this.agentSearchDetail);
          // }, 10000);
          
          setInterval(()=> { 
            if(this.agentMonthelyExportCountDetailList.length!==0){
              if(this.exportFlag){
            this.excelService.exportAsExcelFile(this.agentMonthelyExportCountDetailList,this.dateWiseHeader,this.agentSearchDetail);
              }
            this.exportFlag = false;
            }
          },  1000);
          }        
}
