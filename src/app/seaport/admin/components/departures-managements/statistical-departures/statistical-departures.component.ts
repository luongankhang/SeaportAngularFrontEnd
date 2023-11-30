import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';
import { Departures } from '../../../models/departures';

@Component({
  selector: 'app-statistical-departures',
  templateUrl: './statistical-departures.component.html',
  styleUrls: ['./statistical-departures.component.scss'],
})
export class StatisticalDeparturesComponent {
  public departures: Departures[] = [];
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
    this.getDepartures();
  }

  private getDepartures() {
    this.http.getDepartures().subscribe((data: Departures[]) => {
      this.departures = data;
      this.calculateDailyDepartures();
    });
  }

  calculateDailyDepartures(): void {
    const monthlyDepartures: any = {};

    for (const depature of this.departures) {
      const depatureDate = new Date(depature.departureDate).toLocaleDateString();
      if (monthlyDepartures[depatureDate]) {
        monthlyDepartures[depatureDate]++;
      } else {
        monthlyDepartures[depatureDate] = 1;
      }
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const numberOfDaysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    this.chartLabels = [];
    for (let day = 1; day <= numberOfDaysInMonth; day++) {
      const formattedDay = new Date(
        currentYear,
        currentMonth,
        day
      ).toLocaleDateString();
      this.chartLabels.push(formattedDay);
    }

    const data: number[] = [];

    for (const label of this.chartLabels) {
      data.push(monthlyDepartures[label] || 0);
    }

    this.chartData = [
      {
        data: data,
        label: 'Số lượng tàu ra mỗi ngày trong tháng',
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        hoverBackgroundColor: 'rgba(0, 123, 255, 0.8)',
        hoverBorderColor: 'rgba(0, 123, 255, 1)',
      },
    ];
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.aoa_to_sheet([
      this.chartLabels,
      this.chartData[0].data,
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
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
