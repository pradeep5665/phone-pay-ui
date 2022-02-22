import { Component, ChangeDetectorRef } from '@angular/core';
import { DialogObj } from './dialogBoxModel';
import { Router, ActivatedRoute } from '@angular/router';
import { PathLocationStrategy, PlatformLocation, LocationStrategy, HashLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PhonePayUI';
  progressBar: boolean;
  dialogObj = new DialogObj();
  backDlgObj = new DialogObj();
  param1: string;
  isAlertForPaymentBatch=false;
  progressBar1: boolean;
  progressBar2: boolean;
  constructor(private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private route: Router,pathLocationStrategy: PathLocationStrategy, platformLocation: PlatformLocation) 
  {
    const absolutePathWithParams = pathLocationStrategy.path();
    const basePath = pathLocationStrategy.getBaseHref();
    console.log('basePath', basePath);
    const relativePathWithParams = absolutePathWithParams.replace(basePath, '/');
    console.log('relativePathWithParams', relativePathWithParams)
      this.activatedRoute.queryParams.subscribe(params => {
        console.log('params', params)
      this.param1 = params['t'];
      console.log('token details',this.param1);
        sessionStorage.setItem('userToken',JSON.stringify(this.param1));
    });

    route.navigateByUrl(relativePathWithParams);
  }
  
  ngOnInit() {
  }

  showProgressBar(progress: boolean) {
    this.progressBar = progress;
    this.cdr.detectChanges();
  }

  showProgressBarForPaymentProcessing(progress: boolean) {
    this.progressBar1 = progress;
    this.cdr.detectChanges();
  }

  showProgressBarForPaymentNotification(progress: boolean) {
    this.progressBar2 = progress;
    this.cdr.detectChanges();
  }

  closeDialogBox() {
    this.dialogObj.isDialogBox = false;
    if (this.dialogObj.isBack) {
    } else if (this.dialogObj.routeUrl) {
      this.route.navigate([this.dialogObj.routeUrl]);
    }
  
    
    this.progressBar = false;
    this.cdr.detectChanges();
  }
  
  closeLegendDialogBox() {
    this.dialogObj.isLegendDialogBox = false;
    if (this.dialogObj.isBack) {
    } else if (this.dialogObj.routeUrl) {
      this.route.navigate([this.dialogObj.routeUrl]);
    }
  
    
    this.progressBar = false;
    this.cdr.detectChanges();
  }
  showSuccessMessage(msgContent: string, routerLink: string, isBack: boolean) {
    this.dialogObj.msgHeader = 'Information';
    this.populateMessage(msgContent, routerLink, isBack);
  }

  populateMessage(msgContent: string, routerLink: string, isBack: boolean) {
    this.dialogObj.msgContent = msgContent;
    this.dialogObj.routeUrl = routerLink;
    this.dialogObj.isDialogBox = true;
    this.dialogObj.isBack = isBack;
    this.progressBar = true;
    this.cdr.detectChanges();
  }
populateLegendMessage(msgContent: string, routerLink: string, isBack: boolean) {
    this.dialogObj.msgContent = msgContent;
    this.dialogObj.routeUrl = routerLink;
    this.dialogObj.isLegendDialogBox=true;
    this.dialogObj.isBack = isBack;
    this.progressBar = true;
    this.cdr.detectChanges();
  }
  showErrorMessage(msgContent: string, routerLink: string, isBack: boolean) {
    this.isAlertForPaymentBatch = false;
    this.dialogObj.msgHeader = 'Information';
    this.populateMessage(msgContent, routerLink, isBack);
  }

  showErrorMessageForBatchPayment(msgContent: string, routerLink: string, isBack: boolean) {
    this.isAlertForPaymentBatch = true;
    this.dialogObj.msgHeader = 'Alert!';
    this.populateMessage(msgContent, routerLink, isBack);
  }
}
