import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cargos } from '../../../models/cargos';
import { Ships } from '../../../models/ships';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-cargos-list',
  templateUrl: './cargos-list.component.html',
  styleUrls: ['./cargos-list.component.scss'],
})
export class CargosListComponent implements OnInit {
  public cargosForm: FormGroup = <FormGroup>{};
  public cargos: Cargos[] = [];
  public ships: Ships[] = [];
  constructor(private fb: FormBuilder, private http: HttpService) {}
  ngOnInit(): void {
    this.cargosForm = this.fb.group({});
    this.getCargos();
    this.getShips();
  }

  private getCargos() {
    this.http.getCargos().subscribe((data: Cargos[]) => {
      this.cargos = data;
    });
  }

  private getShips() {
    this.http.getShips().subscribe((data: Ships[]) => {
      this.ships = data;
      console.log(this.ships);
    });
  }
}
