import { HttpService } from './../../../auth/services/http.service';
import { Observable } from 'rxjs';
import { Users } from './../../../auth/models/users';
import { Component, OnInit } from '@angular/core';
import { environment } from 'environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  template: '<router-outlet></router-outlet>',
})
export class LayoutComponent implements OnInit {
  public REST_API_SERVER = environment.GET_API_SERVER;
  public username: string | null = null;
  public users: Users[] = [];
  constructor(private http: HttpService, private router: Router) {}
  ngOnInit(): void {
    this.getUsernameFromSession();
    this.getUsers();
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

  public logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/auth']);
    // this.loggedInUser = null;
    // console.log('Logged out');
  }
}
