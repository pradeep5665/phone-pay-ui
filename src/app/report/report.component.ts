import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  userDetails: any;
  constructor() { }

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
  }

}
