import { SortShipListComponent } from './components/sort-ships-managements/sort-ship-list/sort-ship-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipsListComponent } from './components/ships-managements/ships-list/ships-list.component';
import { ShipsComponent } from './components/ships-managements/ships/ships.component';
import { BerthsComponent } from './components/berths-managements/berths/berths.component';
import { BerthsListComponent } from './components/berths-managements/berths-list/berths-list.component';
import { StatisticalComponent } from './components/arrivals-managements/statistical/statistical.component';
import { StatisticalDeparturesComponent } from './components/departures-managements/statistical-departures/statistical-departures.component';
import { ArrivalsComponent } from './components/arrivals-managements/arrivals/arrivals.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SortShipsComponent } from './components/sort-ships-managements/sort-ships/sort-ships.component';
import { ArrivalsListComponent } from './components/arrivals-managements/arrivals-list/arrivals-list.component';
import { DeparturesListComponent } from './components/departures-managements/departures-list/departures-list.component';
import { DeparturesComponent } from './components/departures-managements/departures/departures.component';
import { CargosComponent } from './components/cargos-managements/cargos/cargos.component';
import { CargosListComponent } from './components/cargos-managements/cargos-list/cargos-list.component';
import { CargoDetailsComponent } from './components/cargo-details-managements/cargo-details/cargo-details.component';
import { CargoDetailsListComponent } from './components/cargo-details-managements/cargo-details-list/cargo-details-list.component';

const routes: Routes = [
  { path: 'danhsachtau', component: ShipsListComponent },
  { path: 'dangkytau', component: ShipsComponent },
  { path: 'danhsachben', component: BerthsListComponent },
  { path: 'dangkyben', component: BerthsComponent },
  { path: 'dangkytauvaoben', component: SortShipsComponent },
  { path: 'lichtrinhden', component: ArrivalsListComponent },
  { path: 'dangkyltd', component: ArrivalsComponent },
  { path: 'lichtrinhroi', component: DeparturesListComponent },
  { path: 'dangkyltroi', component: DeparturesComponent },
  { path: 'dangkyltden', component: ArrivalsComponent },
  { path: 'danhsachhh', component: CargosListComponent },
  { path: 'dangkyttht', component: CargosComponent },
  { path: 'themcthh', component: CargoDetailsComponent },
  { path: 'danhsachcthh', component: CargoDetailsListComponent },
  { path: 'thongkeltden', component: StatisticalComponent },
  { path: 'thongkeltroi', component: StatisticalDeparturesComponent },
  { path: 'dangkyvitri', component: SortShipsComponent },
  { path: 'dsvt', component: SortShipListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
