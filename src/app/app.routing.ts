import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { CheckRequestComponent } from './check-request/check-request.component';
import { PhonepayCheckPaymentComponent } from './phonepay-check-payment/phonepay-check-payment.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GetPaymentAdviceListComponent } from './get-payment-advice-list/get-payment-advice-list.component';
import { PaymentAdviseComponent } from './payment-advise/payment-advise.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminPaymentAdviceListComponent } from './admin-payment-advice-list/admin-payment-advice-list.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { LogoutComponent } from './logout/logout.component';
import { PaymentsInProcessComponent } from './payments-in-process/payments-in-process.component';
import { ResearchPaymentsComponent } from './research-payments/research-payments.component';
import { ReportComponent } from './report/report.component';
import { ResearchPaymentDetailsComponent } from './research-payment-details/research-payment-details.component';
import { StatisticDetailsComponent } from './statistic-details/statistic-details.component';
import { ProcessPaymentsComponent } from './process-payments/process-payments.component';
import { StatisticDetailsByAgentComponent } from './statistic-details-by-agent/statistic-details-by-agent.component';
const routes: Routes = [
    { path: 'login', component: LoginComponent,  canActivate: [AuthGuardGuard] },
    { path: 'app-logout', component: LogoutComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },
    { path: 'check-request', component: CheckRequestComponent, canActivate: [AuthGuardGuard] },
    { path : '', component: LoginComponent},
    { path: 'phonepay-check-payment', component: PhonepayCheckPaymentComponent, canActivate: [AuthGuardGuard] },
    { path: 'app-admin-dashboard', component: AdminDashboardComponent,canActivate: [AuthGuardGuard] },
    { path : 'get-payment-advice-list', component: GetPaymentAdviceListComponent, canActivate: [AuthGuardGuard]},
    { path : 'payment-advise', component: PaymentAdviseComponent, canActivate: [AuthGuardGuard]},
    { path: 'app-admin-payment-advice-list' , component: AdminPaymentAdviceListComponent, canActivate: [AuthGuardGuard]},
    { path: 'app-payments-in-process' , component: PaymentsInProcessComponent, canActivate: [AuthGuardGuard]}, 
    { path: 'app-process-payments', component: ProcessPaymentsComponent, canActivate: [AuthGuardGuard]},
    { path: 'app-research-payments' , component: ResearchPaymentsComponent, canActivate: [AuthGuardGuard]},
    { path: 'app-report' , component: ReportComponent, canActivate: [AuthGuardGuard]},
    { path: 'app-research-payment-details', component: ResearchPaymentDetailsComponent, canActivate: [AuthGuardGuard]},
    { path: 'app-statistic-details', component: StatisticDetailsComponent},
    { path: 'app-statistic-details-by-agent', component: StatisticDetailsByAgentComponent},
    { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
