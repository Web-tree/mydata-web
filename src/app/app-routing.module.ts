import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplyTokenComponent} from './apply-token/apply-token.component';
import {ListComponent} from './data/list/list.component';
import {AddComponent} from './data/add/add.component';
import {SingleComponent} from './data/single/single.component';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {UsageAddPageComponent} from './data/usage/usage-add-page/usage-add-page.component';

const routes: Routes = [
  {path: 'applyToken', component: ApplyTokenComponent},
  {path: 'data', component: ListComponent},
  {path: 'data/add', component: AddComponent},
  {path: 'data/:name', component: SingleComponent},
  {path: 'data/:data-name/add-usage', component: UsageAddPageComponent},
  {path: '', redirectTo: '/data', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
