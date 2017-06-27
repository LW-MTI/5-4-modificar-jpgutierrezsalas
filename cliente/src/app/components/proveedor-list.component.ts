import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProveedorService } from '../services/proveedor.service';
import { Proveedor } from '../models/proveedor';


@Component({
	selector: 'proveedor-list',
	templateUrl: '../views/proveedor-list.html',
	providers: [UserService, ProveedorService]
})

export class ProveedorListComponent implements OnInit{
	public titulo: string;
	public proveedores: Proveedor[];
	public identity;
	public token;
	public url: string;
	public next_page;
	public prev_page;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _proveedorService: ProveedorService,
		private _userService: UserService
	){
		this.titulo = 'Proveedores';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.next_page = 1;
		this.prev_page = 1;
	}

	ngOnInit(){
		console.log('Proveedor componente cargado');
		console.log(this.titulo);

		// Listado de proveedores
		this.getProveedores();
	}

	getProveedores(){
		this._route.params.forEach((params: Params) => {
			let page = + params['page'];
			if (!page) {
				page = 1;
			}else{
				this.next_page = page + 1;
				this.prev_page = page - 1;

				if(this.prev_page == 0){
					this.prev_page = 1;
				}
			}
			this._proveedorService.getProveedores(this.token, page).subscribe(
				response => {
					if (!response.proveedores) {
						this._router.navigate(['/']);
					}else{
						this.proveedores = response.proveedores;
					}
				},
				error => {
		  			var errorMessage = <any>error;

		  			if (errorMessage != null) {
		  				var body = JSON.parse(error._body);
		  				//this.alertMessage = body.message;
		  			}
				}
			);
		});
	}

	public confirmado;
	onDeleteConfirm(id){
		this.confirmado = id;
	}

	onCancelProveedor(){
		this.confirmado = null;
	}

	onDeleteProveedor(id){
		this._proveedorService.deleteProveedor(this.token, id).subscribe(
			response => {
				if (!response.proveedor) {
					alert('Error en el servidor.');
				}
				this.getProveedores();
			},
			error => {
	  			var errorMessage = <any>error;

	  			if (errorMessage != null) {
	  				var body = JSON.parse(error._body);
	  				//this.alertMessage = body.message;
	  			}
			}
		);
	}


}





