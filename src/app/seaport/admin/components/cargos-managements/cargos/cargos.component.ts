import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ships } from '../../../models/ships';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss'],
})
export class CargosComponent implements OnInit {
  public cargosForm: FormGroup = <FormGroup>{};
  public ships: Ships[] = [];
  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) {}
  ngOnInit(): void {
    this.cargosForm = this.fb.group({
      shipId: [0],
      cargoDesc: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
    });
    this.getShips();
  }

  private logEvent(event: any) {
    console.log(event);
  }

  private getShips() {
    this.http.getShips().subscribe((data: Ships[]) => {
      this.ships = data;
    });
  }

  public postCargo(event: any, form: any) {
    if (form.valid) {
      const newCargo = {
        shipId: this.cargosForm.get('shipId')?.value,
        cargoDesc: this.cargosForm.get('cargoDesc')?.value,
      };
      const requestBody = JSON.stringify(newCargo);
      if (requestBody) {
        this.http.postCargo(requestBody).subscribe((res) => {
          console.log(requestBody);
          this.router.navigate(['/danhsachhh']);
        });
      }
    } else {
      console.log(event);
    }
  }
}
