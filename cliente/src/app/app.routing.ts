import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import user
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';

// import proveedor
import { ProveedorListComponent } from './components/proveedor-list.component';
import { ProveedorAddComponent } from './components/proveedor-add.component';
import { ProveedorEditComponent } from './components/proveedor-edit.component';
import { ProveedorDetailComponent } from './components/proveedor-detail.component';

const appRoutes: Routes = [
	{path: '', component: HomeComponent },
	{path: 'proveedores/:page', component: ProveedorListComponent},
	{path: 'crear-proveedor', component: ProveedorAddComponent},
	{path: 'editar-proveedor/:id', component: ProveedorEditComponent},
	{path: 'proveedor/:id', component: ProveedorDetailComponent},
	{path: 'mis-datos', component: UserEditComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);