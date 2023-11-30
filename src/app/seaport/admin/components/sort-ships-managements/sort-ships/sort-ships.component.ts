import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Ships } from '../../../models/ships';
import { Berths } from '../../../models/berths';
import { SortShips } from '../../../models/sort-ships';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sort-ships',
  templateUrl: './sort-ships.component.html',
  styleUrls: ['./sort-ships.component.scss'],
})
export class SortShipsComponent implements OnInit {
  public sortsForm: FormGroup = <FormGroup>{};
  public ships: Ships[] = [];
  public berths: Berths[] = [];
  public sort: SortShips[] = [];
  public isExits = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.sortsForm = this.fb.group({
      shipId: ['', [Validators.required]],
      berthId: ['', [Validators.required]],
      locationBerth: ['', [Validators.required]],
    });
    this.getShips();
    this.getBerths();
    this.getSort();
  }

  private getSort() {
    this.http.getSort().subscribe((data: SortShips[]) => {
      this.sort = data;
    });
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

  public postSort(event: any, form: any) {
    if (form.valid) {
      const locationBerth = this.sortsForm.get('locationBerth')?.value;
      const foundLocation = this.sort.find(
        (res) => res.locationBerth == locationBerth
      );

      if (foundLocation) {
        console.log('Co roi');
        this.isExits = true;
      } else {
        const newSort = {
          shipId: this.sortsForm.get('shipId')?.value,
          berthId: this.sortsForm.get('berthId')?.value,
          locationBerth: this.sortsForm.get('locationBerth')?.value,
        };
        const requestBody = JSON.stringify(newSort);
        if (requestBody) {
          this.http.postSortShip(requestBody).subscribe((res) => {
            this.router.navigate(['/dsvt']);
          });
        }
      }
    } else {
      this.logEvent(event);
    }
  }
}
