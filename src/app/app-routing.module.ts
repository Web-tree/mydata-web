import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplyTokenComponent} from './apply-token/apply-token.component';
import {ListComponent} from './data/list/list.component';
import {AddComponent} from './data/add/add.component';

const routes: Routes = [
  {path: 'applyToken', component: ApplyTokenComponent},
  {path: 'data', component: ListComponent},
  {path: 'data/add', component: AddComponent},
  {path: '', redirectTo: '/data', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
