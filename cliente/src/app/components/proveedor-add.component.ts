import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProveedorService } from '../services/proveedor.service';
import { Proveedor } from '../models/proveedor';


@Component({
	selector: 'proveedor-add',
	templateUrl: '../views/proveedor-add.html',
	providers: [UserService, ProveedorService]
})

export class ProveedorAddComponent implements OnInit{
	public titulo: string;
	public proveedor: Proveedor;
	public identity;
	public token;
	public url: string;
	public alertMessage;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _proveedorService: ProveedorService
	){
		this.titulo = 'Añadir nuevo Proveedor';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.proveedor = new Proveedor('', '', '');
	}

	ngOnInit(){
		console.log('Proveedor componente add cargado');

	}

	onSubmit(){
		console.log(this.proveedor);
		this._proveedorService.addProveedor(this.token, this.proveedor ).subscribe(
			response => {
				if(!response.proveedor){
					this.alertMessage = 'Error en el servidor.';
				}else{
					this.alertMessage = 'El Proveedor ha sido agreagado correctamente a la Base de Datos. ';
					this.proveedor = response.proveedor;
					this._router.navigate(['/editar-proveedor', response.proveedor._id]);
				}
			},
			error => {
	  			var errorMessage = <any>error;

	  			if (errorMessage != null) {
	  				var body = JSON.parse(error._body);
	  				this.alertMessage = body.message;
	  			}
			}
		);
	}
}



