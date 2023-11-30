import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ShipsComponent } from './components/ships-managements/ships/ships.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BerthsComponent } from './components/berths-managements/berths/berths.component';
import { ArrivalsComponent } from './components/arrivals-managements/arrivals/arrivals.component';
import { CargosComponent } from './components/cargos-managements/cargos/cargos.component';
import { ShipsListComponent } from './components/ships-managements/ships-list/ships-list.component';
import { ArrivalsListComponent } from './components/arrivals-managements/arrivals-list/arrivals-list.component';
import { StatisticalComponent } from './components/arrivals-managements/statistical/statistical.component';
import { MailComponent } from './mail/mail.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SortShipsComponent } from './components/sort-ships-managements/sort-ships/sort-ships.component';
import { DeparturesComponent } from './components/departures-managements/departures/departures.component';
import { StatisticalDeparturesComponent } from './components/departures-managements/statistical-departures/statistical-departures.component';
import { DeparturesListComponent } from './components/departures-managements/departures-list/departures-list.component';
import { BerthsListComponent } from './components/berths-managements/berths-list/berths-list.component';
import { CargosListComponent } from './components/cargos-managements/cargos-list/cargos-list.component';
import { CargoDetailsComponent } from './components/cargo-details-managements/cargo-details/cargo-details.component';
import { CargoDetailsListComponent } from './components/cargo-details-managements/cargo-details-list/cargo-details-list.component';
import { HomePagesAdminComponent } from './components/home-pages-admin/home-pages-admin.component';
import { SortShipListComponent } from './components/sort-ships-managements/sort-ship-list/sort-ship-list.component';

@NgModule({
  declarations: [
    ShipsComponent,
    LayoutComponent,
    BerthsComponent,
    ArrivalsComponent,
    CargosComponent,
    ShipsListComponent,
    ArrivalsListComponent,
    StatisticalComponent,
    MailComponent,
    SortShipsComponent,
    DeparturesComponent,
    StatisticalDeparturesComponent,
    DeparturesListComponent,
    BerthsListComponent,
    CargosListComponent,
    CargoDetailsComponent,
    CargoDetailsListComponent,
    HomePagesAdminComponent,
    SortShipListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatAutocompleteModule,
  ],
  exports: [LayoutComponent],
})
export class AdminModule {}
