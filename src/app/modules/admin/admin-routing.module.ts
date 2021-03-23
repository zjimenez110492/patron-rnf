import { AddProyectComponent } from './components/add-proyect/add-proyect.component';
import { ResultDetailsComponent } from './components/result-details/result-details.component';
import { ListResultsComponent } from './components/list-results/list-results.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListResultsComponent,
    data:
    {
      title: 'List Proyects'
    }
},
{
  path: 'view-Result',
  component: ResultDetailsComponent,
  data:
  {
    title: 'View Proyect'
  }
},
{
  path: 'add-proyect',
  component: AddProyectComponent,
  data:
  {
    title: 'Add Proyect'
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
