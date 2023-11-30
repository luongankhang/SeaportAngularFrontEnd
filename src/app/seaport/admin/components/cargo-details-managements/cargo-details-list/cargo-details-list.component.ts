import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cargos } from '../../../models/cargos';
import { HttpService } from '../../../services/http.service';
import { CargoDetails } from '../../../models/cargo-details';

@Component({
  selector: 'app-cargo-details-list',
  templateUrl: './cargo-details-list.component.html',
  styleUrls: ['./cargo-details-list.component.scss'],
})
export class CargoDetailsListComponent implements OnInit {
  public cargoDetailsForm: FormGroup = <FormGroup>{};
  public cargos: CargoDetails[] = [];
  constructor(private fb: FormBuilder, private http: HttpService) {}
  ngOnInit(): void {
    this.getCargos();
  }

  private getCargos() {
    this.http.getCargoDetails().subscribe((data: CargoDetails[]) => {
      this.cargos = data;
    });
  }
}
