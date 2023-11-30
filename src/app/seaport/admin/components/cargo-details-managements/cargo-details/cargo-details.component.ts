import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cargos } from '../../../models/cargos';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargo-details',
  templateUrl: './cargo-details.component.html',
  styleUrls: ['./cargo-details.component.scss'],
})
export class CargoDetailsComponent implements OnInit {
  public cargoDetailsForm: FormGroup = <FormGroup>{};
  public cargos: Cargos[] = [];
  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) {}
  ngOnInit(): void {
    this.cargoDetailsForm = this.fb.group({
      cargoId: [0, [Validators.required]],
      cargoType: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      cargoQuantity: [0, [Validators.required]],
      cargoStart: ['', [Validators.required]],
      cargoEnd: ['', [Validators.required]],
      cargoStartDate: ['', [Validators.required]],
      cargoStartTime: ['', [Validators.required]],
      cargoEndDate: ['', [Validators.required]],
      cargoEndTime: ['', [Validators.required]],
    });
    this.getCargos();
  }

  private logEvent(event: any) {
    console.log(event);
  }

  private getCargos() {
    this.http.getCargos().subscribe((data: Cargos[]) => {
      this.cargos = data;
      console.log(this.cargos);
    });
  }

  public postCargoDetail(event: any, form: any) {
    if (form.valid) {
      const newCargoDetail = {
        cargoId: this.cargoDetailsForm.get('cargoId')?.value,
        cargoType: this.cargoDetailsForm.get('cargoType')?.value,
        cargoQuantity: this.cargoDetailsForm.get('cargoQuantity')?.value,
        cargoStart: this.cargoDetailsForm.get('cargoStart')?.value,
        cargoEnd: this.cargoDetailsForm.get('cargoEnd')?.value,
        cargoStartDate: this.cargoDetailsForm.get('cargoStartDate')?.value,
        cargoStartTime: this.cargoDetailsForm.get('cargoStartTime')?.value,
        cargoEndDate: this.cargoDetailsForm.get('cargoEndDate')?.value,
        cargoEndTime: this.cargoDetailsForm.get('cargoEndTime')?.value,
      };
      const requestBody = JSON.stringify(newCargoDetail);
      if (requestBody) {
        this.http.postCargoDetail(requestBody).subscribe((res) => {
          console.log(requestBody);
          this.router.navigate(['/danhsachcthh']);
        });
      }
    } else {
      this.logEvent(event);
    }
  }
}
