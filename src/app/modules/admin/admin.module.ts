import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { AdminRoutingModule } from './admin-routing.module';
import { ListResultsComponent } from './components/list-results/list-results.component';
import {MatTableModule} from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import {MatDialogModule} from '@angular/material/dialog';
import { ResultDetailsComponent } from './components/result-details/result-details.component';
import { ViewModelComponent } from './components/view-model/view-model.component';
import { ViewRnfComponent } from './components/view-rnf/view-rnf.component';
@NgModule({
  declarations: [ListResultsComponent, ResultDetailsComponent, ViewModelComponent, ViewRnfComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSliderModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatDialogModule
  ],
})
export class AdminModule { }
