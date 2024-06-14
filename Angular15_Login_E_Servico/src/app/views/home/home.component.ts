//Imports: Libs
import { Component, OnDestroy, OnInit } from '@angular/core';       		
import { HttpClient 				  } from '@angular/common/http';		
import { Router 					  } from '@angular/router';			
import { Subject, takeUntil			  } from 'rxjs';						

//Imports: Arquivos
import { RickMortyService    } from 'src/app/services/rick_morty/rick-morty.service';		
import { PersonagesInterface } from 'src/app/interfaces/rick-morty/PersonagesInterface';	

//Configuração
@Component({
  	selector:    'home-view',						
  	templateUrl: './home.component.html',			
	styleUrls:   [],											
})

//Habilitar: No Projeto
export class HomeComponent implements OnInit, OnDestroy {
	//Variáveis
	private readonly destroy$: Subject<void> = new Subject();	
	listaPersonagens: Array<PersonagesInterface> = [];
	router: Router;

	//Construtor															
	constructor(
		private rickMortyService: RickMortyService,
		http: HttpClient, 
		router_construct: Router
	){this.router = router_construct;}

	//Ciclo Vida: Quando Inicializado
	ngOnInit(): void {
		this.buscarTodos_Home();
	}

	//Método: Consumir Serviço
	buscarTodos_Home(): void{
		this.rickMortyService												
		.buscarTodos_Servico()												
		.pipe(takeUntil(this.destroy$))										
		.subscribe({																	
			//Sucesso
			next: (resposta) => {											
				//Pegar Dados
				//console.log(resposta.results);							
				resposta && (this.listaPersonagens = resposta.results);			
			},

			//Erro
			error: (erro) => console.log(erro),
		});
	}


	btnEditar(idV: number){
		console.log(idV);
		this.router.navigate(['/personage', idV]);						
	}


	//Ciclo Vida: Quando Terminado (MudarURL, FecharAba)
	ngOnDestroy(): void {
		//Serviço - Encerrar
		this.destroy$.next();
		this.destroy$.complete();
	}
}



