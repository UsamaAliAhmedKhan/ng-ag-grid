import { NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-data-renderer',
  standalone: true,
  imports: [NgFor],
  templateUrl: './data-renderer.component.html',
  styleUrl: './data-renderer.component.css'
})
export class DataRendererComponent {

  private params!: ICellRendererParams;
  dateFormats: string[] = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
  formattedDate: string = '';

  agInit(params: ICellRendererParams): void {
    this.params = params;
    if (this.params.value) {
      this.formatDate(this.params.value);
    }
  }

  ngOnInit(): void {
  }

  formatDate(date: string) {
    if (!date) {
      this.formattedDate = '';
      return;
    }
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      this.formattedDate = ''; // Handle invalid date
      return;
    }
    this.formattedDate = new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }).format(dateObj);
  }

  onDateFormatChange(event: Event) {
    const target = event.target as HTMLSelectElement | null; // Ensure the target is HTMLSelectElement
    if (target) {
      const value = target.value;
      if (this.params && this.params.value) {
        const dateObj = new Date(this.params.value);
        if (!isNaN(dateObj.getTime())) {
          switch (value) {
            case 'MM/DD/YYYY':
              this.formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
              break;
            case 'DD/MM/YYYY':
              this.formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
              break;
            case 'YYYY-MM-DD':
              this.formattedDate = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
              break;
          }
        }
      }
    }
  }
  

}
