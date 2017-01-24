import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '../home', pathMatch: 'full' },
  { path: 'profile', redirectTo: '../user-profile', pathMatch: 'full' },
  { path: '**', redirectTo: '../404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}