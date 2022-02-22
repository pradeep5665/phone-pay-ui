import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PhonepayPayments } from '../../model/phonepay-payments.model';
import { Observable } from 'rxjs';
import { PhonepayPaymentsService } from '../phonepay-payments.service';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class PhonepayPaymentsResolver implements Resolve<PhonepayPayments> {

  loanNumber: number = JSON.parse(sessionStorage.getItem('loanNum'));
  constructor(private phonePayService: PhonepayPaymentsService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PhonepayPayments> {
      return this.phonePayService.getBorrowersInfo(this.loanNumber);
   }
}

