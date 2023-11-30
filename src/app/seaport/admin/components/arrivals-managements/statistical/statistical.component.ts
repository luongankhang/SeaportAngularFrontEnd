import { Component, OnInit } from '@angular/core';
import { Arrivals } from '../../../models/arrivals';
import { HttpService } from '../../../services/http.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss'],
})
export class StatisticalComponent implements OnInit {
  public arrivals: Arrivals[] = [];
  public chartData: ChartDataset[] = [];
  public chartLabels: string[] = [];
  public chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  public chartLegend = true;
  public chartType = 'bar';

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.getArrivals();
  }

  private getArrivals() {
    this.http.getArrivals().subscribe((data: Arrivals[]) => {
      this.arrivals = data;
      this.calculateDailyArrivals();
    });
  }

  calculateDailyArrivals(): void {
    const monthlyArrivals: any = {};

    for (const arrival of this.arrivals) {
      const arrivalDate = new Date(arrival.arrivalDate).toLocaleDateString();
      if (monthlyArrivals[arrivalDate]) {
        monthlyArrivals[arrivalDate]++;
      } else {
        monthlyArrivals[arrivalDate] = 1;
      }
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const numberOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    this.chartLabels = [];
    for (let day = 1; day <= numberOfDaysInMonth; day++) {
      const formattedDay = new Date(currentYear, currentMonth, day).toLocaleDateString();
      this.chartLabels.push(formattedDay);
    }

    const data: number[] = [];

    for (const label of this.chartLabels) {
      data.push(monthlyArrivals[label] || 0);
    }

    this.chartData = [
      {
        data: data,
        label: 'Số lượng tàu vào mỗi ngày trong tháng',
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        hoverBackgroundColor: 'rgba(0, 123, 255, 0.8)',
        hoverBorderColor: 'rgba(0, 123, 255, 1)',
      },
    ];
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.aoa_to_sheet([this.chartLabels, this.chartData[0].data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'statistical_data');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }

}
