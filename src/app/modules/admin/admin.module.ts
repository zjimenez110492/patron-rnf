import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { AdminRoutingModule } from './admin-routing.module';
import { ListResultsComponent } from './component/list-results/list-results.component';
import {MatTableModule} from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [ListResultsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSliderModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
})
export class AdminModule { }
