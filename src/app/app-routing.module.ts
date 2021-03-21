import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { BeanOfTheDayComponent } from './Components/bean-of-the-day/bean-of-the-day.component';
import { BeanComponent } from './Components/bean/bean.component';

const routes: Routes = [
  { path: '', component: BeanOfTheDayComponent },
  { path: 'bean', component: BeanComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
