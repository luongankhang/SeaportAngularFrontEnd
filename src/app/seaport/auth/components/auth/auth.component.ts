import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Users } from '../../models/users';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public loginForm: FormGroup = <FormGroup>{};
  public registerForm: FormGroup = <FormGroup>{};
  public users: Users[] = [];
  public loggedInUser: Users | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    });
    this.getUsers();
    this.checkLoggedInUser();
  }

  private getUsers() {
    this.http.getUsers().subscribe((data: Users[]) => {
      this.users = data;
    });
  }

  reloadPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }

  public register(event: any, form: any) {
    if (form.valid) {
      const username = this.registerForm.get('username')?.value;
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('password_confirm')?.value;

      if (password === confirmPassword) {
        const user = this.users.find((u) => u.username === username);
        if (user) {
          console.log('Trung');
        } else {
          // Mã hóa mật khẩu
          const hashedPassword = bcrypt.hashSync(password, 10);

          const register = {
            username: username,
            password: hashedPassword,
            phone: this.registerForm.get('phone')?.value,
            role: 0,
          };

          const requestBody = JSON.stringify(register);

          if (requestBody) {
            this.http.postUser(requestBody).subscribe((res) => {});
            this.registerForm.reset();
            this.getUsers();
            this.reloadPage();
          }
        }
      } else {
        console.log('Password');
      }
    }
  }

  public login(event: any, form: any) {
    if (form.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      const user = this.users.find((u) => u.username === username);

      if (user) {
        // Giải mã mật khẩu và kiểm tra sự khớp
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (passwordMatch) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedInUser = user;
          if (user.role === 0) {
            this.router.navigate(['/profile']);
          } else if (user.role === 1) {
            this.router.navigate(['/home']);
          } else {
            console.log('Invalid role');
          }
        } else {
          // Tên người dùng hoặc mật khẩu không hợp lệ
          console.log('Loi');
        }
      } else {
        // Tên người dùng không tồn tại
        console.log('Loi');
      }
    }
  }

  public logout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/auth']);
    // this.loggedInUser = null;
    // console.log('Logged out');
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
}
