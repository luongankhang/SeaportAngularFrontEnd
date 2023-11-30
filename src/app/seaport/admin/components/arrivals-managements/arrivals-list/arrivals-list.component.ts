import { Arrivals } from './../../../models/arrivals';
import { Component, OnInit } from '@angular/core';
import { Ships } from '../../../models/ships';
import { Berths } from '../../../models/berths';
import { HttpService } from '../../../services/http.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-arrivals-list',
  templateUrl: './arrivals-list.component.html',
  styleUrls: ['./arrivals-list.component.scss'],
})
export class ArrivalsListComponent implements OnInit {
  public arrivalsForm: FormGroup = <FormGroup>{};
  public arrivals: Arrivals[] = [];
  public ships: Ships[] = [];
  public berths: Berths[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 1;
  public totalItems: number = 0;
  public searchText: string = '';
  public selectedId: number | undefined;

  constructor(private fb: FormBuilder, private http: HttpService) {}
  ngOnInit(): void {
    this.arrivalsForm = this.fb.group({
      shipId: [],
      berthId: [],
      arrivalDate: ['0'],
      arrivalTime: ['0'],
    });
    this.getArrivals();
    this.getShips();
    this.getBerths();
  }

  private getArrivals() {
    this.http.getArrivals().subscribe((data: Arrivals[]) => {
      this.arrivals = data;
      this.totalItems = this.arrivals.length;
    });
  }

  private getShips() {
    this.http.getShips().subscribe((data: Ships[]) => {
      this.ships = data;
      console.log(this.ships);
    });
  }

  private getBerths() {
    this.http.getBerths().subscribe((data: Berths[]) => {
      this.berths = data;
      console.log(this.berths);
    });
  }

  public onPageChange(page: number) {
    this.currentPage = page;
  }

  public getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  public getId(arrival: Arrivals) {
    this.selectedId = arrival.id;
    if (this.selectedId) {
      this.http.deleteArrival(this.selectedId).subscribe((res) => {
        console.log('Ship deleted successfully:', res);
        this.getArrivals();
      });
    }
  }

  public edit(arrival: Arrivals) {
    this.selectedId = arrival.id;
    this.fillEditForm();
  }

  public fillEditForm() {
    if (this.selectedId) {
      const selected = this.arrivals.find((res) => res.id === this.selectedId);
      if (selected) {
        this.arrivalsForm.patchValue({
          shipId: selected.shipId,
          berthId: selected.berthId,
          arrivalDate: selected.arrivalDate,
          arrivalTime: selected.arrivalTime,
        });
      }
    }
  }

  public update(event: any) {
    if (this.selectedId && this.arrivalsForm.valid) {
      const updated = {
        shipId: this.arrivalsForm.get('shipId')?.value,
        berthId: this.arrivalsForm.get('berthId')?.value,
        arrivalDate: this.arrivalsForm.get('arrivalDate')?.value,
        arrivalTime: this.arrivalsForm.get('arrivalTime')?.value,
      };

      const requestBody = JSON.stringify(updated);

      this.http.putArrival(this.selectedId, requestBody).subscribe((res) => {
        console.log('Ship updated successfully:', res);
        this.getArrivals();
      });
    }
  }
}
