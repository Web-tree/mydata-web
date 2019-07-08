import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplyTokenComponent} from './apply-token/apply-token.component';

const routes: Routes = [
  {path: 'applyToken', component: ApplyTokenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
