import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../components/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private sidebar: SidebarService) { }


  close() {
    this.sidebar.close();
  }
  ngOnInit(): void {
  }

}
