import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';
import { ProveedorListComponent } from './components/proveedor-list.component';
import { ProveedorAddComponent } from './components/proveedor-add.component';
import { ProveedorEditComponent } from './components/proveedor-edit.component';
import { ProveedorDetailComponent } from './components/proveedor-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    ProveedorListComponent,
    ProveedorAddComponent,
    ProveedorEditComponent,
    ProveedorDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
