import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, PathLocationStrategy, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { AuthenticationService } from './service/auth.service';
import { PhonepayPaymentsService } from './service/phonepay-payments.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhonepayPaymentsResolver } from './service/resolvers/phonepay-payments.resolver';
import { LoanInfoService } from './service/loan-info.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CheckRequestComponent } from './check-request/check-request.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SchedulePhonePayPaymentsService } from './service/schedule-phone-pay-payments.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import {PhonepayCheckPaymentComponent} from './phonepay-check-payment/phonepay-check-payment.component';
import {NgxMaskModule, MaskService} from 'ngx-mask';
import { AutofocusDirective } from './autofocus.directive'
import { ValidateUserService } from './service/validate-user.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GetPaymentAdviceListComponent } from './get-payment-advice-list/get-payment-advice-list.component';
import { GetPaymentAdviceService } from './service/get-payment-advice.service';
import { PaymentAdviseComponent } from './payment-advise/payment-advise.component';
import { CheckRequestDisabledComponent } from './check-request-disabled/check-request-disabled.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CancelPaymentService } from './service/cancel-payment.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminPaymentAdviceListComponent } from './admin-payment-advice-list/admin-payment-advice-list.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminCheckRequestDisabledComponent } from './admin-check-request-disabled/admin-check-request-disabled.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PaymentsInProcessComponent } from './payments-in-process/payments-in-process.component';
import { PaymentsInProcessService } from './service/payments-in-process.service';
import { ResearchPaymentsComponent } from './research-payments/research-payments.component';
import { ReportComponent } from './report/report.component';
import { ResearchPaymentDetailsComponent } from './research-payment-details/research-payment-details.component';
import { GetNamesService } from './service/get-names.service';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatDatepickerModule} from '@angular/material';
import { StatisticDetailsComponent } from './statistic-details/statistic-details.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ProcessPaymentsComponent } from './process-payments/process-payments.component';
import { GetProcessPaymentsListService } from './service/get-process-payments-list.service';
import { StatisticDetailsService } from './service/statistic-details.service';
import { OnlynumberDirective } from './onlynumber.directive';
import { ValidateLoanNumberDirective } from './validate-loan-number.directive';
import { ValidateAmmountFieldDirective } from './validate-ammount-field.directive';
import { TwoDigitDecimaNumberDirective } from './two-digit-decima-number.directive';
import { ThreeAlphanumericRisDirective } from './three-alphanumeric-ris.directive';
import { ValidateEmailDirective } from './validate-email.directive';
import { FocusEmailInputboxDirective } from './focus-email-inputbox.directive';
import { ValidateAccountNumberDirective } from './validate-account-number.directive';
import { ValidateStateandcityDirective } from './validate-stateandcity.directive';
import { ValidateZipcodeDirective } from './validate-zipcode.directive';
import { ModeFocusDirective } from './mode-focus.directive';
import { MatNativeDateModule } from '@angular/material/core';
import { StatisticDetailsByAgentComponent } from './statistic-details-by-agent/statistic-details-by-agent.component';
import { ValidateRoutingNumberDirective } from "./validate-routing-number.directive";
import {PhonepayPaymentsComponent} from "./phonepay-payments/phonepay-payments.component";
import { StatisticByAgentExportService } from './service/statistic-by-agent-export.service';
import { AutocompleteDirective } from './autocomplete-off.directive';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    CheckRequestComponent,
    PhonepayCheckPaymentComponent,
    AutofocusDirective,
    AdminDashboardComponent,
    GetPaymentAdviceListComponent,
    PaymentAdviseComponent,
    CheckRequestDisabledComponent,
    PageNotFoundComponent,
    AdminPaymentAdviceListComponent,
    LogoutComponent,
    AdminCheckRequestDisabledComponent,
    PaymentsInProcessComponent,
    ResearchPaymentsComponent,
    ReportComponent,
    ResearchPaymentDetailsComponent,
    StatisticDetailsComponent,
    ProcessPaymentsComponent,
    OnlynumberDirective,
    ValidateLoanNumberDirective,
    ValidateAmmountFieldDirective,
    TwoDigitDecimaNumberDirective,
    ThreeAlphanumericRisDirective,
    ValidateEmailDirective,
    FocusEmailInputboxDirective,
    ValidateAccountNumberDirective,
    ValidateStateandcityDirective,
    ValidateZipcodeDirective,
    ModeFocusDirective,
    StatisticDetailsByAgentComponent,
    ValidateRoutingNumberDirective,
    PhonepayPaymentsComponent,
    AutocompleteDirective,

  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    routing,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    DragDropModule,
    ScrollingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    AuthenticationService,
    CancelPaymentService,
    PhonepayPaymentsService,
    LoanInfoService,
    SchedulePhonePayPaymentsService,
    ValidateUserService,
    PaymentsInProcessService,
    PhonepayPaymentsResolver,
    GetPaymentAdviceService,
    PathLocationStrategy,
    GetNamesService,
    GetProcessPaymentsListService,
    StatisticDetailsService,
    StatisticByAgentExportService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
