import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = environment.logoutPath;
  }

}
