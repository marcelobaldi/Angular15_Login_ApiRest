//Imports: Libs
import { HttpClient } from '@angular/common/http';		
import { Injectable } from '@angular/core';           
import { Observable } from 'rxjs';				 		

//Configuração
@Injectable( {providedIn: 'root'} )					

//Habilitar: No Projeto
export class RickMortyService {
	//Variáveis
	// ...

	//Construtor (Lib Http, ...)
	constructor( private http: HttpClient ) { }

	//Método: Direto (SemParam, SemHeader)
	buscarTodos_Servico(): Observable<any>{
		return this.http.get(
			"https://rickandmortyapi.com/api/character", {}
		);
	}

	//Método: Com Parâmetro
	buscarId_Servico(idV: any): Observable<any>{
		console.log('Id Recebido no Serviço', idV);
		return this.http.get(
			`https://rickandmortyapi.com/api/character/${idV}`, {}
		);
	}
}
