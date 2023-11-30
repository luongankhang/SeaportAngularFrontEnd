import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Ships } from '../../../models/ships';
import { Berths } from '../../../models/berths';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arrivals',
  templateUrl: './arrivals.component.html',
  styleUrls: ['./arrivals.component.scss'],
})
export class ArrivalsComponent implements OnInit {
  public arrivalsForm: FormGroup = <FormGroup>{};
  public ships: Ships[] = [];
  public berths: Berths[] = [];
  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) {}
  ngOnInit(): void {
    this.arrivalsForm = this.fb.group({
      shipId: [],
      berthId: [],
      arrivalDate:['0'],
      arrivalTime:['0']
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

  public postArrival(event: any, form: any) {
    if (form.valid) {
      const newArrival = {
        shipId: this.arrivalsForm.get('shipId')?.value,
        berthId: this.arrivalsForm.get('berthId')?.value,
        arrivalDate: this.arrivalsForm.get('arrivalDate')?.value,
        arrivalTime: this.arrivalsForm.get('arrivalTime')?.value,
      };
      const requestBody = JSON.stringify(newArrival);
      console.log(requestBody);
      if(requestBody){
        this.http.postArrivals(requestBody).subscribe(res=>{
          console.log(requestBody);
          this.router.navigate(['/lichtrinhden']);
        })
      }
    } else {
      this.logEvent(event);
    }
  }
}
