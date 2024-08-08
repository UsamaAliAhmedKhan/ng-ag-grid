import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community'; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-enterprise';
import { DataRendererComponent } from './data-renderer/data-renderer.component';

interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridAngular, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'ng-ag-grid';
  gridOptions: GridOptions = {
    
    pagination: true,
    rowSelection: 'multiple',
    rowGroupPanelShow: 'always',
    onGridReady: this.onGridReady.bind(this),
    defaultColDef: {
      filter: true,
      editable: true,
      sortable: true,
      enableRowGroup: true,
      width: 230,
    },
    columnDefs: [
      { field: 'mission', checkboxSelection: true },
      { field: 'company' },
      { field: 'location' },
      { field: 'date', cellRenderer: DataRendererComponent, },
      { field: 'price' },
      { field: 'successful' },
      { field: 'rocket' },
    ]
  };

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
    .get<IRow[]>('https://www.ag-grid.com/example-assets/space-mission-data.json')
    .subscribe((data) => {
      params.api.applyTransaction({ add: data });
      params.api.hideOverlay();
    });
  }
}
