import { Component, OnInit } from '@angular/core';
import { DsActiveModal } from 'src/app/components/modal/modal-ref';
import { DsModal } from 'src/app/components/modal/modal.service';
import { SidebarService } from 'src/app/components/sidebar/sidebar.service';
import { ExampleModalComponent } from 'src/app/example-modal/example-modal.component';
import { DialogService, DynamicDialogRef } from 'src/app/primeng-modal/dialog/dynamicdialog/public_api';

@Component({
  selector: 'app-model-demo',
  templateUrl: './model-demo.component.html',
  styleUrls: ['./model-demo.component.scss']
})
export class ModelDemoComponent implements OnInit {

  constructor(private service: DsModal, public dialogService: DialogService, private sidebar: SidebarService) { }

  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
  }

  show() {
    this.ref = this.dialogService.open(ExampleModalComponent, { header: 'Select a Product'});
}

  openModal() {
    this.service.open(ExampleModalComponent)
  }

  openSidebar() {
    this.sidebar.open(ExampleModalComponent, {position: "left"});
  }

}
