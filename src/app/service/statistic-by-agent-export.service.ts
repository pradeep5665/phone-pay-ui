import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { AgentMonthExportDetailDto } from '../model/agent-month-export-detail-dto';
import { StatisticsByAgentSearchDto } from '../model/statistics-by-agent-search-dto';



const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class StatisticByAgentExportService {

  constructor() { }
  agentSearchDetailData : StatisticsByAgentSearchDto;
  agentMonthelyExportCountDetail : AgentMonthExportDetailDto; 
  agentMonthelyExportCountDetailListData: AgentMonthExportDetailDto[] = [];
  header = [];
  paymentCellCount = 0;
  adviceCellCount = 0;
  paymentCell = '';
  adviceCell = '';
  cell = '';
  cell2str = '';
  cell2 = '';
  public exportAsExcelFile(agentMonthelyExportCountDetailList: AgentMonthExportDetailDto[], dateWiseHeader=[],agentSearchDetail:StatisticsByAgentSearchDto): void {
    this.paymentCellCount = 0;
    this.adviceCellCount = 0;
    this.agentSearchDetailData = new StatisticsByAgentSearchDto();
    this.agentMonthelyExportCountDetailListData = [];
    //this.data = [];
    this.agentSearchDetailData = agentSearchDetail;
    this.agentMonthelyExportCountDetailListData = agentMonthelyExportCountDetailList;
    
    dateWiseHeader.forEach(e=>{
      console.log("header : "+e);
    })
    this.generateExcel(this.agentMonthelyExportCountDetailListData,dateWiseHeader,this.agentSearchDetailData);
  }

  
  generateExcel(agentMonthelyExportCountDetailListData: AgentMonthExportDetailDto[] = [],dateWiseHeader=[],  agentSearchDetail:StatisticsByAgentSearchDto) {
    console.log("agentSearchDetail ########## : "+agentSearchDetail.OrderType+" : "+agentSearchDetail.paymentCash);
    console.log("this.agentMonthelyExportCountDetailListData : "+this.agentMonthelyExportCountDetailListData.length);
    //Excel Title, Header, Data
    const title = 'Search Criteria';
   
     this.header = dateWiseHeader;
     console.log("this.header : "+this.header.length);
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Statistics By Agent');
    //Add Row and formatting
    
   //For Title
    let titleRow = title;
    let dateCellTitle = worksheet.getCell('A1');
    dateCellTitle.value = titleRow;
    dateCellTitle.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    dateCellTitle.alignment = { vertical: 'middle', horizontal: 'center' }

   // Date From
    let dateFr = "Date From";
    let dateCell = worksheet.getCell('B3');
    dateCell.value = dateFr;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    dateCell.alignment = { vertical: 'middle', horizontal: 'right' }
    let dateFrVal = agentSearchDetail.startDate;
    let dateCell1 = worksheet.getCell('C3');
    dateCell1.value = dateFrVal;
    dateCell1.font = {
      name: 'Calibri',
      size: 12,
      //bold: true
    }
    dateCell1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    dateCell1.alignment = { vertical: 'middle', horizontal: 'right' }

//Date To
    let dateTo = "Date To";
    let dateCellTo = worksheet.getCell('F3');
    dateCellTo.value = dateTo;
    dateCellTo.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    dateCellTo.alignment = { vertical: 'middle', horizontal: 'right' }
    let dateValTo = agentSearchDetail.endDate;
    let dateCellTo1 = worksheet.getCell('G3');
    dateCellTo1.value = dateValTo;
    dateCellTo1.font = {
      name: 'Calibri',
      size: 12,
      //bold: true
    }
    dateCellTo1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    dateCellTo1.alignment = { vertical: 'middle', horizontal: 'right' }

// Payment Type

      let paymentType = "Payment Type";
      let paymentTypeCell = worksheet.getCell('B4');
      paymentTypeCell.value = paymentType;
      paymentTypeCell.font = {
        name: 'Calibri',
        size: 12,
        bold: true
      }
      paymentTypeCell.alignment = { vertical: 'middle', horizontal: 'right' }

      //Cash
      let paymentTypeCashStatus = "CASH";
      let paymentTypeCashStatusCell = worksheet.getCell('C4');
      if(agentSearchDetail.paymentCash){
      paymentTypeCashStatusCell.value = paymentTypeCashStatus;
      }
      paymentTypeCashStatusCell.font = {
        name: 'Calibri',
        size: 12,
      }
      paymentTypeCashStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }

      //BK

      let paymentTypeBKStatus = "BK";
      let paymentTypeBKStatusCell = worksheet.getCell('D4');
      if(agentSearchDetail.paymentBank){
      paymentTypeBKStatusCell.value = paymentTypeBKStatus;
      }
      paymentTypeBKStatusCell.font = {
        name: 'Calibri',
        size: 12,
      }
      paymentTypeBKStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }

      // COLL 

      let paymentTypeCOLLStatus = "COLL";
      let paymentTypeCOLLStatusCell = worksheet.getCell('E4');
      if(agentSearchDetail.paymentColl){
      paymentTypeCOLLStatusCell.value = paymentTypeCOLLStatus;
      }
      paymentTypeCOLLStatusCell.font = {
        name: 'Calibri',
        size: 12,
      }
      paymentTypeCOLLStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }

      // LOSS MIT

      let paymentTypeLOSSMITStatus = "LOSS MIT";
      let paymentTypeLOSSMITStatusCell = worksheet.getCell('F4');
      if(agentSearchDetail.paymentLossMit){
      paymentTypeLOSSMITStatusCell.value = paymentTypeLOSSMITStatus;
      }
      paymentTypeCashStatusCell.font = {
        name: 'Calibri',
        size: 12,
      }
      paymentTypeLOSSMITStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }

      // REG 

      let paymentTypeREGStatus = "REG";
      let paymentTypeREGStatusCell = worksheet.getCell('G4');
      if(agentSearchDetail.paymentReg){
      paymentTypeREGStatusCell.value = paymentTypeREGStatus;
    }
      paymentTypeREGStatusCell.font = {
        name: 'Calibri',
        size: 12,
      }
      paymentTypeREGStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }


    // Advice Type

    let adviceType = "Advice Type";
    let adviceTypeCell = worksheet.getCell('B5');
    adviceTypeCell.value = adviceType;
    adviceTypeCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    adviceTypeCell.alignment = { vertical: 'middle', horizontal: 'right' }

    //Cash
    let adviceTypeCashStatus = "CASH";
    let adviceTypeCashStatusCell = worksheet.getCell('C5');
    if(agentSearchDetail.adviceCash){
    adviceTypeCashStatusCell.value = adviceTypeCashStatus;
    }
    adviceTypeCashStatusCell.font = {
      name: 'Calibri',
      size: 12,
    }
    adviceTypeCashStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }

    //BK

    let adviceTypeBKStatus = "BK";
    let adviceTypeBKStatusCell = worksheet.getCell('D5');
    if(agentSearchDetail.adviceBank){
    adviceTypeBKStatusCell.value = adviceTypeBKStatus;
    }
    adviceTypeBKStatusCell.font = {
      name: 'Calibri',
      size: 12,
    }
    adviceTypeBKStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }

    // COLL 

    let adviceTypeCOLLStatus = "COLL";
    let adviceTypeCOLLStatusCell = worksheet.getCell('E5');
    if(agentSearchDetail.adviceColl){
    adviceTypeCOLLStatusCell.value = adviceTypeCOLLStatus;
    }
    adviceTypeCOLLStatusCell.font = {
      name: 'Calibri',
      size: 12,
    }
    adviceTypeCOLLStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }

    // LOSS MIT

    let adviceTypeLOSSMITStatus = "LOSS MIT";
    let adviceTypeLOSSMITStatusCell = worksheet.getCell('F5');
    if(agentSearchDetail.adviceLossMit){
    adviceTypeLOSSMITStatusCell.value = adviceTypeLOSSMITStatus;
    }
    adviceTypeCashStatusCell.font = {
      name: 'Calibri',
      size: 12,
    }
    adviceTypeLOSSMITStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }
    

    // Order Type

    let orderType = "Order by";
    let orderTypeStatusCell = worksheet.getCell('B6');
    orderTypeStatusCell.value = orderType;
    orderTypeStatusCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    orderTypeStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }

    // Agent/ Date 

    let agentTypeStatus = agentSearchDetail.OrderType;
    let agentTypeStatusCell = worksheet.getCell('C6');
    agentTypeStatusCell.value = agentTypeStatus;
    agentTypeStatusCell.font = {
      name: 'Calibri',
      size: 12,
    }
    agentTypeStatusCell.alignment = { vertical: 'middle', horizontal: 'right' }

    


    
    worksheet.getCell('A8');
    let headerRow = worksheet.addRow(this.header);
    headerRow.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
   // dateCellTo1.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
   headerRow.alignment = { vertical: 'middle', horizontal: 'left' }
   
      agentMonthelyExportCountDetailListData.forEach(stPayment => { 
        this.agentMonthelyExportCountDetail = new AgentMonthExportDetailDto();
        if(agentSearchDetail.OrderType==="Agent"){
          if(agentSearchDetail.paymentCash || agentSearchDetail.paymentBank || agentSearchDetail.paymentColl || agentSearchDetail.paymentLossMit || agentSearchDetail.paymentReg){
            this.paymentCellCount = 1;
          }
          this.adviceCellCount = 0;
        this.agentMonthelyExportCountDetail.AgentName = stPayment.AgentName;
        this.agentMonthelyExportCountDetail.MonthName = stPayment.MonthName;
        this.agentMonthelyExportCountDetail.PayDate = stPayment.PayDate;
        this.agentMonthelyExportCountDetail.PayDay = stPayment.PayDay;
        if(agentSearchDetail.paymentCash || agentSearchDetail.paymentBank || agentSearchDetail.paymentColl || agentSearchDetail.paymentLossMit || agentSearchDetail.paymentReg){
          this.agentMonthelyExportCountDetail.PaymentTotal = stPayment.PaymentTotal;
        }
        if(agentSearchDetail.paymentReg){
        this.agentMonthelyExportCountDetail.PaymentReg = stPayment.PaymentReg;
        this.paymentCellCount=this.paymentCellCount+1;
        }
        if(agentSearchDetail.paymentCash){
        this.agentMonthelyExportCountDetail.PaymentCash = stPayment.PaymentCash;
        this.paymentCellCount=this.paymentCellCount+1;
        }
        if(agentSearchDetail.paymentBank){
        this.agentMonthelyExportCountDetail.PaymentBK = stPayment.PaymentBK;
        this.paymentCellCount=this.paymentCellCount+1;
        }
        if(agentSearchDetail.paymentColl){
        this.agentMonthelyExportCountDetail.PaymentColl = stPayment.PaymentColl;
        this.paymentCellCount=this.paymentCellCount+1;
        }
        if(agentSearchDetail.paymentLossMit){
        this.agentMonthelyExportCountDetail.PaymentLossMit = stPayment.PaymentLossMit;
        this.paymentCellCount=this.paymentCellCount+1;
        }
        if(agentSearchDetail.paymentCash || agentSearchDetail.paymentBank || agentSearchDetail.paymentColl || agentSearchDetail.paymentLossMit || agentSearchDetail.paymentReg){
          this.agentMonthelyExportCountDetail.FeesWaived = stPayment.FeesWaived;
        }
        if(agentSearchDetail.adviceCash || agentSearchDetail.adviceBank || agentSearchDetail.adviceColl || agentSearchDetail.adviceLossMit){
        this.agentMonthelyExportCountDetail.AdviceTotal = stPayment.AdviceTotal;
        }
       // alert("payment count : "+this.paymentCellCount);
        if(agentSearchDetail.adviceCash){
        this.agentMonthelyExportCountDetail.AdviceCash = stPayment.AdviceCash;
        this.adviceCellCount = this.adviceCellCount+1;
        }
        if(agentSearchDetail.adviceBank){
        this.agentMonthelyExportCountDetail.AdviceBK = stPayment.AdviceBK;
        this.adviceCellCount = this.adviceCellCount+1;
        }
        if(agentSearchDetail.adviceColl){
        this.agentMonthelyExportCountDetail.AdviceColl = stPayment.AdviceColl;
        this.adviceCellCount = this.adviceCellCount+1;
        }
        if(agentSearchDetail.adviceLossMit){
        this.agentMonthelyExportCountDetail.AdviceLossMit = stPayment.AdviceLossMit;
        this.adviceCellCount = this.adviceCellCount+1;
        }
      }else{
        if(agentSearchDetail.paymentCash || agentSearchDetail.paymentBank || agentSearchDetail.paymentColl || agentSearchDetail.paymentLossMit || agentSearchDetail.paymentReg){
          this.paymentCellCount = 1;
          }else{
            this.paymentCellCount = 0;
          }
          this.adviceCellCount = 0;
        this.agentMonthelyExportCountDetail.MonthName = stPayment.MonthName;
        this.agentMonthelyExportCountDetail.PayDate = stPayment.PayDate;
        this.agentMonthelyExportCountDetail.AgentName = stPayment.AgentName;
        this.agentMonthelyExportCountDetail.PayDay = stPayment.PayDay;
        if(agentSearchDetail.paymentCash || agentSearchDetail.paymentBank || agentSearchDetail.paymentColl || agentSearchDetail.paymentLossMit || agentSearchDetail.paymentReg){
        this.agentMonthelyExportCountDetail.PaymentTotal = stPayment.PaymentTotal;
        }
        if(agentSearchDetail.paymentReg){
        this.agentMonthelyExportCountDetail.PaymentReg = stPayment.PaymentReg;
        this.paymentCellCount=this.paymentCellCount+1;
        }
        if(agentSearchDetail.paymentCash){
        this.agentMonthelyExportCountDetail.PaymentCash = stPayment.PaymentCash;
        this.paymentCellCount=this.paymentCellCount+1;
        }
        if(agentSearchDetail.paymentBank){
        this.agentMonthelyExportCountDetail.PaymentBK = stPayment.PaymentBK;
        this.paymentCellCount=this.paymentCellCount+1;
        }
        if(agentSearchDetail.paymentColl){
        this.agentMonthelyExportCountDetail.PaymentColl = stPayment.PaymentColl;
        this.paymentCellCount=this.paymentCellCount+1;
        }
        if(agentSearchDetail.paymentLossMit){
        this.agentMonthelyExportCountDetail.PaymentLossMit = stPayment.PaymentLossMit;
        this.paymentCellCount=this.paymentCellCount+1;
        }
        if(agentSearchDetail.paymentCash || agentSearchDetail.paymentBank || agentSearchDetail.paymentColl || agentSearchDetail.paymentLossMit || agentSearchDetail.paymentReg){
        this.agentMonthelyExportCountDetail.FeesWaived = stPayment.FeesWaived;
        }
        
        if(agentSearchDetail.adviceCash || agentSearchDetail.adviceBank || agentSearchDetail.adviceColl || agentSearchDetail.adviceLossMit){
          this.agentMonthelyExportCountDetail.AdviceTotal = stPayment.AdviceTotal;
        }
        
        if(agentSearchDetail.adviceCash){
        this.agentMonthelyExportCountDetail.AdviceCash = stPayment.AdviceCash;
        this.adviceCellCount = this.adviceCellCount+1;
        }
        if(agentSearchDetail.adviceBank){
        this.agentMonthelyExportCountDetail.AdviceBK = stPayment.AdviceBK;
        this.adviceCellCount = this.adviceCellCount+1;
        }
        if(agentSearchDetail.adviceColl){
        this.agentMonthelyExportCountDetail.AdviceColl = stPayment.AdviceColl;
        this.adviceCellCount = this.adviceCellCount+1;
        }
        if(agentSearchDetail.adviceLossMit){
        this.agentMonthelyExportCountDetail.AdviceLossMit = stPayment.AdviceLossMit;
        this.adviceCellCount = this.adviceCellCount+1;
        }
      }
        
        worksheet.addRow(Object.values(this.agentMonthelyExportCountDetail));
      })
    
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 15;
    worksheet.getColumn(8).width = 15;
    worksheet.getColumn(9).width = 15;
    worksheet.getColumn(10).width = 15;
    worksheet.getColumn(11).width = 15;
    worksheet.getColumn(12).width = 15;
    worksheet.getColumn(13).width = 15;
    worksheet.getColumn(14).width = 15;
    worksheet.getColumn(15).width = 15;
    worksheet.getColumn(16).width = 15;
    this.cell = String.fromCharCode(69+this.paymentCellCount)+""+8;
       if(this.paymentCellCount!==0){
        worksheet.mergeCells("'E8:"+this.cell+"'");
        let payments = "Payment";
        let paymentsCell = worksheet.getCell('E8');
        paymentsCell.value = payments;
        paymentsCell.font = {
          name: 'Calibri',
          size: 12,
          bold: true
        }
        paymentsCell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        paymentsCell.alignment = { vertical: 'middle', horizontal: 'center' }
        this.cell2str = String.fromCharCode(69+this.paymentCellCount+1)+""+8;
        this.cell2 = String.fromCharCode(69+this.paymentCellCount+1+this.adviceCellCount)+""+8;
      }else{
        if(this.adviceCellCount!==0){
        this.cell2str = String.fromCharCode(69+this.paymentCellCount)+""+8;
        this.cell2 = String.fromCharCode(69+this.paymentCellCount+this.adviceCellCount)+""+8;
        }
      }

       if(this.adviceCellCount!==0){
        worksheet.mergeCells("'"+this.cell2str+":"+this.cell2+"'")
        let compledteadvice = "Completed Advice";
        let compledteadviceCell = worksheet.getCell(this.cell2str);
        compledteadviceCell.value = compledteadvice;
        compledteadviceCell.font = {
          name: 'Calibri',
          size: 12,
          bold: true
        }
        
        compledteadviceCell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        compledteadviceCell.alignment = { vertical: 'middle', horizontal: 'center' }
      }
    
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'StatisticByAgent.xlsx');
    })
  }

}
