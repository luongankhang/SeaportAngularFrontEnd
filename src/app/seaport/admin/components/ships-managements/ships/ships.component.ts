import { Ships } from '../../../models/ships';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'environment/environment';
import { Users } from 'src/app/seaport/auth/models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
  public REST_API_SERVER = environment.GET_API_SERVER;
  public shipsForm: FormGroup = <FormGroup>{};
  public ships: Ships[] = [];
  selectedFile: File | null = null;
  public loggedInUser: Users | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

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
    this.checkLoggedInUser();
  }

  public checkLoggedInUser() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      this.loggedInUser = JSON.parse(currentUser);
      console.log('Logged in user:', this.loggedInUser);
    } else {
      console.log('No logged in user');
    }
  }

  private logEvent(event: any) {
    console.log(event);
  }

  public checkSessionExists(): boolean {
    return sessionStorage.getItem('currentUser') !== null;
  }

  public postShip(event: any, form: any) {
    if (form.valid) {
      if (this.checkSessionExists()) {
        if (this.checkShipName()) {
          form.setErrors({ shipNameExists: true });
          return;
        } else if (this.checkShipPlate()) {
          form.setErrors({ shipPlateExists: true });
          return;
        } else {
          const newShip = {
            shipName: this.shipsForm.get('shipName')?.value,
            shipNameAuth: this.shipsForm.get('shipNameAuth')?.value,
            shipNationality: this.shipsForm.get('shipNationality')?.value,
            shipPlate: this.shipsForm.get('shipPlate')?.value,
            shipSize: this.shipsForm.get('shipSize')?.value,
            shipWeight: this.shipsForm.get('shipWeight')?.value,
            shipWattage: this.shipsForm.get('shipWattage')?.value,
            shipCheckIn: this.shipsForm.get('shipCheckIn')?.value,
            shipAuthInfo: this.shipsForm.get('shipAuthInfo')?.value,
            shipImage: this.selectedFile ? this.selectedFile.name : null,
          };
          const requestBody = JSON.stringify(newShip);
          console.log(requestBody);

          if (requestBody) {
            this.http.postShips(requestBody).subscribe(
              (res) => {
                console.log(requestBody);
                this.router.navigate(['/danhsachtau']);
              },
              (err) => {
                console.error(err);
              }
            );
          } else {
            console.log('Not found');
          }
        }
      } else {
        console.log('Chua ton tai');
      }
    } else {
      this.logEvent(event);
    }
  }

  private getModifiedFileName() {
    const selectedFileName = this.selectedFile ? this.selectedFile.name : null;
    if (selectedFileName) {
      const fileExtension = selectedFileName.split('.').pop();
      const randomString = this.generateRandomString();
      const modifiedFileName = randomString + '.' + fileExtension;
      return modifiedFileName;
    }
    return null;
  }

  private generateRandomString() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }

  private getShips() {
    this.http.getShips().subscribe((data: Ships[]) => {
      this.ships = data;
    });
  }

  private checkShipName() {
    const shipName = this.shipsForm.get('shipName')?.value;
    return this.ships.some((ship) => ship.shipName === shipName);
  }

  private checkShipPlate() {
    const shipPlate = this.shipsForm.get('shipPlate')?.value;
    return this.ships.some((ship) => ship.shipPlate === shipPlate);
  }

  public onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFile = files.item(0);
    if (this.selectedFile) {
      this.uploadImage(this.selectedFile);
    }
  }

  private uploadImage(file: File): void {
    this.http.uploadFile(file).subscribe(
      (response) => {
        console.log('Image upload successful:', response);
      },
      (error) => {
        console.error('Image upload failed:', error);
      }
    );
  }
}
