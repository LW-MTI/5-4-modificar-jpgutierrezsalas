import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Proveedor } from '../models/proveedor';

@Injectable()
export class ProveedorService{
	public url: string;

	constructor(private _http: Http){
		this.url = GLOBAL.url;
	}

	getProveedores(token, page){
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.get(this.url+'proveedores/'+page, options).map(res => res.json());
	}

	getProveedor(token, id: string){
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.get(this.url+'proveedor/'+id, options).map(res => res.json());
	}

	addProveedor(token, proveedor: Proveedor){
		let params = JSON.stringify(proveedor);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.post(this.url+'proveedor', params, {headers: headers}).map(res => res.json());
	}

	editProveedor(token, id: string, proveedor: Proveedor){
		let params = JSON.stringify(proveedor);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});
		return this._http.put(this.url+'proveedor/'+id, params, {headers: headers}).map(res => res.json());
	}

	deleteProveedor(token, id: string){
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.delete(this.url+'proveedor/'+id, options).map(res => res.json());
	}	
}






