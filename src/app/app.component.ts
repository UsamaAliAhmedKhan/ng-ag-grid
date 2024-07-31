import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community'; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import 'ag-grid-enterprise'
import { GridReadyEvent } from 'ag-grid-enterprise';

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
  imports: [RouterOutlet, AgGridAngular, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ng-ag-grid';

  defaultColDef: ColDef = {
    filter: true,
    editable: true,
    sortable: true,
    enableRowGroup: true
  }

  // Row Data: The data to be displayed.
 rowData: IRow[] = [];

 // Column Definitions: Defines the columns to be displayed.
 colDefs: ColDef[] = [
  { field: 'mission',
    checkboxSelection: true
   },
  { field: 'company' },
  { field: 'location' },
  { field: 'date' },
  { field: 'price' },
  { field: 'successful' },
  { field: 'rocket' },
 ];

 constructor(private http: HttpClient) {}
    onGridReady(params: GridReadyEvent) {
        this.http
            .get<any[]>('https://www.ag-grid.com/example-assets/space-mission-data.json')
            .subscribe((data) => (this.rowData = data));
    }
}
