import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { UserProfileComponent }    from './user-profile.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'profile', component: UserProfileComponent }
  ])],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {}