import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SampleTableComponent } from './pages/sample-table/sample-table.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDialogComponent } from './pages/sample-table/dialog/add-dialog.component';
import { EditDialogComponent } from './pages/sample-table/dialog/edit-dialog.component';
import { DeleteDialogComponent } from './pages/sample-table/dialog/delete-dialog.component';
import { ViewDialogComponent } from './pages/sample-table/dialog/view-dialog.component';
import { NgInfiniteScrollModule } from 'ngx-sentinel-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    SampleTableComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ViewDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgInfiniteScrollModule 
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ViewDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

