import { Ships } from '../../../models/ships';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-berths',
  templateUrl: './berths.component.html',
  styleUrls: ['./berths.component.scss'],
})
export class BerthsComponent implements OnInit {
  public berthsForm: FormGroup = <FormGroup>{};
  public ships: Ships[] = [];

  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) {}
  ngOnInit(): void {
    this.berthsForm = this.fb.group({
      berthName: [
        '',
        [
          Validators.minLength(1),
          Validators.maxLength(255),
          Validators.required,
        ],
      ],
      berthCapacity: [0, Validators.required],
      berthStatus: ['', [Validators.required]],
    });

    this.getShips();
  }

  public getShips() {
    this.http.getShips().subscribe((data: Ships[]) => {
      this.ships = data;
      console.log(this.ships);
    });
  }

  public postBerth(event: any, form: any) {
    if (form.valid) {
      const newBerth = {
        shipId: this.berthsForm.get('shipId')?.value,
        berthName: this.berthsForm.get('berthName')?.value,
        berthCapacity: this.berthsForm.get('berthCapacity')?.value,
        berthStatus: this.berthsForm.get('berthStatus')?.value,
      };
      const requestBody = JSON.stringify(newBerth);
      console.log(requestBody);
      if (requestBody) {
        this.http.postBerth(requestBody).subscribe(
          (res) => {
            console.log(requestBody);
            this.router.navigate(['/danhsachben']);
          },
          (err) => {
            console.error(err);
          }
        );
      }
    }
  }
}
