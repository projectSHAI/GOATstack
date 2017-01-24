import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { Four0FourComponent }    from './404.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'PageNotFound', component: Four0FourComponent }
  ])],
  exports: [RouterModule]
})
export class Four0FourRoutingModule {}