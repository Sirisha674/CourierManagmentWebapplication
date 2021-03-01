import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandmarkComponent } from '../Landmark/landmark';
import { LanmarkDataComponent } from '../LandmarkData/landmarkdata';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', component: LanmarkDataComponent },
  { path: 'landmark', component: LandmarkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
