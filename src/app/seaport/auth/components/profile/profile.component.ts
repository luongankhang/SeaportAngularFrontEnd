import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Users } from '../../models/users';
import { environment } from 'environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup = new FormGroup({}); // Use "new FormGroup({})" instead of "<FormGroup>{}"
  public users: Users[] = [];
  public username: string | null = null;
  public id: any;
  public REST_API_SERVER = environment.GET_API_SERVER;
  showAccountTab: boolean = false;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [0],
      address: [''],
    });
    this.getUsers();
    this.getUsernameFromSession();
  }

  public showForm() {
    this.showAccountTab = !this.showAccountTab; // Use assignment operator "=" instead of "!="
  }

  public getUsers() {
    this.http.getUsers().subscribe((data: Users[]) => {
      this.users = data;
    });
  }

  public getUsernameFromSession() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      const loggedInUser = JSON.parse(currentUser);
      this.username = loggedInUser.username;
      console.log('Username:', this.username);
    } else {
      console.log('No logged in user');
    }
  }

  public updateUser(event: any, form: any) {
    if (form.valid) {
      const newUser = {
        firstName: this.profileForm.get('firstName')?.value,
        lastName: this.profileForm.get('lastName')?.value,
        email: this.profileForm.get('email')?.value,
        phone: this.profileForm.get('phone')?.value,
        address: this.profileForm.get('address')?.value,
        image: this.selectedFile ? this.selectedFile.name : null,
      };
      const requestBody = JSON.stringify(newUser);
      if (requestBody) {
        const currentUser = sessionStorage.getItem('currentUser');
        if (currentUser) {
          const loggedInUser = JSON.parse(currentUser);
          this.id = loggedInUser.id;
          this.http.putUser(this.id, requestBody).subscribe((res) => {
            this.reloadPage();
          });
        }
      }
    }
  }

  reloadPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
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
