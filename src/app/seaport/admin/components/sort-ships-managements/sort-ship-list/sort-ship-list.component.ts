import { Component, OnInit } from '@angular/core';
import { Ships } from '../../../models/ships';
import { Berths } from '../../../models/berths';
import { HttpService } from '../../../services/http.service';
import { SortShips } from '../../../models/sort-ships';

@Component({
  selector: 'app-sort-ship-list',
  templateUrl: './sort-ship-list.component.html',
  styleUrls: ['./sort-ship-list.component.scss'],
})
export class SortShipListComponent implements OnInit {
  public sort: SortShips[] = [];
  public ships: Ships[] = [];
  public berths: Berths[] = [];
  constructor(private http: HttpService) {}
  ngOnInit(): void {
    this.getSort();
    this.getShips();
    this.getBerths();
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

  private getSort() {
    this.http.getSort().subscribe((data: SortShips[]) => {
      this.sort = data;
    });
  }
}
