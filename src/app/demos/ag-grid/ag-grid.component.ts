import { Component, OnInit, ViewChild } from '@angular/core';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
})

// First install

// npm install --save ag-grid-community
export class AgGridDemoComponent implements OnInit {
  columnDefs: ColDef[] = [
    {
      headerName: 'Tickers',
      field: 'ticker',
      suppressMenu: true,
      cellRenderer: (params) => {
        let TEMPLATE;
        if (params?.data?.ticker) {
          TEMPLATE = `<div class="security-container"><div class="security-name">${params?.data?.securityName}</div>`;

          return (
            TEMPLATE +
            `
            <div class="ticker-container">
              <div class="ticker-value">${params?.data?.ticker}</div>
              <div class="cusip-value">${params?.data?.cusipId}</div>
            </div>
            </div>
            `
          );
        }
      },
    },
    {
      headerName: 'Security Name',
      field: 'securityName',
      suppressMenu: true,
    },
    {
      headerName: 'Market Capital',
      field: 'marketCap',
      suppressMenu: true,
    },
    {
      headerName: 'Change (%)',
      field: 'change',
      suppressMenu: true,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      suppressMenu: true,
    },
  ];

  rowData = [
    {
      ticker: 'AAPL',
      securityName: 'Apple inc',
      marketCap: 35000,
      change: '0.75',
      actions: 'Buy',
      cusipId: 'AAPL1234',
    },
    {
      ticker: 'CGI',
      securityName: 'Cg Power',
      marketCap: 5000,
      change: '25',
      actions: 'Buy',
      cusipId: 'CGI1234',
    },
    {
      ticker: 'MSFT',
      securityName: 'Micro soft Inc',
      marketCap: 10000000,
      change: '5.90',
      actions: 'Buy',
      cusipId: 'MSFT1234',
    },
    {
      ticker: 'GOOG',
      securityName: 'Google inc',
      marketCap: 3500000,
      change: '-8.99',
      actions: 'Buy',
      cusipId: 'GOOG1234',
    },
    {
      ticker: 'AMZN',
      securityName: 'Amazon inc',
      marketCap: 2555000,
      change: '-0.75',
      actions: 'Sell',
      cusipId: 'AMZN1234',
    },
    {
      ticker: 'HINDOIL',
      securityName: 'Hindustan Oil inc',
      marketCap: 1567000,
      change: '-7.55',
      actions: 'Sell',
      cusipId: 'HINDOIL1234',
    },
    {
      ticker: 'DRST',
      securityName: 'Doctor Stone inc',
      marketCap: 35000,
      change: '-5',
      actions: 'Sell',
      cusipId: 'DRST1234',
    },
    {
      ticker: 'HP',
      securityName: 'Hindustan petrolium inc',
      marketCap: 7895000,
      change: '-7.5',
      actions: 'sell',
      cusipId: 'HP1234',
    },
    {
      ticker: 'TATA',
      securityName: 'Tata solutions',
      marketCap: 28995000,
      change: '-0.865',
      actions: 'Buy',
      cusipId: 'TATA1234',
    },
    {
      ticker: 'RSN',
      securityName: 'Reliance inc',
      marketCap: 678900,
      change: '-4.5',
      actions: 'Sell',
      cusipId: 'RSN1234',
    },
  ];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<any[]>;
  constructor(private http: HttpClient) {}

  // Example load data from server
  onGridReady(params: any) {
    this.rowData$ = this.http.get<any[]>(
      'https://www.ag-grid.com/example-assets/row-data.json'
    );
  }

  // Example of consuming Grid Event
  onCellClicked(e: any): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  ngOnInit(): void {}
}
