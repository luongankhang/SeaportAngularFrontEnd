import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from '../admin/admin.module';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordComponent } from './components/password/password.component';

@NgModule({
  declarations: [AuthComponent, ProfileComponent, PasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule
  ],
  exports: [AuthComponent]
})
export class AuthModule {}
