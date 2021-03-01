import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandmarkComponent } from '../Landmark/landmark';
import { LanmarkDataComponent } from '../LandmarkData/landmarkdata';

@NgModule({
  declarations: [
    AppComponent,
    LandmarkComponent,
    LanmarkDataComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXGZWZ_DzUGwAiGsRWxl3jBvJEo7_Ws7s',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
