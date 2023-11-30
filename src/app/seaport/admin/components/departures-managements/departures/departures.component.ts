import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Ships } from '../../../models/ships';
import { Berths } from '../../../models/berths';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.scss'],
})
export class DeparturesComponent implements OnInit {
  public departuresForm: FormGroup = <FormGroup>{};
  public ships: Ships[] = [];
  public berths: Berths[] = [];
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.departuresForm = this.fb.group({
      shipId: [],
      berthId: [],
      departureDate: ['0'],
      departureTime: ['0'],
    });
    this.getShips();
    this.getBerths();
  }

  private logEvent(event: any) {
    console.log(event);
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

  public postDeparture(event: any, form: any) {
    if (form.valid) {
      const newDeparture = {
        shipId: this.departuresForm.get('shipId')?.value,
        berthId: this.departuresForm.get('berthId')?.value,
        departureDate: this.departuresForm.get('departureDate')?.value,
        departureTime: this.departuresForm.get('departureTime')?.value,
      };
      const requestBody = JSON.stringify(newDeparture);
      if (requestBody) {
        this.http.postDeparture(requestBody).subscribe((res) => {
          console.log(requestBody);
          this.router.navigate(['/lichtrinhroi']);
        });
      }
    } else {
      this.logEvent(event);
    }
  }
}
