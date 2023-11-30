import { Component, OnInit } from '@angular/core';
import { Ships } from '../../../models/ships';
import { HttpService } from '../../../services/http.service';
import { environment } from 'environment/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ships-list',
  templateUrl: './ships-list.component.html',
  styleUrls: ['./ships-list.component.scss'],
})
export class ShipsListComponent implements OnInit {
  public shipsForm: FormGroup = <FormGroup>{};
  public ships: Ships[] = [];
  public REST_API_SERVER = environment.GET_API_SERVER;
  public selectedShipId: number | undefined;
  public isEditFormVisible: boolean = false;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalItems: number = 0;
  public searchText: string = '';

  constructor(private fb: FormBuilder, private http: HttpService) {}

  ngOnInit(): void {
    this.shipsForm = this.fb.group({
      shipName: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      shipNameAuth: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      shipNationality: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      shipPlate: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      shipSize: ['', [Validators.required]],
      shipWeight: ['', [Validators.required]],
      shipWattage: ['', [Validators.required]],
      shipCheckIn: ['', [Validators.required]],
      shipAuthInfo: ['', [Validators.required]],
      shipImage: [''],
    });
    this.getShips();
  }

  private getShips() {
    this.http.getShips().subscribe((data: Ships[]) => {
      this.ships = data;
      this.totalItems = this.ships.length;
    });
  }

  public getId(ship: Ships) {
    this.selectedShipId = ship.id;
    if (this.selectedShipId) {
      this.http.deleteShip(this.selectedShipId).subscribe((res) => {
        console.log('Ship deleted successfully:', res);
        this.getShips();
      });
    }
  }

  public editShip(ship: Ships) {
    this.selectedShipId = ship.id;
    this.fillEditForm();
    this.isEditFormVisible = true;
  }

  public fillEditForm() {
    if (this.selectedShipId) {
      const selectedShip = this.ships.find(
        (ship) => ship.id === this.selectedShipId
      );
      if (selectedShip) {
        this.shipsForm.patchValue({
          shipName: selectedShip.shipName,
          shipNameAuth: selectedShip.shipNameAuth,
          shipNationality: selectedShip.shipNationality,
          shipPlate: selectedShip.shipPlate,
          shipSize: selectedShip.shipSize,
          shipWeight: selectedShip.shipWeight,
          shipWattage: selectedShip.shipWattage,
          shipCheckIn: selectedShip.shipCheckIn,
          shipAuthInfo: selectedShip.shipAuthInfo,
        });
      }
    }
  }

  public updateShip(event: any) {
    if (this.selectedShipId && this.shipsForm.valid) {
      const updatedShip = {
        shipName: this.shipsForm.get('shipName')?.value,
        shipNameAuth: this.shipsForm.get('shipNameAuth')?.value,
        shipNationality: this.shipsForm.get('shipNationality')?.value,
        shipPlate: this.shipsForm.get('shipPlate')?.value,
        shipSize: this.shipsForm.get('shipSize')?.value,
        shipWeight: this.shipsForm.get('shipWeight')?.value,
        shipWattage: this.shipsForm.get('shipWattage')?.value,
        shipCheckIn: this.shipsForm.get('shipCheckIn')?.value,
        shipAuthInfo: this.shipsForm.get('shipAuthInfo')?.value,
      };

      const requestBody = JSON.stringify(updatedShip);

      this.http.putShip(this.selectedShipId, requestBody).subscribe((res) => {
        console.log('Ship updated successfully:', res);
        this.getShips();
        this.isEditFormVisible = false;
      });
    }
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

  public searchShips() {
    if (this.searchText.trim() === '') {
      this.getShips();
      return;
    }
    const searchResults: Ships[] = [];
    const searchTerm = this.searchText.toLowerCase();
    for (const ship of this.ships) {
      if (ship.shipName.toLowerCase().includes(searchTerm)) {
        searchResults.push(ship);
      }
    }
    this.totalItems = searchResults.length;
    this.currentPage = 1;
    this.ships = searchResults;
  }
}
