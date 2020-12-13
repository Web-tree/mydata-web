import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ApplyTokenComponent} from './apply-token/apply-token.component';
import {ListComponent} from './data/list/list.component';
import {AddComponent} from './data/add/add.component';
import {SingleComponent} from './data/single/single.component';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {UsageAddPageComponent} from './data/usage/usage-add-page/usage-add-page.component';
import {AuthGuard} from './_guards/AuthGuard';
import {AboutComponent} from './components/about/about.component';

const routes: Routes = [
  {path: '', redirectTo: '/about', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'applyToken', component: ApplyTokenComponent},
  {path: 'data', component: ListComponent, canActivate: [AuthGuard]},
  {path: 'data/add', component: AddComponent, canActivate: [AuthGuard]},
  {path: 'data/:name', component: SingleComponent, canActivate: [AuthGuard]},
  {path: 'data/:data-name/add-usage', component: UsageAddPageComponent, canActivate: [AuthGuard]},
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
