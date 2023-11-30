import { Component, OnInit } from '@angular/core';
import { Departures } from '../../../models/departures';
import { HttpService } from '../../../services/http.service';
import { Ships } from '../../../models/ships';
import { Berths } from '../../../models/berths';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-departures-list',
  templateUrl: './departures-list.component.html',
  styleUrls: ['./departures-list.component.scss'],
})
export class DeparturesListComponent implements OnInit {
  public departuresForm: FormGroup = <FormGroup>{};
  public departures: Departures[] = [];
  public ships: Ships[] = [];
  public berths: Berths[] = [];
  public selectedId: number | undefined;

  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.getDepartures();
    this.getShips();
    this.getBerths();
  }

  private getDepartures() {
    this.http.getDepartures().subscribe((data: Departures[]) => {
      this.departures = data;
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

  public getId(arrival: Ships) {
    this.selectedId = arrival.id;
  }

  public editDeparture(departure: Departures) {
    this.selectedId = departure.id; // Lưu ID của tàu hiện tại
    this.fillEditForm(); // Đổ dữ liệu từ đối tượng lên form sửa
    // this.isEditFormVisible = true; // Hiển thị form sửa
  }

  public fillEditForm() {
    if (this.selectedId) {
      const selected = this.departures.find(
        (departure) => departure.id === this.selectedId
      ); // Tìm tàu với ID tương ứng
      if (selected) {
        this.departuresForm.patchValue({
          shipId: selected.shipId,
          berthId: selected.berthId,
          departureDate: selected.departureDate,
          departureTime: selected.departureTime,
        });
      }
    }
  }

  public updateDeparture(event: any) {
    if (this.selectedId && this.departuresForm.valid) {
      const updateDeparture = {
        shipId: this.departuresForm.get('shipId')?.value,
        berthId: this.departuresForm.get('berthId')?.value,
        departureDate: this.departuresForm.get('departureDate')?.value,
        departureTime: this.departuresForm.get('departureTime')?.value,
      };

      const requestBody = JSON.stringify(updateDeparture);

      if (requestBody) {
        this.http
          .putDeparture(this.selectedId, requestBody)
          .subscribe((res) => {
            console.log('Ship updated successfully:', res);
          });
      }
    }
  }
}
