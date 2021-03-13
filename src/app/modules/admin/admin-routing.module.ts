import { ListResultsComponent } from './components/list-results/list-results.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
    path: '',
    component: ListResultsComponent,
    data:
    {
      title: 'Listar Seguimiento'
    }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
