import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar_menu } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }
  items: any ;

  ngOnInit(): void {
    this.items = Sidebar_menu;
  }

  navigate(routerLink) {
    this.router.navigate([routerLink])
  }

}
