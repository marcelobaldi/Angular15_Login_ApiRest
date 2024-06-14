//Imports: Libs
import { Component, OnInit, OnDestroy   } from '@angular/core';           
import { ActivatedRoute, Params 		} from '@angular/router';	   		
import { Observable, Subject, takeUntil	} from 'rxjs';						
import { Location 						} from '@angular/common';			

//Imports: Arquivos (Serviço, Interface)
import { RickMortyService    } from 'src/app/services/rick_morty/rick-morty.service';	 
import { PersonagesInterface } from 'src/app/interfaces/rick-morty/PersonagesInterface'; 

//Configuração
@Component({
  	selector: 	 'app-personage',						
  	templateUrl: './personage.component.html',			
  	styleUrls: 	 []									
})

//Executar
export class PersonageComponent {
	//Variáveis
	personage!: PersonagesInterface;							
	id_rota_pego: any;											
	private readonly destroy$: Subject<void> = new Subject();	

	//Construtor (Serviço, Rota/URL, Rota/Voltar)
	constructor(
		private rickMortyService: RickMortyService, 				
		private rotaAtiva: ActivatedRoute,						
		private location: Location									
	){}

	//Ciclo Vida: Quando Inicializado
	ngOnInit(): void {
		this.buscarPersonagem();
	}

	//Método: Consumir Serviço (Com Parâmetros da Rota)
	buscarPersonagem(): void{	
		//Pegar Parâmetros da Rota (Objeto)
		let params: Observable<Params> = this.rotaAtiva.params;
		console.log('Parâmetros Rota (Objeto):', params);
	
		//Chamar Serviço Já Passando Parâmetro		
		params.subscribe( parametrosURL =>{
			this.id_rota_pego = parametrosURL['id_rota'];				
			this.rickMortyService									
			.buscarId_Servico(this.id_rota_pego)					
			.pipe(takeUntil(this.destroy$))							
			.subscribe({													
				//Sucesso
				next: (resposta) => {											
					//Pegar Direto (Sem Tratamento)
					console.log("Dados Direto (Obj) : ", resposta);						
					console.log("Dados Direto (Nome): ", resposta["name"]);		

					//Pegar Com Tratamento
					resposta && (this.personage = resposta);		
					console.log(this.personage);					
					console.log(this.personage.name);				
				},
				//Erro
				error: (erro) => console.log(erro),
			})
		});
	}
	
	//Método Voltar 
	voltar():void{
		this.location.back();
	}

	//Ciclo Vida: Quando Terminado (MudarURL, FecharAba)
	ngOnDestroy(): void {
		//Serviços/Observables: Encerrar (para não dar erro "futuro" de memória)
		this.destroy$.next();
		this.destroy$.complete();
	}
}


